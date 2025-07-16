import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


interface TokenPayload {
  sub: number; // user ID
  role: number;
  exp: number;
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const toRegister = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Credenciales incorrectas");

      const data = await response.json();
      console.log("Login exitoso", data);

      // Guardar tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      // Decodificar token y guardar user info
      const decoded: TokenPayload = jwtDecode(data.access_token);
      localStorage.setItem("user_id", decoded.sub.toString());
      localStorage.setItem("role_id", decoded.role.toString());

      // Redirigir a página principal
      navigate("/home");

    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión");
    }
  };

  return (
    <>
      <div className="form">
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleLogin}>Iniciar sesión</button>
      </div>
      <div className="toregisterSec">
        <h3>¿Aún no estás registrado?</h3>
        <div className="registerbtn" onClick={toRegister}>
          <h3 className="btnName">Registro</h3>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
