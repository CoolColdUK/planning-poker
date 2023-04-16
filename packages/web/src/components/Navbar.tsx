// Navbar.tsx
import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {User} from 'firebase/auth';
import {Link} from 'react-router-dom';

interface NavbarProps {
  user: User | null;
}

export default function Navbar({user}: NavbarProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          App Name
        </Typography>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          {user ? (
            <>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/create-room" color="inherit">
                Create Room
              </Button>
              {/* Add more links as needed */}
            </>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
