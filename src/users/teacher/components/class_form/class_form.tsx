import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface EditOrCreate {
    isEditModeOn: boolean;
    classID?: number; 
}

const ClassForm: React.FC<EditOrCreate> = ({ isEditModeOn, classID }) => {
    const URL = import.meta.env.VITE_API_URL; 
    const navigate = useNavigate();

    const [nameOfClass, setNameOfClass] = useState<string>("");

    const toClasses = () => {
        navigate("/materias");
    };

    const handleAccept = async () => {
        try {
            const response = await fetch(`${URL}/categories`, {
                method: isEditModeOn ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    isEditModeOn
                        ? {
                              id: classID,         
                              name: nameOfClass,
                              teacher_id: 1,       
                          }
                        : {
                              name: nameOfClass,
                              teacher_id: 1,
                          }
                ),
            });

            if (!response.ok) {
                throw new Error(
                    isEditModeOn ? "Error al editar la materia" : "Error al crear la materia"
                );
            }

            console.log(isEditModeOn ? "Materia editada correctamente" : "Materia creada correctamente");
            toClasses(); 

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form">
            <div className="title">
                <h3>Ingrese el nombre de la materia</h3>
            </div>
            <div className="inputField">
                <input
                    type="text"
                    name="materia"
                    id="nameofClass"
                    placeholder="Nombre de la materia"
                    value={nameOfClass}
                    onChange={(e) => setNameOfClass(e.target.value)}
                />
            </div>
            <div className="buttons">
                <div className="btn" onClick={handleAccept}>
                    <div className="icon"></div>
                    <div className="btnName">
                        <h4>Aceptar</h4>
                    </div>
                </div>
                <div className="btn" onClick={toClasses}>
                    <div className="btnName">
                        <h4>Cancelar</h4>
                    </div>
                    <div className="icon"></div>
                </div>
            </div>
        </div>
    );
};

export default ClassForm;
