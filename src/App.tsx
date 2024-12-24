import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import WorksPage from './pages/WorksPage/WorksPage'
import {WorkDetailPage} from './pages/WorkDetailPage/WorkDetailPage'
import { useEffect } from 'react';
import { ROUTES } from './components/Routes';
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ReconstructionsListPage from './pages/ReconstructionsListPage/ReconstructionsListPage'
import ReconstructionPage from './pages/ReconstructionPage/ReconstructionPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ForbiddenPage from './pages/ForbiddenPage/ForbiddenPage'
// import { useSelector } from 'react-redux'
// import { RootState } from './redux/store'
import WorksListPage from './pages/WorksListPage/WorksListPage'
import WorkChangePage from './pages/WorkChangePage/WorkChangePage'

// const { invoke } = (window as any).__TAURI__.tauri;

function App(){

  // useEffect(() => {
  //   if (window.TAURI) {
  //     const { invoke } = window.TAURI.tauri;

  //     invoke('tauri', { cmd: 'create' })
  //       .then((response: any) => console.log(response))
  //       .catch((error: any) => console.log(error));

  //     return () => {
  //       invoke('tauri', { cmd: 'close' })
  //         .then((response: any) => console.log(response))
  //         .catch((error: any) => console.log(error));
  //     };
  //   }
  // }, []);

  // const { is_staff } = useSelector((state: RootState) => state.auth);

  return(

    <Routes>
      <Route path= "/" element={<HomePage/>}/>
      <Route path={ROUTES.LOGIN} element={<AuthPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.USER_PROFILE} element={<ProfilePage />} />
      <Route path= "/works" element={<WorksPage />}/>
      <Route path={`/work/:workId`} element={<WorkDetailPage />} />
      <Route path= {ROUTES.RECONSTRUCTIONS} element={<ReconstructionsListPage/>}/>
      <Route path= {'/reconstructions/:pk'} element={<ReconstructionPage/>}/>
      <Route path="*" element={<NotFoundPage />}/>
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/works-table" element={<WorksListPage />} />
      <Route path="/work-change/:pk" element={<WorkChangePage />} />
      <Route path="/work-change" element={<WorkChangePage />} />
    </Routes>
  )
}


export default App
