import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassForm from "../class_form/class_form";
import "./class_card.css";

import lapizIcon from './../../../../assets/lapiz.png';
import eliminarIcon from './../../../../assets/eliminar.png';

interface ClassCardProps {
  nameOfClass: string;
  classID: number;
}

const Class_card: React.FC<ClassCardProps> = ({ nameOfClass, classID }) => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL; 

  const [isEditing, setIsEditing] = useState(false);

  const toEdit = () => {
    setIsEditing(true); // Abrir el formulario en modo edición
  };

  const closeForm = () => {
    setIsEditing(false); // Cerrar el formulario
  };

  const toDelete = async () => {
    console.log(classID);
    try {
      const response = await fetch(`${URL}categories`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: classID }),
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la materia");
      }

      console.log("Materia eliminada correctamente");
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  const toClass = () => {
    navigate(`/exams/${classID}`); 
  };

  return (
    <>
      <div className="card">
        <div className="option" onClick={toEdit}>
          <img src={lapizIcon} alt="editar" />
        </div>
        <div className="nameofClass" onClick={toClass}>
          <h2>{nameOfClass}</h2> 
        </div>
        <div className="option" onClick={toDelete}>
          <img src={eliminarIcon} alt="eliminar" />
        </div>
      </div>

      {/* Modal flotante para editar */}
      {isEditing && (
        <div className="modal-background">
          <div className="modal-content">
            <ClassForm isEditModeOn={true} classID={classID} />
            <button className="close-button" onClick={closeForm}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Class_card;
