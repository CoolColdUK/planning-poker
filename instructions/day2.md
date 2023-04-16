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
