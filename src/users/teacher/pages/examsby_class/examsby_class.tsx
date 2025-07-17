import { useEffect, useState } from "react";
import Header from "../../../shared/header";
import ExamCard from "../../components/exam_card/exam_card";
import ExamForm from "../../components/exam_form/exam_form";
import addIcon from "../../../../assets/boton-agregar.png"

interface ExamData{
    id: number
    name: string
    category_id:number
    total_questions: number
}

const ExamsByClass = () => {
    const URL = import.meta.env.VITE_API_URL
    const [exams, setExams] = useState<ExamData[]>([])
    const teacher_id= Number(localStorage.getItem("user_id"))
    const category_id=Number(localStorage.getItem("class_id"))
    const [categoryName, setCategoryName] = useState<string>("")

    const [showForm, setShowForm] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedExamID, setSelectedExamID] = useState <number | undefined>(undefined)

    const GetExamsByClass = async () => {
        console.log("buscando examenes")
        console.log("teacherid: ",teacher_id)
        console.log("class_id: ",category_id)
        try{
            const response = await fetch (`${URL}exams/teachercategory`,{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({teacher_id,category_id})
            })

            if(!response.ok){
                throw new Error ("no se pudieron cargar")
            }

            const data = await response.json()
            setCategoryName(data.name)
            setExams(data)
        }
        catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{
        GetExamsByClass()
    },[])

    const createExam = () => {
    setEditMode(false);
    setSelectedExamID(undefined);
    setShowForm(true);
    }

    const editExam = (examID: number) => {
    setEditMode(true);
    setSelectedExamID(examID);
    setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return(
        <>
            <Header/>
            <div className="newSec">

                <div className="title">
                    <h2 className="examenes">{categoryName} - Examenes</h2>
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
                    refreshExams={GetExamsByClass}/>
                ))}
            </div>
            {showForm&& (
                <div className="modal-background">
                <div className="modal-content">
                    <ExamForm
                    isEditModeOn={editMode}
                    examID={selectedExamID}
                    closeForm={closeForm}
                    refreshExams={() => {
                        closeForm();
                        GetExamsByClass();
                    }}
                    />
                    <button className="close-button" onClick={closeForm}>
                    Cerrar
                    </button>
                </div>
                </div>
            )}
        </>
    )
}

export default ExamsByClass