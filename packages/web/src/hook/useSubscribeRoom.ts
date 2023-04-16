// useSubscribeRoom.ts

import {User} from 'firebase/auth';
import {doc, onSnapshot} from 'firebase/firestore';
import {useEffect, useRef, useState} from 'react';
import {firestore} from '../firebaseConfig';
import {RoomData} from '../interface/RoomData';

export const useSubscribeRoom = (roomId: string, user: User) => {
  const [room, setRoom] = useState<RoomData | null>(null);
  const roomRef = useRef(doc(firestore, 'rooms', roomId));

  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = onSnapshot(roomRef.current, (snapshot) => {
      if (snapshot.exists()) {
        setRoom(snapshot.data() as RoomData);
      } else {
        console.error('Room not found');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [roomId, user]);

  return room;
};
