import { useNavigate } from "react-router-dom";
import "./exam_card.css"
import lapizIcon from './../../../../assets/lapiz.png';
import eliminarIcon from './../../../../assets/eliminar.png';
import React from "react";

interface ExamCardProps{
    examID: number
    examName: string
    totalQ: number
    category_id:number
    onEdit: (examID: number) => void
    refreshExams: () => void
}

const ExamCard: React.FC<ExamCardProps> = ({
    examID,
    examName,
    totalQ,
    category_id,
    onEdit,
    refreshExams
}) => {
    
    const navigate = useNavigate();
    const URL = import.meta.env.VITE_API_URL; 

    const toEdit = () =>{
        onEdit(examID)
    }

    const goToQuestions = () => {
        console.log("examID: ")
        console.log(examID)
        navigate("/questions", { state: { examID, examName, category_id } });
    };

    const toDelete = async () => {
        try{
            const response = await fetch(`${URL}exams`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id:examID})
            })

            if (!response.ok) throw new Error("Error al eliminar examen");

            console.log("bye bye exam")
            refreshExams()
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className="card">
            <div className="option" onClick={toEdit}>
                <img src={lapizIcon} alt="editar" />
            </div>
            <div className="examInfo" onClick={goToQuestions}>
                <div className="examName" >
                    <h2 className="exname">{examName}</h2> 
                </div>
                <div className="totalQ">
                    <h2 className="totq">{totalQ}</h2>
                </div>
            </div>
            <div className="option" onClick={toDelete}>
                <img src={eliminarIcon} alt="eliminar" />
            </div>
        </div>
    )

}

export default ExamCard