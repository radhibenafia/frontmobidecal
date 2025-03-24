import { useState, useEffect } from "react";
import { Button, TextField, Paper, Typography, Container, Box, AppBar, Toolbar, IconButton, Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import emailjs from 'emailjs-com';
import { ReactSketchCanvas } from "react-sketch-canvas";

const ProtestationForm = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [protestation, setProtestation] = useState("");
    const [formattedMessage, setFormattedMessage] = useState("");
    const [message, setMessage] = useState(null);
    const [protestations, setProtestations] = useState([]);
    const [selectedColor, setSelectedColor] = useState("#FF0000");
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];

    useEffect(() => {
        // Récupérer nom et prénom depuis localStorage
        const storedNom = localStorage.getItem("nom");
        const storedPrenom = localStorage.getItem("prenom");

        if (storedNom && storedPrenom) {
            setNom(storedNom);
            setPrenom(storedPrenom);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!protestation) {
            setMessage("Veuillez entrer une protestation.");
            return;
        }

        const sender = `${nom} ${prenom}`; // Construction du sender
        const data = { protestation, sender };

        try {
            const response = await fetch("http://localhost:5000/app/protest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Protestation envoyée avec succès !");
                setProtestation(""); // Réinitialiser le champ
            } else {
                setMessage(result.message || "Erreur lors de l'envoi.");
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur.");
        }
    };

    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: '#3f51b5' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Form protest & Coloring Game</Typography>
                    <Button color="inherit" component={Link} to="/Chatbot" sx={{ marginLeft: 'auto' }}>Return</Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    {/* Formulaire à gauche */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 4, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                                Control game
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Écrivez votre protestation ici..."
                                    variant="outlined"
                                    value={protestation}
                                    onChange={(e) => setProtestation(e.target.value)}
                                    sx={{ mb: 3 }}
                                />
                                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: '8px', boxShadow: 2 }}>Send </Button>
                            </form>

                            {message && (
                                <Typography variant="body2" sx={{ mt: 3, color: message.includes("Erreur") ? 'red' : 'green', textAlign: 'center' }}>
                                    {message}
                                </Typography>
                            )}
                        </Paper>
                    </Grid>

                    {/* Jeu de coloriage à droite */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3, borderRadius: '8px', backgroundColor: '#e8eaf6' }}>
                            <Typography variant="h6" gutterBottom>Coloriage interactif</Typography>
                            <Paper elevation={3} sx={{ width: 400, height: 300, border: "2px solid #000", mb: 3 }}>
                                <ReactSketchCanvas
                                    style={{ width: "100%", height: "100%" }}
                                    strokeWidth={5}
                                    strokeColor={selectedColor}
                                    canvasColor="transparent"
                                    backgroundImage="https://file.aiquickdraw.com/chatgpt/file-7Xk1FvS8HGCykvgSGm37iw.png"
                                    allowOnlyPointerType="all"
                                />
                            </Paper>
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                                {colors.map((color) => (
                                    <Button key={color} onClick={() => setSelectedColor(color)}
                                        sx={{ width: 40, height: 40, minWidth: 40, borderRadius: "50%", backgroundColor: color, border: selectedColor === color ? "3px solid #fff" : "3px solid #000" }} />
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ProtestationForm;
