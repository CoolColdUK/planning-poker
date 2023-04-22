import {User} from 'firebase/auth';
import {useEffect, useState} from 'react';
import createRoom from '../helper/room/createRoom';
import isRoomExists from '../helper/room/isRoomExists';
import {getDoc} from 'firebase/firestore';
import getRoomDoc from '../helper/room/getRoomDoc';
import dayjs from 'dayjs';

export const useCheckAndCreateRoom = (user: User, roomId: string) => {
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  // console.log('useCheckAndCreateRoom', roomId);

  useEffect(() => {
    if (!roomId) return;
    // console.log('join');

    async function join() {
      const roomExists = await isRoomExists(roomId);

      if (!roomExists) {
        // console.log('create');
        await createRoom(roomId, user);
      }

      //reload room if opened for too long
      const doc = await getDoc(getRoomDoc(roomId));
      const data = doc.data();
      if (data) {
        const createdDate = dayjs(data.createdAt.toDate());
        if (createdDate.isBefore(dayjs().subtract(1, 'day'))) {
          await createRoom(roomId, user);
        }
      }

      setCurrentRoomId(roomId);
    }
    join();
  }, [roomId, user]);
  return currentRoomId;
};
