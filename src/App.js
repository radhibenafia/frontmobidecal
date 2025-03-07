import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Grid, Card, CardContent, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Chatbot from './admin/Chatbot';
import Login from './admin/Login';
import Analyse from './admin/Analyse';
import Protestation from './admin/Protestation';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import Todoapp from './admin/Todoapp';


const drawerWidth = 240;
const data = [
  { name: 'Doctor', value: 20, color: 'red' },
  { name: 'Parent', value: 40, color: 'green' },
  { name: 'Admin', value: 5, color: 'orange' },
  { name: 'Other  ', value: 20, color: 'grey' },
];

function Sidebar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();
  return (
    <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#212529', color: '#fff' } }}>
      <Toolbar />
      {/* Affichage de la Date et de l'Heure */}

      <List>
        <ListItem button component={Link} to="/Login">
          <ListItemIcon><DashboardIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><BarChartIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><SettingsIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><AccessTimeIcon sx={{ color: '#fff', mr: 1 }} /></ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', color: '#fff' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{formattedDate}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{formattedTime}</Typography>
              </Box>
            }
          />
        </ListItem>
      </List>

    </Drawer>
  );
}

function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>

            <Button variant="contained" color="secondary" component={Link} to="/Login">
              login
            </Button>

          </Toolbar>
        </AppBar>

        <Container>
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Sales Value</Typography>
                  <Typography variant="h4" color="primary">$10,567</Typography>
                  <Typography color="success.main">Yesterday 10.57%</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Customers</Typography>
                  <Typography variant="h4" color="primary">345k</Typography>
                  <Typography color="success.main">+22% </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Revenue</Typography>
                  <Typography variant="h4" color="primary">$43,594</Typography>
                  <Typography color="error">-2% Since last month</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mt: 5, color: "#3f51b5" }}>
            Understanding Autism
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", mt: 2 }}>
            Autism is a neurodevelopmental disorder that affects communication, social interactions, and behavior.
            It manifests differently in each person, with unique strengths and challenges. A better understanding
            of autism helps promote inclusion and supports autistic individuals in their daily lives.
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", mt: 5, color: "#3f51b5" }}>
            App Actor Statistics
          </Typography>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <PieChart width={400} height={400}> {/* Augmenter la taille du graphique */}
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}> {/* Augmenter le rayon */}
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>



        </Container>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Analyse" element={<Analyse />} />
        <Route path="/Protestation" element={<Protestation />} />
        <Route path="/Todoapp" element={<Todoapp />} />
      </Routes>
    </Router>
  );
}

export default App;