import {BrowserRouter as Router, Route, Routes as RR} from 'react-router-dom';
import App from './App';
import Login from './Login';

export default function Routes() {
  return (
    <Router>
      <RR>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />} />
      </RR>
    </Router>
  );
}
