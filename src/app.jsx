import icon from "./assets/images/icon.png";
import './app.css'

export function App() {


  return (
   <div className="container">
      <div className="logo">
        <img src={icon} alt="Logo Exbook Change" />

      </div>

      <div className="textos">
        <h2>BEM-VINDO AO, <br />EXBOOK CHANGE</h2>
        <p>Desapegue de um livro, abrace um novo mundo.<br />
           Compartilhe e troque seus livros por todo Brasil!</p>
      </div>

      <div className="botoes">
        <button className="login">LOGIN</button>
        <button className="registrar">REGISTRAR</button>
      </div>

      <a href="#" className="ajuda">Precisa de Ajuda?</a>
    </div>
  )
}
