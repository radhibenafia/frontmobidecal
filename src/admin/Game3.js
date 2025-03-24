import React, { useState } from "react";
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    AppBar,
    Toolbar,
} from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PChatbot = () => {
    const [question, setQuestion] = useState("");
    const [generatedText, setGeneratedText] = useState(""); // Stocker le texte généré
    const [translatedText, setTranslatedText] = useState(""); // Stocker le texte traduit
    const [chatHistory, setChatHistory] = useState([]); // Historique des échanges
    const [imageFile, setImageFile] = useState(null); // Stocker le fichier d'image
    const [base64Image, setBase64Image] = useState(""); // Stocker l'image en base64

    const apiKey = ""; // Remplacez par votre clé API
    const genAI = new GoogleGenerativeAI(apiKey);

    // Fonction pour extraire du texte d'une image
    const handleExtractText = async () => {
        if (!imageFile) {
            alert("Veuillez sélectionner une image.");
            return;
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        try {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64 = reader.result.split(",")[1];
                setBase64Image(reader.result); // Stocker l'image en base64 pour l'historique

                const result = await model.generateContent([
                    {
                        inlineData: {
                            data: base64,
                            mimeType: imageFile.type,
                        },
                    },
                    "Caption this image.",
                ]);

                const extractedText = result?.response?.text || "Aucun texte extrait.";
                setGeneratedText(extractedText);
                setTranslatedText(""); // Réinitialiser le texte traduit
            };

            reader.readAsDataURL(imageFile);
        } catch (error) {
            console.error("Erreur lors de l'extraction du texte :", error);
        }
    };

    // Fonction pour traduire le texte généré en français
    const handleTranslateToFrench = async () => {
        if (!generatedText) return;

        try {
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        q: generatedText,
                        target: "fr",
                    }),
                }
            );

            const data = await response.json();
            const translated = data?.data?.translations?.[0]?.translatedText || "Erreur de traduction.";
            setTranslatedText(translated);
        } catch (error) {
            console.error("Erreur lors de la traduction :", error);
        }
    };

    // Ajouter le texte généré et l'image à l'historique
    const handleAddToHistory = () => {
        if (generatedText && base64Image) {
            setChatHistory((prevHistory) => [
                ...prevHistory,
                {
                    question: "Texte extrait de l'image",
                    text: generatedText,
                    translatedText,
                    image: base64Image,
                },
            ]);
            setGeneratedText(""); // Réinitialiser le texte généré
            setBase64Image(""); // Réinitialiser l'image
            setTranslatedText(""); // Réinitialiser le texte traduit
        }
    };

    return (
        <Container>
            <AppBar position="sticky" sx={{ mb: 4 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        EXTRACTION INFORMATION DE CONTRAT DE VENTE
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper sx={{ p: 2, mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    GEMINI-1.5-PRO - Génération d'images et d'extraits de texte
                </Typography>

                {/* Extraction de texte depuis une image */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Extraction de texte d'une image
                    </Typography>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        style={{ marginBottom: "16px" }}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleExtractText}
                        sx={{ mr: 2 }}
                    >
                        Extraire le texte
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleTranslateToFrench}
                        disabled={!generatedText} // Désactive le bouton si aucun texte généré
                        sx={{ mr: 2 }}
                    >
                        Traduire en français
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleAddToHistory}
                        disabled={!generatedText || !base64Image} // Désactive le bouton si aucun texte ou image
                    >
                        Ajouter à l'historique
                    </Button>

                    {generatedText && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6">Texte extrait :</Typography>
                            <Typography variant="body1">{generatedText}</Typography>
                        </Box>
                    )}

                    {translatedText && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6">Texte traduit :</Typography>
                            <Typography variant="body1">{translatedText}</Typography>
                        </Box>
                    )}
                </Box>

                {/* Historique */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">Historique :</Typography>
                    {chatHistory.map((chat, index) => (
                        <Box
                            key={index}
                            sx={{
                                mb: 2,
                                p: 2,
                                borderRadius: "8px",
                                backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#e0e0e0",
                            }}
                        >
                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                {chat.question} :
                            </Typography>
                            <Typography variant="body1">{chat.text}</Typography>
                            {chat.translatedText && (
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    Traduction : {chat.translatedText}
                                </Typography>
                            )}
                            {chat.image && (
                                <Box sx={{ mt: 2 }}>
                                    <img
                                        src={chat.image}
                                        alt="Uploaded"
                                        style={{ maxWidth: "100%", borderRadius: "8px" }}
                                    />
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Container>
    );
};

export default PChatbot;
