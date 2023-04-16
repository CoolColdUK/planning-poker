import {Button, Container, List, ListItem, ListItemText, Typography} from '@mui/material';
import {Timestamp, arrayUnion, doc, onSnapshot, updateDoc} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {firestore} from '../firebaseConfig'; // Adjust the import path if necessary
import {User} from 'firebase/auth';

interface VoteUser extends User {
  vote?: string;
}

interface RoomData {
  createdAt: Timestamp;
  createdBy: string;
  users: VoteUser[];
}

export interface RoomProps {
  user: User;
}

export default function Room(props: RoomProps) {
  const {id} = useParams<'id'>();
  const [room, setRoom] = useState<RoomData | null>(null);

  useEffect(() => {
    if (!id) return;
    const roomRef = doc(firestore, 'rooms', id);
    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        setRoom(snapshot.data() as RoomData);
      } else {
        console.error('Room not found');
      }
    });

    return () => unsubscribe();
  }, [id]);

  const handleVote = async (vote: string) => {
    if (!id) return;
    const roomRef = doc(firestore, 'rooms', id);
    try {
      await updateDoc(roomRef, {
        users: arrayUnion({...props.user, vote}), // Assumes you have access to the current user object
      });
    } catch (error) {
      console.error('Error updating vote: ', error);
    }
  };

  if (!room) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Room {id}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <List>
        {room.users.map((user) => (
          <ListItem key={user.uid}>
            <ListItemText primary={user.displayName} secondary={user.vote ? `Voted: ${user.vote}` : 'Not voted'} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom>
        Vote
      </Typography>
      <Button onClick={() => handleVote('XS')}>XS</Button>
      <Button onClick={() => handleVote('S')}>S</Button>
      <Button onClick={() => handleVote('M')}>M</Button>
      <Button onClick={() => handleVote('L')}>L</Button>
      <Button onClick={() => handleVote('XL')}>XL</Button>
    </Container>
  );
}
