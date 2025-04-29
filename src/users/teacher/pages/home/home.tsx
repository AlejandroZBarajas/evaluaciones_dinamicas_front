import { useNavigate } from "react-router-dom"
import Header from '../../../shared/header';
import "./home.css"

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
        <div>
            <Header></Header> 
            <div className="page">
                <div className="cont">
                    <div className="btn" onClick={toClasses}>
                        <h2>Materias</h2>
                    </div>
                </div>
                <div className="cont">
                    <div className="btn" onClick={toExams}>
                        <h2>Examenes</h2>
                    </div>
                </div>

                <div className="cont">
                    <div className="btn" onClick={toResults}>
                        <h2>Resultados</h2>
                    </div>
                </div>
            </div>
            

        </div>
    )
}

export default Home;