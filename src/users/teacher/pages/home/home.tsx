import { useNavigate } from "react-router-dom"
import Header from '../../../shared/header';
import "./../../../../App.css"

const Home = () => {
    const navigate = useNavigate()

    const toClasses = () => {
        navigate("/materias")
    }

    const toExams= () => {
        navigate("/examenes")
    }

    const toResults= () => {
        navigate("/resultados")
    }

    return(
        <div className="page">
            <Header></Header> 
                    <div className="homebtn" onClick={toClasses}>
                        <h2>Materias</h2>
                    </div>

                    <div className="homebtn" onClick={toExams}>
                        <h2>Examenes</h2>
                    </div>

                    <div className="homebtn" onClick={toResults}>
                        <h2>Resultados</h2>
                    </div>

        </div>
    )
}

export default Home;