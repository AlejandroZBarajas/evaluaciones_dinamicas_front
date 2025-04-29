import { useState } from "react";

interface EditOrCreate {
    isEditModeOn: boolean;
    classID?: number; 
    closeForm: () => void;
    refreshClasses: () => void
}

const ClassForm: React.FC<EditOrCreate> = ({ isEditModeOn, classID, closeForm, refreshClasses }) => {
    const URL = import.meta.env.VITE_API_URL; 


    const [nameOfClass, setNameOfClass] = useState<string>("");

  

    const handleAccept = async () => {
        console.log(nameOfClass)
        console.log("CLICK")
        try {
            console.log(isEditModeOn)
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
            refreshClasses()
            closeForm()


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
                
            </div>
        </div>
    );
};

export default ClassForm;

/* 
import { useEffect, useState } from "react";

interface EditOrCreate {
    isEditModeOn: boolean;
    classID?: number;
    className?: string; // ← Se agrega para precargar nombre en edición
    closeForm: () => void;
    refreshClasses: () => void;
}

const ClassForm: React.FC<EditOrCreate> = ({
    isEditModeOn,
    classID,
    className,
    closeForm,
    refreshClasses,
}) => {
    const URL = import.meta.env.VITE_API_URL;

    const [nameOfClass, setNameOfClass] = useState<string>("");

    // useEffect para cargar o limpiar el input según el modo
    useEffect(() => {
        if (isEditModeOn && className) {
            setNameOfClass(className);
        } else {
            setNameOfClass("");
        }
    }, [isEditModeOn, className]);

    const handleAccept = async () => {
        console.log("Nombre de la materia:", nameOfClass);
        console.log("CLICK");

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
                    isEditModeOn
                        ? "Error al editar la materia"
                        : "Error al crear la materia"
                );
            }

            console.log(
                isEditModeOn
                    ? "Materia editada correctamente"
                    : "Materia creada correctamente"
            );
            refreshClasses();
            closeForm();
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
            </div>
        </div>
    );
};

export default ClassForm;
 */