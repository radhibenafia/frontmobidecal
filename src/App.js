import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Grid, Card, CardContent } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import Chatbot from './Chatbot';
import Login from './Login';// Assurez-vous que ce fichier existe

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#212529', color: '#fff' } }}>
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/">
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
            <Button variant="contained" color="secondary" component={Link} to="/chatbot">
              Go to Chatbot
            </Button>
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
                  <Typography color="success.main">+22% Since last month</Typography>
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
      </Routes>
    </Router>
  );
}

export default App;