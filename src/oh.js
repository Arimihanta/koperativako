import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


const BoutonDeNavigation = ({ libelle, history }) => (
  <button type="button" onClick={() => history.push('/mitady-koperativa')}>{libelle}</button>
);
const SomeComponent = () => (
  <Route path="/" render={(props) => <BoutonDeNavigation {...props} title="Changer de page" />} />
)
const App = () => (
  <Router>
    <SomeComponent />
  </Router>
);

export default App ;
