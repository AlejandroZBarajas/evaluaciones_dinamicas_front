import { Routes, Route } from 'react-router-dom';

import LoginPage from './users/pages/auth';
import Home from "./users/teacher/pages/home/home"
import Classes_page from './users/teacher/pages/classes/classes_page';
import ExamPage from './users/teacher/pages/exams_page/exam_page';

function App() {
  return (
    <Routes>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/materias" element={<Classes_page />} />
      <Route path="/examenes" element={<ExamPage />} />
    </Routes>
  );
}

export default App;
