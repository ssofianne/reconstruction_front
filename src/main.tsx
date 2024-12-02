import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
// import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/reconstruction_front">
      <App />
  </BrowserRouter>
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("reconstruction_front/serviceWorker.js")
      .then((registration) => {
        console.log('Service Worker зарегистрирован: ', registration);
    })
    .catch((error) => {
        console.error('Service Worker не зарегистрирован: ', error);
    });
})
}