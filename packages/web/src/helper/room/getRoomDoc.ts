import {DocumentReference, doc} from 'firebase/firestore';
import {firestore} from '../../firebaseConfig';
import {RoomData} from '../../interface/RoomData';

export default function getRoomDoc(roomId: string) {
  return doc(firestore, 'rooms', roomId) as DocumentReference<RoomData>;
}
