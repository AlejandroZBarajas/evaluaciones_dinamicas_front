import { useState } from "react";

interface EditOrCreate {
    isEditModeOn: boolean;
    classID?: number; 
    closeForm: () => void;
    refreshClasses: () => void
}

const ClassForm: React.FC<EditOrCreate> = ({ isEditModeOn, classID, closeForm,  refreshClasses  }) => {
    const URL = import.meta.env.VITE_API_URL; 


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
                              teacher_id: 1,       
                          }
                        : {
                              name: nameOfClass,
                              teacher_id: 1,
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
                <div className={`btn ${nameOfClass.trim() === "" ? "disabled" : ""}`} onClick={handleAccept} style={{ pointerEvents: nameOfClass.trim() === "" ? "none" : "auto", opacity: nameOfClass.trim() === "" ? 0.5 : 1 }}>
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
