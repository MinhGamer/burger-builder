import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import ContactForm from './container/ContactForm/ContactForm';
import OrderHistory from './components/OrdersHistory/OrdersHistory';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/contact-form' component={ContactForm} />
        <Route path='/orders' component={OrderHistory} />
        <Route path='/' component={BurgerBuilder} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
