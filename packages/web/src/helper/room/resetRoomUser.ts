import {updateDoc} from 'firebase/firestore';
import {VoteEnum} from '../../enum/VoteEnum';
import {RoomData} from '../../interface/RoomData';
import getRoomDoc from './getRoomDoc';

export default function resetRoomUser(room: RoomData, roomId: string) {
  // Create a new users object with the vote property removed
  const updatedUsers = Object.fromEntries(
    Object.entries(room.users).map(([uid, user]) => [uid, {...user, vote: VoteEnum.NOT_VOTED}]),
  );

  return updateDoc(getRoomDoc(roomId), {users: updatedUsers});
}
