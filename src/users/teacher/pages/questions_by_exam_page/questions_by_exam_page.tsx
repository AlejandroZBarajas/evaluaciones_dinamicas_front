import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../../shared/header";
import QuestionCard from "../../components/question_card/question_card";
import QuestionForm from "../../components/question_form/question_form";

import addIcon from "../../../../assets/boton-agregar.png"
//import "./questions_by_exam_page.css"
import "./../../../../App.css"

interface QuestionData {
    id: number;
    category_id: number;
    exam_id: number;
    pregunta: string;
    options: string[];
    answer: string;
}
  
interface RawQuestion {
    id: number;
    category_id: number;
    exam_id: number;
    question_data: {
      question: string;
      options: string[];
      answer: string;
    };
  }
  

const QuestionsByExamPage = () => {
    const location = useLocation();
    const { examID, examName} = location.state || {};
    const category_id =Number(localStorage.getItem("class_id"))
console.log("la pagina recibe category_id: ",category_id)
    const URL = import.meta.env.VITE_API_URL

    const [questions, setQuestions] = useState <QuestionData[]>([])

    const [showForm, setShowForm] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [selectedQID, setSelectedQID] = useState <number | undefined>(undefined)

    const GetQuestions = async () => {
        console.log(`${URL}questions/exam`)
        console.log("buscando preguntas del examen"+examID)

        try{
            const response = await fetch(`${URL}questions/exam`,{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({exam_id:examID})
            })
            if(!response.ok){
                throw new Error ("No se pudieron obtener preguntas ")
            }
            const data: RawQuestion[] = await response.json();

            const transformed: QuestionData[] = data.map((q) => ({
            id: q.id,
            pregunta: q.question_data.question,
            options: q.question_data.options,
            answer: q.question_data.answer,
            category_id: q.category_id,
            exam_id: q.exam_id,
            }));

            console.log("preguntas:", transformed);
            setQuestions(transformed);


        }catch (error){
            console.log(error)
        }
    }
    useEffect(()=> {
        if(examID)GetQuestions()
    },[examID])

    const createQ = () => {
        setEditMode(false)
        setSelectedQID(undefined)
        setShowForm(true)
    }

    const editQ = (QID: number) => {
        setEditMode(true)
        setSelectedQID(QID)
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
    }

    return(
        <div className="page">
            <Header/>
                <h2 className="pageTitle">{examName}</h2>
                <div className="formCreateCaller" onClick={createQ}>
                    <img className="addNew" src={addIcon} alt="" />
                    <p className="newWhat">Nueva pregunta</p>
                </div>


            <div className="cardMapper">
            {questions.map((question) => (
                <QuestionCard
                    key={question.id}
                    q_id={question.id}
                    pregunta={question.pregunta}
                    options={question.options}
                    answer={question.answer}
                    category_id={question.category_id}
                    exam_id={question.exam_id}
                    onEdit={(q) => editQ(q.q_id)} // <- esto depende de tu lógica
                    refreshQuestions={GetQuestions}
                />
            ))}
            </div>
            {showForm && (
                <div className="modal-background">
                <div className="modal-content">
                    <QuestionForm
                    isEditModeOn={editMode}
                    questionID={selectedQID}
                    closeForm={closeForm}
                    refreshQuestions={() => {GetQuestions()}}
                    examID={examID}
                    category_id={category_id}
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
export default QuestionsByExamPage