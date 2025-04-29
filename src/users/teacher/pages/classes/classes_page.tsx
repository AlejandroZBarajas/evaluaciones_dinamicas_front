//import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../../shared/header";
import Class_card from "../../components/class_card/class_card";
import "./classes_page.css"
import ClassForm from "../../components/class_form/class_form";
interface ClassData {
  id: number;
  name: string;
}

/* interface ClassesProps {
  teacher_id: number;
} */

//const Classes_page: React.FC<ClassesProps> = ({ teacher_id }) => {                dejar esta linea para usar props

const Classes_page = () => { //esta linea evita props
  //const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  const [classes, setClasses] = useState<ClassData[]>([]);
  
  const teacher_id = 1;  //borrar 

  const createClass = async () => {
   // AQUI TAMBIEN QUIERO LLAMAR A ClassForm pero en modo de edicion:false
    try{
        const response = await fetch(`${URL}categories`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
        })
    }
  }

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await fetch(`${URL}categories/teacher`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacher_id: teacher_id }),
        });

        if (!response.ok) {
          throw new Error("No se cargaron materias del maestro");
        }

        const data = await response.json();
        console.log(data)
        setClasses(data); 
      } catch (error) {
        console.error(error);
      }
    };

    getClasses();
  }, [teacher_id, URL]); 

  return (
      < >
          <Header></Header> 
          <div className="newSec" >
            <div className="btnNew" onClick={createClass}>
                <h3>Nueva materia</h3>
            </div>
          </div>
      <div id="classes">
        {classes.map((clase) => (
          <Class_card
            key={clase.id}
            nameOfClass={clase.name}
            classID={clase.id}
          />
        ))}
      </div>
    </>
  );
};

export default Classes_page;
