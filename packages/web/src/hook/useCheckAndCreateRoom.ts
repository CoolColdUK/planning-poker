// useCheckAndCreateRoom.ts

import {useEffect, useRef} from 'react';
import {doc, getDoc, setDoc, serverTimestamp} from 'firebase/firestore';
import {firestore} from '../firebaseConfig';
import {VoteEnum} from '../enum/VoteEnum';
import mapUserToVoteUser from '../helper/mapUserToVoteUser';
import {User} from 'firebase/auth';

export const useCheckAndCreateRoom = (roomId: string, user: User) => {
  const roomRef = useRef(doc(firestore, 'rooms', roomId));

  useEffect(() => {
    if (!roomId) return;

    const checkAndCreateRoom = async () => {
      const roomSnapshot = await getDoc(roomRef.current);

      if (!roomSnapshot.exists()) {
        const newRoom = {
          createdAt: serverTimestamp(),
          createdBy: user.uid,
          users: {
            [user.uid]: mapUserToVoteUser(user, VoteEnum.NOT_VOTED),
          },
        };
        await setDoc(roomRef.current, newRoom);
      }
    };

    checkAndCreateRoom();
  }, [roomId, user]);
};
