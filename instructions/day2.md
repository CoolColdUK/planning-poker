## Day 2

## Question 1

```
what other components do I need now?
```

```
Based on the requirements you mentioned earlier for the planning poker progressive web app, here are some additional components you might need:

CreateRoom: A component that allows users to create a room for planning poker. It could have a form that takes a room name or generates a random unique identifier for the room. After creating the room, the user should be redirected to the Room component.

Room: A component that displays the planning poker room. It should show the room name or identifier and a list of users who have joined the room. This component should also have the voting functionality, where each user can vote using T-shirt sizing (XS, S, M, L, XL). Additionally, it should provide a way to share the room link with other users.

VotingResults: A component that displays the voting results once all users in the room have finished voting. This component should show a graph or a chart representing the number of votes for each T-shirt size. You can use a library like Recharts or Chart.js to create the visualization.

InviteLink: A component that generates and displays the invite link for the room, allowing users to easily share it with others. You could use the room's unique identifier to generate the link.

To navigate between components and create a smooth user experience, you can utilize the React Router library that you have already implemented. This way, you can create routes for each component and use navigation links or programmatic navigation to move between different parts of the application.

Remember to consider best practices for state management, prop drilling, and real-time updates using Firebase subscriptions while building out these components.
```

## Question 2

give me the code for create room component. I want the room creation to be automatic so some logged in user visiting a link will automatically create the room. The user will also be able to see other users within the room. 

## Question 3

this is the code for routers with the correct folder structure
```
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes as RR} from 'react-router-dom';
import {onAuthStateChanged, User} from 'firebase/auth';
import {firebaseAuth} from '../firebaseConfig'; // Adjust the import path if necessary
import App from './App';
import Login from './Login'; // Adjust the import path if necessary
import CreateRoom from './CreateRoom';

export default function Routes() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (returnedUser) => {
      setUser(returnedUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <RR>
        <Route path="/login" element={<Login onUserChanged={setUser} />} />
        <Route path="/create-room" element={user ? <CreateRoom /> : <Login onUserChanged={setUser} />} />
        {/* Add other routes, like the Room component, as needed */}
        <Route path="/" element={user ? <App user={user} /> : <Login onUserChanged={setUser} />} />{' '}
      </RR>
    </Router>
  );
}
```

there are a few errors in createRoom component
- useHistory is no longer exported, new function is useNavigate
- there is no firestore in firebaseConfig file
- query and where is not used in import of firebase/firestore

please update the createRoom component

## Question 4

give me the code for rooms

## Question 5

currently the code are as follow for createRooms and room
```
//CreateRoom.tsx
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

```

```
//Rooms.tsx
import {Button, Container, List, ListItem, ListItemText, Typography} from '@mui/material';
import {Timestamp, arrayUnion, doc, onSnapshot, updateDoc} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {firestore} from '../firebaseConfig'; // Adjust the import path if necessary
import {User} from 'firebase/auth';

interface VoteUser extends User {
  vote?: string;
}

interface RoomData {
  createdAt: Timestamp;
  createdBy: string;
  users: VoteUser[];
}

export interface RoomProps {
  user: User;
}

export default function Room(props: RoomProps) {
  const {id} = useParams<'id'>();
  const [room, setRoom] = useState<RoomData | null>(null);

  useEffect(() => {
    if (!id) return;
    const roomRef = doc(firestore, 'rooms', id);
    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        setRoom(snapshot.data() as RoomData);
      } else {
        console.error('Room not found');
      }
    });

    return () => unsubscribe();
  }, [id]);

  const handleVote = async (vote: string) => {
    if (!id) return;
    const roomRef = doc(firestore, 'rooms', id);
    try {
      await updateDoc(roomRef, {
        users: arrayUnion({...props.user, vote}), // Assumes you have access to the current user object
      });
    } catch (error) {
      console.error('Error updating vote: ', error);
    }
  };

  if (!room) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Room {id}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <List>
        {room.users.map((user) => (
          <ListItem key={user.uid}>
            <ListItemText primary={user.displayName} secondary={user.vote ? `Voted: ${user.vote}` : 'Not voted'} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom>
        Vote
      </Typography>
      <Button onClick={() => handleVote('XS')}>XS</Button>
      <Button onClick={() => handleVote('S')}>S</Button>
      <Button onClick={() => handleVote('M')}>M</Button>
      <Button onClick={() => handleVote('L')}>L</Button>
      <Button onClick={() => handleVote('XL')}>XL</Button>
    </Container>
  );
}

```

modify it to use map data structure instead of array in the room interface

also create a new VoteUser interface in separate file

## Question 6

rebaseError: Function arrayUnion() called with invalid data. Unsupported field value: a custom ProactiveRefresh object (

## Question 7

ror updating vote:  FirebaseError: Function updateDoc() called with invalid data. Unsupported field value: a custom ProactiveRefresh object (found in field users.LiywZ7OuhPWFs7H9mFif8DqNHZl1.proactiveRefresh in document rooms/kX4cPZzzFMAd8xhOhH2L)
o

## Question 8

create a bar menu at the top to access various links

## Question 9

add reset button to reset all vote in room

## Question 10

got these two errors
- 'room.users.map' is possibly 'undefined'.ts(18048)
- Module '"firebase/firestore"' has no exported member 'update'.

## Question 11

where does `room` variable comes from?

## Question 12

'room.users.map' is possibly 'undefined'
please note users is an object

## Question 13

add a summary in pie chart in room page to summarise number of votes and number not voted
also allow a skip vote in case someone doesn't want to vote
