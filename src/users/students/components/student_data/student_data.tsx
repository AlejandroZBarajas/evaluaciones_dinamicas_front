/* import React from "react";

interface Props {
  student: {
    name: string;
    matricula: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StudentData = ({ student, onChange }: Props) => {
  return (
    <div>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={onChange}
          required
        />
      </label>
      <br />
      <label>
        Matrícula:
        <input
          type="text"
          name="matricula"
          value={student.matricula}
          onChange={onChange}
          required
        />
      </label>
    </div>
  );
};

export default StudentData; */



import React from "react";

interface Props {
  student: {
    name: string;
    matricula: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StudentData = ({ student, onChange }: Props) => {
  return (
    <div>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={onChange}
          required
        />
      </label>
      <br />
      <label>
        Matrícula:
        <input
          type="text"
          name="matricula"
          value={student.matricula}
          onChange={onChange}
          required
        />
      </label>
    </div>
  );
};

export default StudentData;
