import {Button, Container, createTheme, CssBaseline, ThemeProvider, Typography} from '@mui/material';
import {onAuthStateChanged, signOut as firebaseSignOut, User} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {firebaseAuth} from '../firebaseConfig';
import Login from './Login';

const theme = createTheme();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (returnedUser) => {
      setUser(returnedUser);
    });
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(firebaseAuth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        {user ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome, {user.displayName}
            </Typography>
            <Button variant="contained" color="secondary" onClick={signOut}>
              Sign out
            </Button>
          </>
        ) : (
          <Login onUserChanged={setUser} />
        )}
      </Container>
    </ThemeProvider>
  );
}
