import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './Login';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={App} />
      </Switch>
    </Router>
  );
}
