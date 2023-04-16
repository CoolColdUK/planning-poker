import {User, onAuthStateChanged} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {Routes as RR, Route, BrowserRouter as Router} from 'react-router-dom';
import {firebaseAuth} from '../firebaseConfig'; // Adjust the import path if necessary
import App from './App';
import CreateRoom from './CreateRoom';
import Login from './Login'; // Adjust the import path if necessary
import Navbar from './Navbar';
import Room from './Rooms';

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
      <Navbar user={user} />
      <RR>
        <Route path="/login" element={<Login onUserChanged={setUser} />} />
        <Route path="/create-room" element={user ? <CreateRoom user={user} /> : <Login onUserChanged={setUser} />} />
        <Route path="/rooms/:id" element={user ? <Room user={user} /> : <Login onUserChanged={setUser} />} />
        {/* Add other routes, like the Room component, as needed */}
        <Route path="/" element={user ? <App user={user} /> : <Login onUserChanged={setUser} />} />{' '}
      </RR>
    </Router>
  );
}
