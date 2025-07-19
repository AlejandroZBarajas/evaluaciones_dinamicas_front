import React from "react";

interface Student {
  matricula: string;
  apellido1: string;
  apellido2: string;
  nombres: string;
  calificacion: number;
}

interface Props {
  students: Student[];
}

const GroupResultsTable: React.FC<Props> = ({ students }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Matrícula</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th>Nombres</th>
          <th>Calificación</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s, idx) => (
          <tr key={idx}>
            <td>{s.matricula}</td>
            <td>{s.apellido1}</td>
            <td>{s.apellido2}</td>
            <td>{s.nombres}</td>
            <td>{s.calificacion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GroupResultsTable;
