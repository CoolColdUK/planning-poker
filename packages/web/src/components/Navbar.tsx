// Navbar.tsx
import {AppBar, Button, Snackbar, TextField, Toolbar} from '@mui/material';
import {Box} from '@mui/system';
import {User} from 'firebase/auth';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

interface NavbarProps {
  user: User | null;
}

export default function Navbar({user}: NavbarProps) {
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const handleJoinRoom = () => {
    if (roomId) {
      navigate(`/rooms/${roomId}`);
    } else {
      setMessage('Please set a room');
    }
  };
  return (
    <AppBar position="static">
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage(null)}
        message={message}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      />
      <Toolbar>
        <Box sx={{flexGrow: 1}}>
          <Button component={Link} to="/" color="inherit">
            Poker
          </Button>
        </Box>
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
