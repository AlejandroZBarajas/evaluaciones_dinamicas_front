import { useState, useEffect } from "react";
import Header from "../../../shared/header";
import ExamCard from "../../components/exam_card/exam_card";
import ExamForm from "../../components/exam_form/exam_form";
import addIcon from "../../../../assets/boton-agregar.png"
import "./exam_page.css"

interface ExamData{
    id: number
    name: string
    category_id:number
    total_questions: number
}




const ExamPage = () => {
    const URL = import.meta.env.VITE_API_URL
    const [exams, setExams] = useState<ExamData[]>([])
    const teacher_id= 1

    const [showForm, setShowForm] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedExamID, setSelectedExamID] = useState <number | undefined>(undefined)

    const GetExams = async () => {
        console.log("buscando examenes")
        try{
            const response = await fetch (`${URL}exams/teacher`, {
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({teacher_id})
            })

            if(!response.ok){
                throw new Error("no se cargaron los examenes del maestro")
            }

            const data = await response.json()
            console.log("examenes cargados: ",data)
            setExams(data)

        }catch (error){
            console.error(error)
        }
    }
    useEffect(() => {
        GetExams()
    },[])

    const createExam = () => {
        setEditMode(false)
        setSelectedExamID(undefined)
        setShowForm(true)
    }

    const editExam = (examID: number) => {
        setEditMode(true)
        setSelectedExamID(examID)
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
    }

    return(
        <div className="page">
            <Header/>
            <div className="newSec">
                <div className="title">
                    <h2 className="exams">Tus examenes</h2>
                </div>
                <div className="btnNew" onClick={createExam}>
                    <div className="icon">
                        <img src={addIcon} alt="" />
                    </div>
                    <div className="btnTitle">
                        <h3 className="nueva">Nuevo examen</h3>
                    </div>
                </div>
            </div>

            <div id="examenes">
                {exams.map((exam) => (
                <ExamCard
                    key={exam.id}
                    examID={exam.id}
                    examName={exam.name}
                    totalQ={exam.total_questions}
                    onEdit={editExam}
                    category_id={exam.category_id}
                    refreshExams={GetExams}
                />
                ))}
            </div>
            {showForm && (
                <div className="modal-background">
                <div className="modal-content">
                    <ExamForm
                    isEditModeOn={editMode}
                    examID={selectedExamID}
                    closeForm={closeForm}
                    refreshExams={() => {
                        closeForm();
                        GetExams();
                    }}
                    />
                    <button className="close-button" onClick={closeForm}>
                    Cerrar
                    </button>
                </div>
                </div>
            )}
        </div>
    )
}

export default ExamPage