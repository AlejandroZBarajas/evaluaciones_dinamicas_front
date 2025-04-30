import lapizIcon from './../../../../assets/lapiz.png';
import eliminarIcon from './../../../../assets/eliminar.png';

//import "./question_card.css"

interface QuestionDataProps{
    q_id:number
    pregunta:string
    options:string[]
    answer:string    //[] < volver array para implementar varias respuestas correctas
    category_id:number
    exam_id:number
    onEdit: (
        question:{ 
           q_id: number, 
           pregunta: string,
           options: string[],
           answer: string,   //[],  < aqui tambien
           category_id: number, 
           exam_id: number
        }) => void
    refreshQuestions: () => void
}



const QuestionCard: React.FC<QuestionDataProps> = ({
    q_id,
    pregunta,
    options,
    answer,
    category_id,
    exam_id,
    onEdit,
    refreshQuestions
}) => {
    const URL = import.meta.env.VITE_API_URL
    
    const toEdit = () => {
        onEdit({q_id, pregunta, options, answer, category_id, exam_id})
    }

    const toDelete = async () => {
        try{
            const response = await fetch (`${URL}questions`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id:q_id})
            })

            if(!response.ok){
                throw new Error ("No se pudo eliminar la pregunta")
            }
            console.log("adios vaquero!")
            refreshQuestions()
        }catch (error){
            console.log(error)
        }
    }

    return(
        <div className="q_card">
            <div className="buttons">
                <div className="btn" onClick={toEdit}>
                    <div className="icon"><img src={lapizIcon} alt="" /></div>
                    <div className="btnTitle"><h2 className="btnName">Editar</h2></div>
                </div>
                <div className="btn" onClick={toDelete}> 
                    <div className="icon"><img src={eliminarIcon} alt="" />
                    </div>
                    <div className="btnTitle"><h2 className="btnName">Eliminar</h2></div>
                </div>
            </div>

            <div className="bodyC">
                <div className="question">
                    <h3>{pregunta}</h3>
                </div>



                <div className="options">
                 
                    {
                        <div className="optn" key={answer}>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${q_id}`}
                                    checked
                                    readOnly
                                />
                                {answer}
                            </label>
                        </div>
                    }
                    {options
                        .filter(option => !answer.includes(option))
                        .map((option, index) => (
                            <div className="optn" key={`option-${index}`}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${q_id}`}
                                        readOnly
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                </div>



            </div>
        </div>
    )
}

export default QuestionCard