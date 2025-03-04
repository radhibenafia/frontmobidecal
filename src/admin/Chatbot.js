import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";

const Chatbot = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");

    useEffect(() => {
        // Récupérer nom et prénom depuis localStorage
        const storedNom = localStorage.getItem("nom");
        const storedPrenom = localStorage.getItem("prenom");

        if (storedNom && storedPrenom) {
            setNom(storedNom);
            setPrenom(storedPrenom);
        }
    }, []);

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f8f9fc",
            }}
        >
            <Card sx={{ width: 500, boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
                        Hello {nom} {prenom} 👋
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                        Bienvenue sur le chatbot, posez vos questions !
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Chatbot;
