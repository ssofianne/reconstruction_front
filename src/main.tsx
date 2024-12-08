import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
// import storage from '/src/redux/store';
import storage from './redux/store.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/reconstruction_front">
    <Provider store={storage}>
      <App />
    </Provider>
  </BrowserRouter>
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/reconstruction_front/serviceWorker.js")
      .then((registration) => {
        console.log('Service Worker зарегистрирован: ', registration);
    })
    .catch((error) => {
        console.error('Service Worker не зарегистрирован: ', error);
    });
})
}