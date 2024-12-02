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