import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes as RR} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import {firebaseAuth} from './firebaseConfig';
import App from './App';
import Login from './components/Login';

export default function Routes() {
  const [user, setUser] = useState(null);

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
        <Route path="/" element={user ? <App user={user} /> : <Login onUserChanged={setUser} />} />
      </RR>
    </Router>
  );
}
