import {Button, Container, Typography} from '@mui/material';
import {signOut as firebaseSignOut, User} from 'firebase/auth';
import {firebaseAuth} from '../firebaseConfig';

interface AppProps {
  user: User | null;
}

export default function App({user}: AppProps) {
  const handleSignOut = async () => {
    try {
      await firebaseSignOut(firebaseAuth);
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
        Welcome, {user?.displayName}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleSignOut}>
        Sign out
      </Button>
    </Container>
  );
}
