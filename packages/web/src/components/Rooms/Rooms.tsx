import {Container, Typography} from '@mui/material';
import {User} from 'firebase/auth';
import {useParams} from 'react-router-dom';
import {hasAllUsersVoted} from '../../helper/hasAllUsersVoted';
import {useSubscribeRoom} from '../../hook/useSubscribeRoom';
import RoomsSummary from './RoomsSummary';
import RoomsUser from './RoomsUser';
import RoomsVote from './RoomsVote';

export interface RoomProps {
  user: User;
}

export default function Room(props: RoomProps) {
  const {id} = useParams<'id'>();

  const roomId = id as string;

  const room = useSubscribeRoom(props.user, roomId);

  if (!room) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Room {id}
      </Typography>

      <RoomsUser room={room} />

      <RoomsVote room={room} user={props.user} roomId={roomId} />

      {hasAllUsersVoted(room) && <RoomsSummary room={room} />}
    </Container>
  );
}
