import {Button, Grid, Typography} from '@mui/material';
import {User} from 'firebase/auth';
import {VoteEnum} from '../../enum/VoteEnum';
import addRoomUser from '../../helper/room/addRoomUser';
import {RoomData} from '../../interface/RoomData';
import resetRoomUser from '../../helper/room/resetRoomUser';

export interface RoomsVoteProps {
  room: RoomData;
  user: User;
  roomId: string;
}

export default function RoomsVote(props: RoomsVoteProps) {
  const {room, user, roomId} = props;

  const handleVote = async (vote: VoteEnum) => {
    console.log('handle', vote);
    try {
      await addRoomUser(roomId, user, vote);
    } catch (error) {
      console.error('Error updating vote: ', error);
    }
  };

  const handleResetVotes = async () => {
    if (!room) return;

    try {
      resetRoomUser(room, roomId);
    } catch (error) {
      console.error('Error resetting votes: ', error);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Vote
      </Typography>
      <Grid container>
        {Object.values(VoteEnum).map((e) => (
          <Grid item>
            <Button onClick={() => handleVote(e)}>{e}</Button>
          </Grid>
        ))}
        <Grid item>
          <Button onClick={handleResetVotes} style={{marginLeft: '1rem'}}>
            Reset Votes
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
