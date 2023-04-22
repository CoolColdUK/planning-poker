import {User} from 'firebase/auth';
import {useEffect, useState} from 'react';
import createRoom from '../helper/room/createRoom';
import isRoomExists from '../helper/room/isRoomExists';

export const useCheckAndCreateRoom = (user: User, roomId: string) => {
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  console.log('useCheckAndCreateRoom', roomId);

  useEffect(() => {
    if (!roomId) return;
    console.log('join');

    async function join() {
      const roomExists = await isRoomExists(roomId);

      if (!roomExists) {
        console.log('create');
        await createRoom(roomId, user);
      }

      setCurrentRoomId(roomId);
    }
    join();
  }, [roomId, user]);
  return currentRoomId;
};
