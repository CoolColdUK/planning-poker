// useRemoveUserFromRoom.ts

import {useEffect, useRef} from 'react';
import {doc, deleteField, updateDoc} from 'firebase/firestore';
import {firestore} from '../firebaseConfig';
import {User} from 'firebase/auth';

export const useRemoveUserFromRoom = (roomId: string, user: User) => {
  const roomRef = useRef(doc(firestore, 'rooms', roomId));

  useEffect(() => {
    if (!roomId) return;

    const removeUserFromRoom = async () => {
      try {
        await updateDoc(roomRef.current, {
          [`users.${user.uid}`]: deleteField(),
        });
      } catch (error) {
        console.error('Error removing user from room:', error);
      }
    };

    const onUnload = async () => {
      await removeUserFromRoom();
    };

    window.addEventListener('beforeunload', onUnload);

    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [roomId, user]);
};
