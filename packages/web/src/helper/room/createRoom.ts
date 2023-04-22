import {User} from 'firebase/auth';
import {serverTimestamp, setDoc} from 'firebase/firestore';
import {VoteEnum} from '../../enum/VoteEnum';
import mapUserToVoteUser from '../map/mapUserToVoteUser';
import getRoomDoc from './getRoomDoc';

export default function createRoom(roomId: string, user?: User) {
  const newRoom = {
    createdAt: serverTimestamp(),
    createdBy: user?.uid || 'unknown',
    users: {
      ...(user ? {[user.uid]: mapUserToVoteUser(user, VoteEnum.NOT_VOTED)} : {}),
    },
  };
  return setDoc(getRoomDoc(roomId), newRoom);
}
