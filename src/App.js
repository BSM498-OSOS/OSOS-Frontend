import {Routes,Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthRoute from './routes/AuthRoute';
import NotEnoughClearance from './pages/NotEnoughClearance';
import ProtectedRoute from './routes/ProtectedRoute';
function App() {
  const {user}=useSelector(state=>state.auth)
  return (
   <>
   
    <Routes>
      {!user && <Route path="*" element={<AuthRoute/>}/>}
      {user&& <Route path="*" element={<ProtectedRoute/>}/>}
      <Route path="/notenoughclearance" element={<NotEnoughClearance/>}/>  
      </Routes>
   </>
  );
}
export default App;
