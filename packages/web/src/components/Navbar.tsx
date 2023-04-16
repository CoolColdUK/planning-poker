// Navbar.tsx
import {AppBar, Button, TextField, Toolbar, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {User} from 'firebase/auth';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

interface NavbarProps {
  user: User | null;
}

export default function Navbar({user}: NavbarProps) {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const handleJoinRoom = () => {
    if (roomId) {
      navigate(`/rooms/${roomId}`);
    }
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          App Name
        </Typography>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          {user ? (
            <>
              <TextField
                value={roomId}
                onChange={handleRoomIdChange}
                label="Room ID"
                variant="outlined"
                size="small"
                style={{marginRight: '1rem'}}
              />
              <Button onClick={handleJoinRoom} variant="contained" color="primary">
                Join Room
              </Button>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/rooms" color="inherit">
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
