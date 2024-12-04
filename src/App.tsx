import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import WorksPage from './pages/WorksPage/WorksPage'
import {WorkDetailPage} from './pages/WorkDetailPage/WorkDetailPage'
import { useEffect } from 'react';

// const { invoke } = (window as any).__TAURI__.tauri;

function App(){

  useEffect(() => {
    if (window.TAURI) {
      const { invoke } = window.TAURI.tauri;

      invoke('tauri', { cmd: 'create' })
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));

      return () => {
        invoke('tauri', { cmd: 'close' })
          .then((response: any) => console.log(response))
          .catch((error: any) => console.log(error));
      };
    }
  }, []);

  return(

    <Routes>
      <Route path= "/" element={<HomePage/>}/>
      <Route path= "/works" element={<WorksPage/>}/>
      <Route path={`/work/:workId`} element={<WorkDetailPage />} />
    </Routes>
  )
}


export default App
