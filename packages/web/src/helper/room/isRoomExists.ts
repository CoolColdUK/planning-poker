import {getDoc} from 'firebase/firestore';
import getRoomDoc from './getRoomDoc';

export default async function isRoomExists(roomId: string) {
  const roomSnapshot = await getDoc(getRoomDoc(roomId));

  return roomSnapshot.exists();
}
