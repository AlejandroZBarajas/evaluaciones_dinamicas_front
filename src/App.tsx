import { Routes, Route } from 'react-router-dom';

import LoginForm from './users/pages/login';
import Home from "./users/teacher/pages/home/home"
import Classes_page from './users/teacher/pages/classes/classes_page';
import ExamPage from './users/teacher/pages/exams_page/exam_page';
import QuestionsByExamPage from './users/teacher/pages/questions_by_exam_page/questions_by_exam_page';
import FormTester from './formTester';
import RegisterForm from './users/pages/register';


function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/materias" element={<Classes_page />} />
      <Route path="/examenes" element={<ExamPage />} />
      <Route path="/questions" element={<QuestionsByExamPage />} />
       <Route path="/test" element={<FormTester />} /> 
    </Routes>
  );
}

export default App;
