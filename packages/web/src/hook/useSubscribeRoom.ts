// useSubscribeRoom.ts

import {useEffect, useState} from 'react';
import {doc, onSnapshot, setDoc, getDoc, serverTimestamp} from 'firebase/firestore';
import {firestore} from '../firebaseConfig';
import {User} from 'firebase/auth';
import {VoteEnum} from '../enum/VoteEnum';
import mapUserToVoteUser from '../helper/mapUserToVoteUser';
import {RoomData} from '../interface/RoomData';

export const useSubscribeRoom = (roomId: string, user: User) => {
  const [room, setRoom] = useState<RoomData | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const roomRef = doc(firestore, 'rooms', roomId);

    const checkAndCreateRoom = async () => {
      const roomSnapshot = await getDoc(roomRef);

      if (!roomSnapshot.exists()) {
        const newRoom = {
          createdAt: serverTimestamp(),
          createdBy: user.uid,
          users: {
            [user.uid]: mapUserToVoteUser(user, VoteEnum.NOT_VOTED),
          },
        };
        await setDoc(roomRef, newRoom);
      }
    };

    checkAndCreateRoom();

    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        setRoom(snapshot.data() as RoomData);
      } else {
        console.error('Room not found');
      }
    });

    return () => unsubscribe();
  }, [roomId, user]);

  return room;
};
