// useSubscribeRoom.ts

import {User} from 'firebase/auth';
import {onSnapshot} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import getRoomDoc from '../helper/room/getRoomDoc';
import removeRoom from '../helper/room/removeRoom';
import removeRoomUser from '../helper/room/removeRoomUser';
import {RoomData} from '../interface/RoomData';
import {useCheckAndCreateRoom} from './useCheckAndCreateRoom';

export const useSubscribeRoom = (user: User, roomId: string) => {
  const [room, setRoom] = useState<RoomData | null>(null);
  const currentRoomId = useCheckAndCreateRoom(user, roomId);

  console.log('useSubscribeRoom', currentRoomId, user);

  useEffect(() => {
    if (!currentRoomId) return;
    console.log(`useSubscribeRoom - subscribe ${currentRoomId}`);

    const subscribe = () =>
      onSnapshot(getRoomDoc(currentRoomId), (snapshot) => {
        console.log('in');
        if (snapshot.exists()) {
          setRoom(snapshot.data() as RoomData);
        } else {
          // console.error('Room not found');
        }
      });

    const unsubscribe = subscribe();

    return () => {
      console.log('useSubscribeRoom - unsubscribe');
      unsubscribe();
      if (!room) return;

      const numberOfUsers = Object.keys(room.users).length;
      console.log(`useSubscribeRoom - remove ${numberOfUsers}`);
      if (numberOfUsers > 1) {
        console.log(`remove user from room ${currentRoomId}`);
        removeRoomUser(currentRoomId, user);
      } else {
        console.log(`remove room ${currentRoomId}`);
        removeRoom(currentRoomId);
      }
    };
  }, [currentRoomId, user]);

  console.log('room', currentRoomId, room);
  return room;
};
