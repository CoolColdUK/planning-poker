import {deleteDoc} from 'firebase/firestore';
import getRoomDoc from './getRoomDoc';

export default function removeRoom(roomId: string) {
  return deleteDoc(getRoomDoc(roomId));
}
