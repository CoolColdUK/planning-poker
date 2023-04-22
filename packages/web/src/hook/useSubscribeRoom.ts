// useSubscribeRoom.ts

import {User} from 'firebase/auth';
import {onSnapshot} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import addRoomUser from '../helper/room/addRoomUser';
import getRoomDoc from '../helper/room/getRoomDoc';
import removeRoomUser from '../helper/room/removeRoomUser';
import {RoomData} from '../interface/RoomData';
import {useCheckAndCreateRoom} from './useCheckAndCreateRoom';

export const useSubscribeRoom = (user: User, roomId: string) => {
  const [room, setRoom] = useState<RoomData | null>(null);
  const currentRoomId = useCheckAndCreateRoom(user, roomId);

  console.log('useSubscribeRoom', currentRoomId);

  useEffect(() => {
    if (!currentRoomId) {
      setRoom(null);
      return;
    }

    console.log(`useSubscribeRoom - subscribe ${currentRoomId}`);

    const subscribe = () =>
      onSnapshot(getRoomDoc(currentRoomId), (snapshot) => {
        // console.log('in');
        if (snapshot.exists()) {
          const data = snapshot.data();
          setRoom(data);
          if (!(user.uid in data.users)) {
            console.log(`useSubscribeRoom - add user ${currentRoomId}`);
            addRoomUser(currentRoomId, user);
          }
        } else {
          setRoom(null);
          // console.error('Room not found');
        }
      });

    const unsubscribe = subscribe();

    return () => {
      console.log(`useSubscribeRoom - unsubscribe from ${currentRoomId}, room content ${JSON.stringify(room)}`);
      unsubscribe();
      removeRoomUser(currentRoomId, user);
      // if (!room) return;

      // const numberOfUsers = Object.keys(room.users).length;
      // console.log(`useSubscribeRoom - remove, user count #${numberOfUsers}, users: ${Object.keys(room.users).join(',')}`);
      // if (numberOfUsers === 1 && isUserInRoom(room, user)) {
      //   console.log(`remove room ${currentRoomId}`);
      //   removeRoom(currentRoomId);
      // } else {
      //   console.log(`remove user from room ${currentRoomId}`);
      //   removeRoomUser(currentRoomId, user);
      // }
    };
  }, [currentRoomId, user]);

  console.log('room', currentRoomId, roomId, room?.users);
  return room;
};
