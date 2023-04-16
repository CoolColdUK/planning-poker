import {Button, Container, List, ListItem, ListItemText, Typography} from '@mui/material';
import {User} from 'firebase/auth';
import {Cell, Pie, PieChart, ResponsiveContainer} from 'recharts';
import {doc, updateDoc} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {VoteEnum} from '../enum/VoteEnum';
import {firestore} from '../firebaseConfig'; // Adjust the import path if necessary
import mapUserToVoteUser from '../helper/mapUserToVoteUser';
import {useSubscribeRoom} from '../hook/useSubscribeRoom';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9966FF', '#FF9999', '#33CCCC'];

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

  const calculateVoteSummary = () => {
    if (!room || !room.users) return [];

    const summary = {
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      notVoted: 0,
      skipped: 0,
    };

    Object.values(room.users).forEach((user) => {
      if (user.vote) {
        summary[user.vote as keyof typeof summary]++;
      } else if (user.vote === null) {
        summary.skipped++;
      } else {
        summary.notVoted++;
      }
    });

    return Object.entries(summary).map(([key, value]) => ({
      name: key,
      value,
    }));
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
          {Object.entries(room.users).map(([uid, user]) => (
            <ListItem key={uid}>
              <ListItemText primary={user.displayName} secondary={user.vote ? `Voted: ${user.vote}` : 'Not voted'} />
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
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={calculateVoteSummary()}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`} // Add this line
            outerRadius={150}
            fill="#8884d8"
          >
            {calculateVoteSummary().map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
}
