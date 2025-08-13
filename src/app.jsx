import React from "react";
import "./app.css";
import { Link } from "react-router-dom";
import Icon from "./assets/images/icon.png";

function App() {
  return (
    <div className="container">
      <div className="logo_HomePage">
        <img src={Icon} alt="Logo Exbook Change" />
      </div>

      <div className="textos">
        <h2>
          BEM-VINDO AO,
          <br />
          EXBOOK CHANGE
        </h2>
        <p>
          Desapegue de um livro, abrace um novo mundo.
          <br />
          Compartilhe e troque seus livros por todo Brasil!
        </p>
      </div>

      <div className="botoes">
        <Link to="/login" className="login">
          LOGIN
        </Link>
        <Link to="/register" className="registrar">
          REGISTRAR
        </Link>
      </div>


      <a
        href="#"
        className="ajuda"
        onClick={(e) => {
          e.preventDefault();
          alert("Ajuda: Entre em contato pelo e-mail");
        }}
      >
        Precisa de Ajuda?
      </a>
    </div>
  );
}

export default App;
