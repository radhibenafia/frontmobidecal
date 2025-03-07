import { useState } from "react";
import { Button, TextField, Paper, Typography, Container, Box, AppBar, Toolbar, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Todoapp = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    const handleAddTask = () => {
        if (task.trim() !== "") {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask(""); // Clear input field after adding task
        }
    };

    const toggleTaskCompletion = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    return (
        <>
            {/* AppBar */}
            <AppBar position="sticky" sx={{ backgroundColor: '#3f51b5' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Todo App</Typography>
                    <Button color="inherit" component={Link} to="/Chatbot" sx={{ marginLeft: 'auto' }}>
                        Return
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Main content */}
            <Container sx={{ mt: 4 }}>
                <Paper sx={{ p: 4, backgroundColor: '#f5f5f5', borderRadius: '12px' }}>
                    <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                        Your Tasks
                    </Typography>

                    {/* Input and Add Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                        <TextField
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            label="New Task"
                            variant="outlined"
                            fullWidth
                            sx={{ mr: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddTask}
                            sx={{ height: '100%' }}
                        >
                            Add Task
                        </Button>
                    </Box>

                    {/* Task List */}
                    <List sx={{ maxHeight: 400, overflowY: 'auto' }}>
                        {tasks.map((task, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    backgroundColor: '#e3f2fd',
                                    borderRadius: '8px',
                                    mb: 1,
                                    p: 2,
                                    cursor: 'pointer',
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.completed ? 'gray' : 'black'
                                }}
                                onClick={() => toggleTaskCompletion(index)}
                            >
                                <ListItemText primary={task.text} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>
        </>
    );
};

export default Todoapp;
