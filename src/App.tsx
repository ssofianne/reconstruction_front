import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import WorksPage from './pages/WorksPage/WorksPage'
import {WorkDetailPage} from './pages/WorkDetailPage/WorkDetailPage'

function App(){
  return(

    <Routes>
      <Route path= "/" element={<HomePage/>}/>
      <Route path= "/works" element={<WorksPage/>}/>
      <Route path={`/work/:workId`} element={<WorkDetailPage />} />
    </Routes>
  )
}


export default App
