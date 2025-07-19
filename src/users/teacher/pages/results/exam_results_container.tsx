import React, { useEffect, useState } from "react";
import SubjectResults from "../../components/subject_result/subject_result";

interface Student {
  matricula: string;
  apellido1: string;
  apellido2: string;
  nombres: string;
  calificacion: number;
}

interface GroupResults {
  groupName: string;
  students: Student[];
}

interface ExamResults {
  examName: string;
  groups: GroupResults[];
}

interface SubjectData {
  subjectName: string;
  exams: ExamResults[];
}

const ExamResultsContainer = () => {
  const [data, setData] = useState<SubjectData[]>([]);

  useEffect(() => {
    // Simulación de fetch
    const fetchData = async () => {
      const mockData: SubjectData[] = [
        {
          subjectName: "Matemáticas",
          exams: [
            {
              examName: "Parcial 1",
              groups: [
                {
                  groupName: "Grupo A",
                  students: createMockStudents(1),
                },
                {
                  groupName: "Grupo B",
                  students: createMockStudents(2),
                },
              ],
            },
            {
              examName: "Parcial 2",
              groups: [
                {
                  groupName: "Grupo A",
                  students: createMockStudents(3),
                },
                {
                  groupName: "Grupo B",
                  students: createMockStudents(4),
                },
              ],
            },
          ],
        },
        {
          subjectName: "Física",
          exams: [
            {
              examName: "Parcial 1",
              groups: [
                {
                  groupName: "Grupo C",
                  students: createMockStudents(5),
                },
                {
                  groupName: "Grupo D",
                  students: createMockStudents(6),
                },
              ],
            },
            {
              examName: "Parcial 2",
              groups: [
                {
                  groupName: "Grupo C",
                  students: createMockStudents(7),
                },
                {
                  groupName: "Grupo D",
                  students: createMockStudents(8),
                },
              ],
            },
          ],
        },
      ];

      setData(mockData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((subject, index) => (
        <SubjectResults key={index} subject={subject} />
      ))}
    </div>
  );
};

function createMockStudents(seed: number): Student[] {
  return Array.from({ length: 5 }, (_, i) => ({
    matricula: `20240${seed}${i}`,
    apellido1: `Apellido1_${i}`,
    apellido2: `Apellido2_${i}`,
    nombres: `Alumno ${i}`,
    calificacion: Math.floor(Math.random() * 41 + 60), // 60-100
  }));
}

export default ExamResultsContainer;
