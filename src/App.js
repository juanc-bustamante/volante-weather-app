import './App.css';
import Login from './components/login/login.component';
import Weather from './components/weather/weather.component';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route index element={<Login />} />
        <Route path='weather' element={<Weather />} />
    </Routes>
  );
}

export default App;
