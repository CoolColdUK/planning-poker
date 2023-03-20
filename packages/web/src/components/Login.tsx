import React from 'react';
import {Button, Container, Typography} from '@mui/material';
import {GoogleAuthProvider, signInWithPopup, User} from 'firebase/auth';
import {firebaseAuth} from '../firebaseConfig';

interface LoginProps {
  onUserChanged: (user: User | null) => void;
}

export default function Login({onUserChanged}: LoginProps) {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      onUserChanged(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Button variant="contained" color="primary" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </Container>
  );
}
