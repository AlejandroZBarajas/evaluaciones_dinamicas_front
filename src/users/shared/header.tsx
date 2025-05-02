import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user_context"; // importar el hook
import "./../../App.css"

const Header = () => {
  const navigate = useNavigate();
  const { email } = useUser(); // aquí obtenemos el email directo

  const goHome = () => {
    navigate("/");
  };

  return (
      <div className="header">
        <div className="headerpanel" onClick={goHome} style={{cursor: "pointer"}}>
          <h1 className="headertext">UP Chiapas</h1>
        </div>
        <div className="headerpanel">
          <h2 className="headertext">Evaluaciones dinámicas</h2>
        </div>
        <div className="headerpanel">
            <h3 className="headertext">{email}</h3>
        </div>
      </div>
  );
};

export default Header;
