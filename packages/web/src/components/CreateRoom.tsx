import {User} from 'firebase/auth';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {firestore} from '../firebaseConfig'; // Adjust the import path if necessary

interface CreateRoomProps {
  user: User;
}

export default function CreateRoom({user}: CreateRoomProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const createRoom = async () => {
      const roomRef = collection(firestore, 'rooms');
      const room = {
        createdAt: serverTimestamp(),
        createdBy: user.uid,
        users: [
          {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        ],
      };

      try {
        const docRef = await addDoc(roomRef, room);
        navigate(`/rooms/${docRef.id}`);
      } catch (error) {
        console.error('Error creating room: ', error);
      }
    };

    if (user) {
      createRoom();
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Creating room...</h1>
    </div>
  );
}
