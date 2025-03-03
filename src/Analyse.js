import React, { useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from './Firebase'; // Assurez-vous que le chemin vers votre fichier firebase.js est correct
import { AppBar, Toolbar, Typography, Button, Container, Paper, Box, Select, MenuItem, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function Analyse() {
    const [documents, setDocuments] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [documentCount, setDocumentCount] = useState(0);
    const [selectedCollection, setSelectedCollection] = useState('radhi');

    const collections = ['login', 'logind'];

    const connectToFirestore = async () => {
        try {
            console.log(`Connecting to Firestore collection: ${selectedCollection}`);
            const querySnapshot = await getDocs(collection(firestore, selectedCollection));

            if (querySnapshot.empty) {
                console.log("No matching documents.");
                setIsConnected(true);
                setDocumentCount(0);
                setDocuments([]);
            } else {
                const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDocuments(docs);
                setDocumentCount(docs.length);
                setIsConnected(true);
            }
        } catch (error) {
            console.error('Error connecting to Firestore:', error);
            setIsConnected(false);
        }
    };

    return (
        <AnimatePresence exit={{ when: "beforeChildren" }}>
            <motion.div
                initial={{ opacity: 0, y: -50 }} // Déplacement vers le haut au démarrage
                animate={{ opacity: 1, y: 0 }} // Animation d'entrée
                exit={{ opacity: 0 }} // Animation de sortie
                transition={{ duration: 0.5 }}
                key="analyse"
                sx={{ flexGrow: 1 }}
            >
                <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Analyse des Données
                        </Typography>
                        <Button color="#3f51b5" component={Link} to="/" sx={{ marginLeft: 'auto' }}>Retour à l'Accueil</Button>
                    </Toolbar>
                </AppBar>

                <Container sx={{ mt: 4 }}>
                    <Paper sx={{ p: 4, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Sélectionner une collection :</Typography>
                            <Select
                                value={selectedCollection}
                                onChange={(e) => setSelectedCollection(e.target.value)}
                                fullWidth
                                sx={{ mb: 2, borderRadius: '8px', backgroundColor: '#fff', boxShadow: 2 }}
                            >
                                {collections.map((col) => (
                                    <MenuItem key={col} value={col}>{col}</MenuItem>
                                ))}
                            </Select>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ backgroundColor: '#3f51b5', borderRadius: '8px', boxShadow: 2 }}
                                onClick={connectToFirestore}
                            >
                                Connecter à Firestore
                            </Button>
                        </Box>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6">Connecté : {isConnected ? "Oui" : "Non"}</Typography>
                            <Typography variant="h6">Nombre de documents : {documentCount}</Typography>

                            {documents.length > 0 ? (
                                <TableContainer component={Paper} sx={{ mt: 3, borderRadius: '8px' }}>
                                    <Table sx={{ minWidth: 650 }}>
                                        <TableHead sx={{ backgroundColor: '#2775c2' }}>
                                            <TableRow>
                                                {Object.keys(documents[0]).map((key) => (
                                                    <TableCell key={key} sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                                        {key}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {documents.map((doc) => (
                                                <TableRow key={doc.id}>
                                                    {Object.keys(documents[0]).map((key) => (
                                                        <TableCell key={key} sx={{ borderBottom: '1px solid #ccc' }}>
                                                            {JSON.stringify(doc[key])}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography variant="body1" sx={{ mt: 3 }}>Aucun document trouvé.</Typography>
                            )}
                        </Box>
                    </Paper>
                </Container>
            </motion.div>
        </AnimatePresence>
    );
}

export default Analyse;
