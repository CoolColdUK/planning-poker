import {User} from 'firebase/auth';
import {deleteField, updateDoc} from 'firebase/firestore';
import getRoomDoc from './getRoomDoc';

export default function removeRoomUser(roomId: string, user: User) {
  return updateDoc(getRoomDoc(roomId), {
    [`users.${user.uid}`]: deleteField(),
  });
}
