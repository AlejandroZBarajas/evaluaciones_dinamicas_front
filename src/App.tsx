import { Routes, Route } from 'react-router-dom';

import LoginPage from './users/pages/auth';
import Home from "./users/teacher/pages/home/home"
import Classes_page from './users/teacher/pages/classes/classes_page';
import ExamPage from './users/teacher/pages/exams_page/exam_page';
import QuestionsByExamPage from './users/teacher/pages/questions_by_exam_page/questions_by_exam_page';
import FormTester from './formTester';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/materias" element={<Classes_page />} />
      <Route path="/examenes" element={<ExamPage />} />
      <Route path="/questions" element={<QuestionsByExamPage />} />
       <Route path="/test" element={<FormTester />} /> 
    </Routes>
  );
}

export default App;
