 import { useState} from "react";
 import acceptIcon from "./../../../../assets/accept.png"
 import "./../../../../App.css"

interface EditOrCreate{
    isEditModeOn: boolean
    questionID?: number
    closeForm: () => void
    refreshQuestions: () => void
    examID: number;
    category_id: number;
}
/* interface QuestionData{
    id?:number
    pregunta:string
    options:string[]
    answer:string
    category_id:number
    exam_id:number
}  */
const QuestionForm : React.FC<EditOrCreate> = ({
    isEditModeOn,
    questionID,
    closeForm,
    refreshQuestions,
    examID,
    category_id
}) => {
    


    const URL = import.meta.env.VITE_API_URL 

    const [pregunta, setPregunta] = useState <string>("")
    const [answer, setAnswer] = useState<string>("")
    const [wrong1, setWrong1] = useState<string>("")
    const [wrong2, setWrong2] = useState<string>("")
    const [wrong3, setWrong3] = useState<string>("")

    const isFormValid = (): boolean => {
        console.log("Validando:", {
            pregunta,
            answer,
            wrong1,
            preguntaOk: pregunta.trim() !== "",
            answerOk: answer.trim() !== "",
            wrong1Ok: wrong1.trim() !== "",
          });
          
        return (
            pregunta.trim() !== "" &&
            answer.trim() !== "" &&
            wrong1.trim() !== "" &&
            examID > 0 &&
            category_id > 0
        )
    }

    const handleAccept = async () => {
        console.log("entra en handle")


       // const options = [answer,  wrong1, wrong2, wrong3]

       try {
        const payload = {
          ...(isEditModeOn && { id: Number(questionID) }),
          question_data: {
            question: pregunta,
            options: [answer, wrong1, wrong2, wrong3],
            answer: answer
          },
          category_id: Number(category_id),
          exam_id: Number(examID)
        };
      
        console.log("Payload:", JSON.stringify(payload)); // 👈 Aquí imprimimos lo que se enviará
        console.log("categoryID:", category_id, typeof category_id);

      
        const response = await fetch(`${URL}questions`, {
          method: isEditModeOn ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      
        const responseText = await response.text();
        console.log("Status:", response.status);
        console.log("Response Text:", responseText);
      
        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }
      
        refreshQuestions();
        closeForm();
      } catch (error) {
        console.error("Error al guardar la pregunta:", error);
      }
    }

    return(
        <div className="form">
            <div className="formrow">
                <p className="formText">* Ingrese la pregunta</p>
                <input type="text" value={pregunta} onChange={(e)=> setPregunta(e.target.value)} />
            </div>
            <div className="formrow">
                <p className="formText" >* Ingrese la respuesta</p>
                <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>                  
            </div>
            <div className="formrow">
                <p className="formText">* Opción erronea 1</p>
                <input type="text" value={wrong1} onChange={(e)=>setWrong1(e.target.value)}/>                   
            </div>
            <div className="formrow">
                <p className="formText">Opción erronea 2</p>
                <input type="text" value={wrong2} onChange={(e)=>setWrong2(e.target.value)}/>       
            </div>
            <div className="formrow">
                <p className="formText">Opción erronea 3</p>
                <input type="text" value={wrong3} onChange={(e)=>setWrong3(e.target.value)}/>         
            </div>
            <div className={`formbtn ${!isFormValid() ? "disabled" : ""}`}
            onClick={handleAccept}>
                <img src={acceptIcon} alt="" />
                <p className="formBtnText">Aceptar</p>
            </div>
        </div>
    )
}
export default QuestionForm