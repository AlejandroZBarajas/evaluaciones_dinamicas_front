import { useState } from "react";
import acceptIcon from "./../../../../assets/accept.png"
import "./../../../../App.css"


interface EditOrCreate {
    isEditModeOn: boolean;
    classID?: number; 
    closeForm: () => void;
    refreshClasses: () => void
}

const ClassForm: React.FC<EditOrCreate> = ({ isEditModeOn, classID, closeForm,  refreshClasses  }) => {
    const URL = import.meta.env.VITE_API_URL; 
    const teacher_id = Number(localStorage.getItem("user_id"))
    console.log(teacher_id)

    const [nameOfClass, setNameOfClass] = useState<string>("");

  

    const handleAccept = async () => {
        if (nameOfClass.trim() === "") {
            alert("El nombre de la materia no puede estar vacío.");
            return;
        }
        console.log(nameOfClass)
        console.log("CLICK")
        try {
            console.log(isEditModeOn)
            console.log("url: "+`${URL}/categories`)
            const response = await fetch(`${URL}categories`, {
                method: isEditModeOn  ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify(
                    isEditModeOn
                        ? {
                              id: classID,         
                              name: nameOfClass,
                              teacher_id: teacher_id,       
                          }
                        : {
                              name: nameOfClass,
                              teacher_id: teacher_id,
                          }
                ),
            });
            console.log("llega")
            if (!response.ok) {
                throw new Error(
                    isEditModeOn ? "Error al editar la materia" : "Error al crear la materia"
                );
            }

            console.log(isEditModeOn ? "Materia editada correctamente" : "Materia creada correctamente");
            
            
        } catch (error) {
            console.error(error);
        }
        refreshClasses()
        closeForm()
    };

    return (
        <div className="form">
            <div className="formrow">
                <p className="formText">Ingrese el nombre de la materia</p>

                <input
                    type="text"
                    name="materia"
                    id="nameofClass"
                    placeholder="Nombre de la materia"
                    value={nameOfClass}
                    onChange={(e) => setNameOfClass(e.target.value)}
                />
            </div>
                <div className={`formbtn ${nameOfClass.trim() === "" ? "disabled" : ""}`} onClick={handleAccept} >
                    <img src={acceptIcon} alt="" />
                    <p className="formBtnText">Aceptar</p>

                </div>

        </div>
    );
};

export default ClassForm;
