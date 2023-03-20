import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './components/Login';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}
