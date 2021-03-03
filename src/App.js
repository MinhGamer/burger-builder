import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import ContactForm from './container/ContactForm/ContactForm';
import HistoryOrders from './components/HistoryOrders/HistoryOrders';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/contact-form' component={ContactForm} />
        <Route path='/history-orders' component={HistoryOrders} />
        <Route path='/' component={BurgerBuilder} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
