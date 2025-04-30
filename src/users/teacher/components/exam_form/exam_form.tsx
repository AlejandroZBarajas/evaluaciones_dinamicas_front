import { useState, useEffect } from "react";
import "./exam_form.css"

interface EditOrCreate{
    isEditModeOn: boolean
    examID?: number
    closeForm: () => void
    refreshExams: () => void
}
interface MateriaData{
    id: number
    name: string
}

const ExamForm: React.FC<EditOrCreate> = ({isEditModeOn, examID, closeForm, refreshExams}) => {

    useEffect(() => {
        getMaterias();
      }, []);

    const URL = import.meta.env.VITE_API_URL
    const [examName, setExamName] = useState <string> ("")
    const [totalQ, setTotalQ] = useState <number> (0)
    const [classID, setClassID] = useState <number> (0)
    
    const [materias, setMaterias] = useState<MateriaData[]> ([])

    const handleAccept = async () => {
        if (examName.trim() === "") {
            alert("El nombre del examen no puede estar vacío.");
            return;
        }
        console.log(examName)
        try{
            const response = await fetch (`${URL}exams`,{
                method: isEditModeOn && examID !== undefined ? "PUT" : "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    isEditModeOn
                    ?{
                        id: examID,
                        name: examName,
                        total_questions: totalQ,
                        teacher_id: 1 ,
                        category_id: classID
                    }
                    :{
                        name: examName,
                        total_questions: totalQ,
                        teacher_id: 1,
                        category_id: classID 
                    }
                )
            })
            console.log("ejecuta un metodo http")

            if(!response.ok){
                throw new Error(
                    isEditModeOn ? "Error al editar la materia" : "Error al crear la materia"
                );
            }
            console.log(isEditModeOn ? "Materia editada correctamente" : "Materia creada correctamente");
        }catch(error){
            console.error(error)
        }
        refreshExams()
        closeForm()
    }

    const getMaterias = async () => {
        try{
            console.log(`${URL}categories/teacher`)
            const response = await fetch (`${URL}categories/teacher`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({teacher_id:1})
            })

            if (!response.ok) throw new Error("No se cargaron materias del maestro");

        const data = await response.json();
        setMaterias(data);
        }catch (error){
            console.error(error)   
        }
    }

    return(
        <div className="form">
            <div className="row">
                <select
                value={classID}
                onChange={(e) => setClassID(Number(e.target.value))}
                >
                    <option disabled value ={0}>Seleccione una materia</option>
                    {materias.map((materia) => (
                        <option key={materia.id} value={materia.id}>{materia.name}</option>
                    ))}
                </select>               
            </div>
            <div className="row">
                <div className="fieldInfo">
                    <p>Nombre del examen</p>
                </div>
                <div className="inputField">
                    <input 
                    type="text"
                    value={examName} 
                    onChange={(e)=> setExamName(e.target.value)}/>
                </div>
            </div>
            <div className="row">
                <div className="fieldInfo">
                    <p>Preguntas totales</p>
                </div>
                <div className="inputField">
                    <input 
                    type="number" 
                    value={totalQ}
                    onChange={(e) => setTotalQ(Number(e.target.value))}
                    />
                </div>
            </div>            
            <div className="buttons">
                <div className={`btn ${examName.trim() === "" ? "disabled" : ""}`} onClick={handleAccept} style={{ pointerEvents: examName.trim() === "" ? "none" : "auto", opacity: examName.trim() === "" ? 0.5 : 1 }}>
                    <div className="icon"></div>
                    <div className="btnName">
                        <h4>Aceptar</h4>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default ExamForm