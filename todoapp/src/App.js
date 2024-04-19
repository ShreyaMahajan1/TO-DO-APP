
import './App.css';

import { BrowserRouter ,Routes ,Route } from 'react-router-dom';
import Login from './Components/Login';
import Error from './Components/Error';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import UserRegister from './Components/UserRegister';
import TodoList from './Components/ToDo';

function App() {
  return (
    <div>
    
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<Login/>}/> 
         <Route path="/UserRegister" element={<UserRegister/>}/> 
         <Route path="/ToDo" element={<TodoList/>}/> 
        <Route path="/*" element={<Error/>}/> 
        
        </Routes>
      </BrowserRouter>
      <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
      />

      
    </div>
  );
}
export default App;
