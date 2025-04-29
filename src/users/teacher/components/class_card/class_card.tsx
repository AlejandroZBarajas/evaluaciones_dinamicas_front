//import { useNavigate } from "react-router-dom";
import "./class_card.css";

import lapizIcon from './../../../../assets/lapiz.png';
import eliminarIcon from './../../../../assets/eliminar.png';

interface ClassCardProps {
  nameOfClass: string;
  classID: number;
  onEdit: (id: number) => void;
  refreshClasses: () => void;
}

const Class_card: React.FC<ClassCardProps> = ({
  nameOfClass,
  classID,
  onEdit,
  refreshClasses
}) => {
 // const navigate = useNavigate();   servirá cuando la api tenga un endpoint para obtener "examsByCategoryID"
  const URL = import.meta.env.VITE_API_URL; 

  const toEdit = () => {
    onEdit(classID); // llama al modal desde el padre
  };

  const toDelete = async () => {
    try {
      const response = await fetch(`${URL}categories`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: classID }),
      });

      if (!response.ok) throw new Error("Error al eliminar la materia");

      console.log("Materia eliminada correctamente");
      refreshClasses(); // actualizar lista
    } catch (error) {
      console.error(error);
    }
  };

  /* const toClass = () => {
    navigate(`/exams/${classID}`); 
  }; */

  return (
    <div className="card">
      <div className="option" onClick={toEdit}>
        <img src={lapizIcon} alt="editar" />
      </div>
      <div className="nameofClass"/*  onClick={toClass} */>
        <h2>{nameOfClass}</h2> 
      </div>
      <div className="option" onClick={toDelete}>
        <img src={eliminarIcon} alt="eliminar" />
      </div>
    </div>
  );
};

export default Class_card;
