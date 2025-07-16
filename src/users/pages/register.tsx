import { useState } from "react";
import { useNavigate } from "react-router-dom"

const RegisterForm = () => {
    const navigate = useNavigate()
    const toLogin = () => {
        navigate("/")
    }

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const URL = import.meta.env.VITE_API_URL;

  console.log(URL)

  const isFormValid = (): boolean => {
    return email !== "" && password1 !== "" && password1 === password2;
  };

  const handleRegister = async () => {
    if (!isFormValid()) {
      setError("Las contraseñas no coinciden o hay campos vacíos.");
      return;
    }

    try {
      const response = await fetch(`${URL}auth/register`, {
        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:email.trim(), password: password1 }),
      });

      //if (!response.ok) throw new Error("Error al registrar");
      if (!response.ok) {
        const errorText = await response.text(); // << aquí recuperas el mensaje real
        console.error("❌ Registro fallido:", errorText);
        throw new Error("Error al registrar");
    }


      const data = await response.json();
      console.log("Usuario registrado", data);

    } catch (err) {
      console.error(err);
      setError("Error en el registro.");
    }
  };

  return (
    <>
    <div className="form">
      <h2>Registro</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleRegister} disabled={!isFormValid()}>
        Registrarse
      </button>
    </div>
    <div className="tologinSec">
        <h3>¿Ya eres usuario?</h3>
        <h3>Inicia sesión</h3>
        <div className="loginbtn" onClick={toLogin}>
            <h2 className="btnName">Login</h2>
        </div>
    </div>
    </>
  );
};

export default RegisterForm;
