import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user_context"; // importar el hook
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const { email } = useUser(); // aquí obtenemos el email directo

  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="header">
        <div className="panel" onClick={goHome} style={{cursor: "pointer"}}>
          <h1>UP Chiapas</h1>
        </div>
        <div className="panel">
          <h2>Evaluaciones dinámicas</h2>
        </div>
        <div className="panel">
            <h3>{email}</h3>
        </div>
      </div>
    </>
  );
};

export default Header;
