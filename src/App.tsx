import { Routes, Route } from 'react-router-dom';

import LoginForm from './users/pages/login';
import Home from "./users/teacher/pages/home/home"
import Classes_page from './users/teacher/pages/classes/classes_page';
import ExamPage from './users/teacher/pages/exams_page/exam_page';
import QuestionsByExamPage from './users/teacher/pages/questions_by_exam_page/questions_by_exam_page';
import RegisterForm from './users/pages/register';
import ExamsByClass from './users/teacher/pages/examsby_class/examsby_class';


function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/materias" element={<Classes_page />} />
      <Route path="/examenes" element={<ExamPage />} />
      <Route path="/questions" element={<QuestionsByExamPage />} />
      <Route path="/examsbyclass" element={<ExamsByClass />} /> 
    </Routes>
  );
}

export default App;
