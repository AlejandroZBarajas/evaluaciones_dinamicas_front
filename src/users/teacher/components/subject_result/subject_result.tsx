import React, { useState } from "react";
import GroupResultsTable from "../group_results_table/group_results_table";
interface Props {
  subject: {
    subjectName: string;
    exams: {
      examName: string;
      groups: {
        groupName: string;
        students: {
          matricula: string;
          apellido1: string;
          apellido2: string;
          nombres: string;
          calificacion: number;
        }[];
      }[];
    }[];
  };
}

const SubjectResults: React.FC<Props> = ({ subject }) => {
  const [expanded, setExpanded] = useState(false);
  const [groupExpanded, setGroupExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (groupKey: string) => {
    setGroupExpanded((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  return (
    <div>
      <div onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer" }}>
        <h2>{subject.subjectName}</h2>
      </div>

      {expanded &&
        subject.exams.map((exam, examIdx) => (
          <div key={examIdx}>
            <h3>{exam.examName}</h3>
            <div style={{ display: "flex", gap: "1rem" }}>
              {exam.groups.map((group, groupIdx) => {
                const groupKey = `${examIdx}-${groupIdx}`;
                return (
                  <div key={groupKey}>
                    <div onClick={() => toggleGroup(groupKey)} style={{ cursor: "pointer" }}>
                      <strong>{group.groupName}</strong>
                    </div>
                    {groupExpanded[groupKey] && <GroupResultsTable students={group.students} />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SubjectResults;
