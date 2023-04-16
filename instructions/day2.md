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

## Question 14

Error updating vote:  FirebaseError: Function updateDoc() called with invalid data. Unsupported field value: a custom ProactiveRefresh object (found in field users.LiywZ7OuhPWFs7H9mFif8DqNHZl1.proactiveRefresh in document rooms/YsaBEUrpFgLw46KNVUSl)

this line: summary[user.vote]++;
give error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ XS: number; S: number; M: number; L: number; XL: number; notVoted: number; skipped: number; }'.
  No index signature with a parameter of type 'string' was found on type '{ XS: number; S: number; M: number; L: number; XL: number; notVoted: number; skipped: number; }'

also can we use skip string as vote instead of null, otherwise it will appear as Not Voted

## Question 15

create a function in separate file called `mapUserToVoteUser` to convert User to VoteUser

## Question 16

I cannot create room anymore
Error creating room:  FirebaseError: Function addDoc() called with invalid data. Unsupported field value: undefined

## Question 17

same error, this time with vote
Error creating room:  FirebaseError: Function addDoc() called with invalid data. Unsupported field value: undefined (found in field users.LiywZ7OuhPWFs7H9mFif8DqNHZl1.vote in document rooms/pRqeyPlvGPhUku5JIxYE) 

I have put `mapUserToVoteUser` in mapUserToVoteUser.ts as I prefer one function per file. It is using default export

## Question 18

Matthew So
I have created VoteEnum with the following content
```
export enum VoteEnum {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  SKIP = 'Skip',
  NOT_VOTED = 'Not Voted',
}
```
PLease update to use that instead in the various functions. Also use not vote for default vote

## Question 19

modify room such that if a room does not exists, it will create it on the fly

## Question 20

refactor check and create room into custom hook called `useSubscribeRoom`, which take a room name as parameter, checks and create room if required, then subscribe to it automatically

## Question 21

when id is undefined, maybe use uuid to generate a random room name of 4 character long. remove create-room component and make the create-room button to visit /rooms directly so the rooms page also act as create-room page

## Question 22

- add label to pie chart to identify what is selected
- when the browser closed, the user should no longer be listed
- when the user first visit the room, everyone should know

## Question 23

i have updated the hook such that it will always require a string for room name. Also updated the import path
```
// useSubscribeRoom.ts

import {User} from 'firebase/auth';
import {deleteField, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import {useEffect, useRef, useState} from 'react';
import {firestore} from '../firebaseConfig';
import {VoteEnum} from '../enum/VoteEnum';
import mapUserToVoteUser from '../helper/mapUserToVoteUser';
import {RoomData} from '../interface/RoomData';

export const useSubscribeRoom = (roomId: string, user: User) => {
  const [room, setRoom] = useState<RoomData | null>(null);
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
```

are there any missing functionality from the original plan?

## Question 24

hide the user's vote until all users have voted

## Question 25

- skipped should be considered as voted
- create a util function called isUserVoted, taking VoteUser as parameter
- create a util function called hasAllUserVoted, taking RoomData as parameter and identify if all users have voted
- create a util function called summariseUserVote, replacing and refactored version of`calculateVoteSummary`
- create separate component for pie chart

## Question 26

why change rechart to react-chartjs-2? only use one chart package please

## Question 27

it is showing the vote again. Votes should only be shown when everyone has voted

## Question 28

add a text field in the navbar to go to specific room
