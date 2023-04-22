import {doc} from 'firebase/firestore';
import {firestore} from '../../firebaseConfig';

export default function getRoomDoc(roomId: string) {
  return doc(firestore, 'rooms', roomId);
}
