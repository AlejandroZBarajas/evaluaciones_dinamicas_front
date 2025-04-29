import { Routes, Route } from 'react-router-dom';

import LoginPage from './users/pages/auth';
import Home from "./users/teacher/pages/home/home"
import Classes_page from './users/teacher/pages/classes/classes_page';

function App() {
  return (
    <Routes>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/materias" element={<Classes_page />} />
      {/*<Route path="/editClass/:id" element={<EditClassPage />} />  <-- Aquí capturas el id */}
      {/*<Route path="/exams/:id" element={<ExamsPage />} />  <-- Aquí también */}
    </Routes>
  );
}

export default App;
