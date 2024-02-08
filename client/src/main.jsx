import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById('root')).render(
  //wrap the app with the provider and persist gate
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>,
)