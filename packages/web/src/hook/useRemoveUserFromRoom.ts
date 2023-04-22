// useRemoveUserFromRoom.ts

import {User} from 'firebase/auth';
import {useEffect} from 'react';
import removeRoomUser from '../helper/room/removeRoomUser';

export const useRemoveUserFromRoom = (roomId: string, user: User) => {
  useEffect(() => {
    if (!roomId) return;

    const onUnload = () => {
      removeRoomUser(roomId, user);
    };

    window.addEventListener('beforeunload', onUnload);

    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [roomId, user]);
};
