import { useEffect, useState } from "react";
import Header from "../../../shared/header";
import Class_card from "../../components/class_card/class_card";
import "./classes_page.css";
import ClassForm from "../../components/class_form/class_form";
import addIcon from "../../../../assets/boton-agregar.png"

interface ClassData {
  id: number;
  name: string;
}


const Classes_page = () => {
  const URL = import.meta.env.VITE_API_URL;
  const [classes, setClasses] = useState<ClassData[]>([]);
  const teacher_id = 1; // temporal para pruebas

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedClassID, setSelectedClassID] = useState<number | undefined>(undefined);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${URL}categories/teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacher_id }),
      });

      if (!response.ok) throw new Error("No se cargaron materias del maestro");

      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const createClass = () => {
    setEditMode(false);
    setSelectedClassID(undefined);
    setShowForm(true);
  };

  const editClass = (classID: number) => {
    setEditMode(true);
    setSelectedClassID(classID);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <Header />
      <div className="newSec">

        <div className="title">
          <h2 className="materias">Tus materias</h2>
        </div>

        <div className="btnNew" onClick={createClass}>

          <div className="icon">
            <img src={addIcon} alt="" />
          </div>

          <div className="btnTitle">
            <h3 className="nueva">Nueva materia</h3>
          </div>

        </div>
      </div>

      <div id="classes">
        {classes.map((clase) => (
          <Class_card
            key={clase.id}
            nameOfClass={clase.name}
            classID={clase.id}
            onEdit={editClass}
            refreshClasses={fetchClasses}
          />
        ))}
      </div>

      {showForm && (
        <div className="modal-background">
          <div className="modal-content">
            <ClassForm
              isEditModeOn={editMode}
              classID={selectedClassID}
              closeForm={closeForm}
              refreshClasses={() => {
                closeForm();
                fetchClasses();
              }}
            />
            <button className="close-button" onClick={closeForm}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Classes_page;
