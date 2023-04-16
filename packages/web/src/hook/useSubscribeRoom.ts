// useSubscribeRoom.ts

import {User} from 'firebase/auth';
import {deleteField, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {firestore} from '../firebaseConfig';
import {VoteEnum} from '../enum/VoteEnum';
import mapUserToVoteUser from '../helper/mapUserToVoteUser';
import {RoomData} from '../interface/RoomData';

export const useSubscribeRoom = (roomId: string, user: User) => {
  const [room, setRoom] = useState<RoomData | null>(null);
  const roomRef = useRef(doc(firestore, 'rooms', roomId));

  const history = useHistory();

  useEffect(() => {
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

    const unlisten = history.listen(async ({action}) => {
      if (action === 'POP' || action === 'PUSH') {
        await removeUserFromRoom();
      }
    });

    window.addEventListener('beforeunload', onUnload);

    return () => {
      unlisten();
      unsubscribe();
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [roomId, user, history]);

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

    const unsubscribe = onSnapshot(roomRef.current, (snapshot) => {
      if (snapshot.exists()) {
        setRoom(snapshot.data() as RoomData);
      } else {
        console.error('Room not found');
      }
    });

    const onUnload = async () => {
      try {
        await updateDoc(roomRef.current, {
          [`users.${user.uid}`]: deleteField(),
        });
      } catch (error) {
        console.error('Error removing user from room:', error);
      }
    };

    window.addEventListener('beforeunload', onUnload);

    return () => {
      unsubscribe();
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [roomId, user]);

  useEffect(() => {
    if (!roomId || !room) return;

    const addUserToRoom = async () => {
      if (!room.users[user.uid]) {
        try {
          await updateDoc(roomRef.current, {
            [`users.${user.uid}`]: mapUserToVoteUser(user, VoteEnum.NOT_VOTED),
          });
        } catch (error) {
          console.error('Error adding user to room:', error);
        }
      }
    };

    addUserToRoom();
  }, [roomId, room, user]);

  return room;
};
