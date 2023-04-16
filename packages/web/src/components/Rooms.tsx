import {Button, Container, List, ListItem, ListItemText, Typography} from '@mui/material';
import {User} from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {VoteEnum} from '../enum/VoteEnum';
import {firestore} from '../firebaseConfig'; // Adjust the import path if necessary
import {hasAllUsersVoted} from '../helper/hasAllUsersVoted';
import mapUserToVoteUser from '../helper/mapUserToVoteUser';
import {useSubscribeRoom} from '../hook/useSubscribeRoom';
import VoteSummaryPieChart from './VoteSummaryPieChart';
import {summariseUserVotes} from '../helper/summariseUserVotes';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9966FF', '#FF9999', '#33CCCC'];

export interface RoomProps {
  user: User;
}

export default function Room(props: RoomProps) {
  const {id} = useParams<'id'>();

  const roomId = id || uuidv4().slice(0, 4);
  const room = useSubscribeRoom(roomId, props.user);

  const handleVote = async (vote: VoteEnum) => {
    if (!id) return;
    const roomRef = doc(firestore, 'rooms', id);

    const voteUser = mapUserToVoteUser(props.user, vote);
    try {
      await updateDoc(roomRef, {
        [`users.${props.user.uid}`]: voteUser,
      });
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
          {Object.values(room.users).map((user) => (
            <ListItem key={user.uid}>
              <ListItemText
                primary={user.displayName}
                secondary={
                  hasAllUsersVoted(room)
                    ? user.vote === VoteEnum.SKIP
                      ? 'Skipped'
                      : `Voted: ${user.vote}`
                    : 'Not voted'
                }
              />
            </ListItem>
          ))}
        </List>
      )}
      <Typography variant="h6" gutterBottom>
        Vote
      </Typography>
      <Button onClick={() => handleVote(VoteEnum.XS)}>{VoteEnum.XS}</Button>
      <Button onClick={() => handleVote(VoteEnum.S)}>{VoteEnum.S}</Button>
      <Button onClick={() => handleVote(VoteEnum.M)}>{VoteEnum.M}</Button>
      <Button onClick={() => handleVote(VoteEnum.L)}>{VoteEnum.L}</Button>
      <Button onClick={() => handleVote(VoteEnum.XL)}>{VoteEnum.XL}</Button>
      <Button onClick={() => handleVote(VoteEnum.SKIP)}>{VoteEnum.SKIP}</Button>
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
