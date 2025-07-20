/* import React, { useEffect, useState } from "react";
import StudentData from "../../components/student_data/student_data";
import ShuffledQuestion from "../../components/shuffled_question/shuffled_question";

interface QuestionData {
  question: string;
  options: string[];
  answer: string;
}

interface Question {
  question_data: QuestionData;
  category_id: number;
  exam_id: number;
}

const RandomExamPage = () => {
  const [studentData, setStudentData] = useState({ name: "", matricula: "" });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/random_exam")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (questionText: string, answer: string) => {
    setResponses({ ...responses, [questionText]: answer });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      student: studentData,
      answers: responses,
    };
    console.log("Enviando datos:", payload);

    fetch("http://localhost:8080/submit_exam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Examen enviado exitosamente");
        console.log(data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Examen aleatorio</h1>

      
      <section>
        <StudentData student={studentData} onChange={handleInputChange} />
      </section>

    
      <section>
        {loading ? (
          <p>Cargando preguntas...</p>
        ) : (
          questions.map((q, idx) => (
            <ShuffledQuestion
              key={idx}
              question={q.question_data}
              onAnswer={handleAnswerChange}
            />
          ))
        )}
      </section>

      <button type="submit">Enviar examen</button>
    </form>
  );
};

export default RandomExamPage;
 */


import React, { useEffect, useState } from "react";
import StudentData from "../../components/student_data/student_data";
import ShuffledQuestion from "../../components/shuffled_question/shuffled_question";

interface QuestionData {
  question: string;
  options: string[];
  answer: string;
}

interface Question {
  question_data: QuestionData;
  category_id: number;
  exam_id: number;
}

// Datos simulados
const mockQuestions: Question[] = [
  {
    question_data: {
      question: "¿Cuál es la capital de Francia?",
      options: ["Londres", "Roma", "Berlín"],
      answer: "París",
    },
    category_id: 1,
    exam_id: 1,
  },
  {
    question_data: {
      question: "¿Cuánto es 2 + 2?",
      options: ["3", "5", "1"],
      answer: "4",
    },
    category_id: 1,
    exam_id: 1,
  },
];

const RandomExamPage = () => {
  const [studentData, setStudentData] = useState({ name: "", matricula: "" });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("http://localhost:8080/random_exam")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setQuestions(data);
    //     setLoading(false);
    //   });

    // Simulando fetch
    setTimeout(() => {
      setQuestions(mockQuestions);
      setLoading(false);
    }, 500);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (questionText: string, answer: string) => {
    setResponses({ ...responses, [questionText]: answer });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      student: studentData,
      answers: responses,
    };
    console.log("Simulando envío de datos al backend:", payload);
    alert("Simulación completada. Revisa la consola.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Examen aleatorio</h1>

      <section>
        <StudentData student={studentData} onChange={handleInputChange} />
      </section>

      <section>
        {loading ? (
          <p>Cargando preguntas...</p>
        ) : (
          questions.map((q, idx) => (
            <ShuffledQuestion
              key={idx}
              question={q.question_data}
              onAnswer={handleAnswerChange}
            />
          ))
        )}
      </section>

      <button type="submit">Enviar examen</button>
    </form>
  );
};

export default RandomExamPage;
