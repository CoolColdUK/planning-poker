import {Button, Container, List, ListItem, ListItemText, Typography} from '@mui/material';
import {User} from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {VoteEnum} from '../enum/VoteEnum';
import {firestore} from '../firebaseConfig'; // Adjust the import path if necessary
import {hasAllUsersVoted} from '../helper/hasAllUsersVoted';
import isUserVoted from '../helper/isUserVoted';
import addRoomUser from '../helper/room/addRoomUser';
import sortUserDisplayName from '../helper/sort/sortUserDisplayName';
import {summariseUserVotes} from '../helper/summariseUserVotes';
import {useSubscribeRoom} from '../hook/useSubscribeRoom';
import {RoomData} from '../interface/RoomData';
import {VoteUser} from '../interface/VoteUser';
import VoteSummaryPieChart from './VoteSummaryPieChart';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9966FF', '#FF9999', '#33CCCC'];

export interface RoomProps {
  user: User;
}

function getUserVoteDisplay(room: RoomData, user: VoteUser) {
  if (hasAllUsersVoted(room)) {
    // all user voted, show actual vote
    return user.vote ? `Voted: ${user.vote}` : 'Not voted';
  }

  return isUserVoted(user) ? 'Voted' : 'Not voted';
}

export default function Room(props: RoomProps) {
  const {id} = useParams<'id'>();

  const roomId = id || uuidv4().slice(0, 4);

  const room = useSubscribeRoom(props.user, roomId);

  const handleVote = async (vote: VoteEnum) => {
    console.log('handle', vote);
    try {
      await addRoomUser(roomId, props.user, vote);
    } catch (error) {
      console.error('Error updating vote: ', error);
    }
  };

  const handleResetVotes = async () => {
    if (!id || !room) return;
    const roomRef = doc(firestore, 'rooms', id);

    try {
      if (room.users) {
        // Create a new users object with the vote property removed
        const updatedUsers = Object.fromEntries(
          Object.entries(room.users).map(([uid, user]) => {
            const {vote, ...userWithoutVote} = user;
            return [uid, userWithoutVote];
          }),
        );

        // Update the users object in the Firestore document
        await updateDoc(roomRef, {users: updatedUsers});
      }
    } catch (error) {
      console.error('Error resetting votes: ', error);
    }
  };

  if (!room) {
    return <h1>Loading...</h1>;
  }

  const users = Object.values(room.users).sort(sortUserDisplayName);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Room {id}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      {room && room.users && (
        <List>
          {users.map((user) => (
            <ListItem key={user.uid}>
              <ListItemText primary={user.displayName} secondary={getUserVoteDisplay(room, user)} />
            </ListItem>
          ))}
        </List>
      )}
      <Typography variant="h6" gutterBottom>
        Vote
      </Typography>
      {Object.values(VoteEnum).map((e) => (
        <Button onClick={() => handleVote(e)}>{e}</Button>
      ))}
      <Button onClick={handleResetVotes} style={{marginLeft: '1rem'}}>
        Reset Votes
      </Button>{' '}
      <Typography variant="h6" gutterBottom>
        Vote Summary
      </Typography>
      <VoteSummaryPieChart summary={summariseUserVotes(room)} />
    </Container>
  );
}
