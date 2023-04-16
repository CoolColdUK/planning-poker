// useSubscribeRoom.ts

import {useEffect, useState} from 'react';
import {doc, onSnapshot} from 'firebase/firestore';
import {firestore} from '../firebaseConfig';
import {RoomData} from '../interface/RoomData';
import {User} from 'firebase/auth';

export const useSubscribeRoom = (roomId: string, _user: User) => {
  const [room, setRoom] = useState<RoomData | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const roomRef = doc(firestore, 'rooms', roomId);

    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        setRoom(snapshot.data() as RoomData);
      } else {
        console.error('Room not found');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [roomId]);

  return room;
};
