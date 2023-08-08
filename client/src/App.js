
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './components/Pages/Home';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </>
 


  );
}

export default App;
