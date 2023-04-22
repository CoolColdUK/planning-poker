import {User} from 'firebase/auth';
import {updateDoc} from 'firebase/firestore';
import {VoteEnum} from '../../enum/VoteEnum';
import mapUserToVoteUser from '../map/mapUserToVoteUser';
import getRoomDoc from './getRoomDoc';

export default function addRoomUser(roomId: string, user: User, vote = VoteEnum.NOT_VOTED) {
  return updateDoc(getRoomDoc(roomId), {
    [`users.${user.uid}`]: mapUserToVoteUser(user, vote),
  });
}
