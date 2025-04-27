import { Routes, Route } from 'react-router-dom';

import LoginPage from './users/pages/auth';
import Home from "./users/teacher/pages/home"

function App() {
  return (
    <Routes>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
