import {User} from 'firebase/auth';
import {RoomData} from '../interface/RoomData';
import {VoteUser} from '../interface/VoteUser';

export default function isUserInRoom(room: RoomData, user: User | VoteUser) {
  return user.uid in room.users;
}
