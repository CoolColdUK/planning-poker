import {List, ListItem, ListItemText, Typography} from '@mui/material';
import {hasAllUsersVoted} from '../../helper/hasAllUsersVoted';
import isUserVoted from '../../helper/isUserVoted';
import sortUserDisplayName from '../../helper/sort/sortUserDisplayName';
import {RoomData} from '../../interface/RoomData';
import {VoteUser} from '../../interface/VoteUser';

function getUserVoteDisplay(room: RoomData, user: VoteUser) {
  if (hasAllUsersVoted(room)) {
    // all user voted, show actual vote
    return user.vote ? `Voted: ${user.vote}` : 'Not voted';
  }

  return isUserVoted(user) ? 'Voted' : 'Not voted';
}

export interface RoomsUserProps {
  room: RoomData;
}

export default function RoomsUser(props: RoomsUserProps) {
  const {room} = props;
  const users = Object.values(room.users).sort(sortUserDisplayName);

  return (
    <>
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
    </>
  );
}
