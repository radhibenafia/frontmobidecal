import React from "react";
import {
    Container,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Box,
    Card,
    CardContent,
    Link,
    IconButton,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const Login = () => {
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
            {/* Form Card */}
            <Card sx={{ width: 400, boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
                        <Link href="#" underline="hover" sx={{ color: "black" }}>
                            ← Back to homepage
                        </Link>
                    </Typography>

                    <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
                        Sign in to our platform
                    </Typography>

                    {/* Email Input */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Email sx={{ color: "gray", mr: 1 }} />
                        <TextField
                            fullWidth
                            label="Your Email"
                            variant="outlined"
                            size="small"
                            defaultValue="example@company.com"
                        />
                    </Box>

                    {/* Password Input */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Lock sx={{ color: "gray", mr: 1 }} />
                        <TextField
                            fullWidth
                            label="Your Password"
                            type="password"
                            variant="outlined"
                            size="small"
                        />
                    </Box>

                    {/* Remember Me & Forgot Password */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                        <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
                            Lost password?
                        </Link>
                    </Box>

                    {/* Sign in Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: "#111827",
                            color: "white",
                            "&:hover": { backgroundColor: "#374151" },
                        }}
                    >
                        Sign in
                    </Button>

                    {/* Social Login */}
                    <Typography variant="body2" sx={{ textAlign: "center", mt: 2, mb: 1 }}>
                        or login with
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <IconButton>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton>
                            <GitHubIcon />
                        </IconButton>
                        <IconButton>
                            <TwitterIcon />
                        </IconButton>
                    </Box>

                    {/* Create Account */}
                    <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
                        Not registered? <Link href="#">Create account</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
