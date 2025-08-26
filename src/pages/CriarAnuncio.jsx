import "./styles/CriarAnuncio.css";
import React from "react";
import Logo from "../assets/images/icon.png";
import { FaBars, FaUser, FaSignOutAlt, FaImage } from "react-icons/fa";

function CriarAnuncio() {
  return (
    <div className="div_main">
      <header className="header">
        <FaBars className="icon" />
        <a href="/dashboard">
          <img src={Logo} alt="Logo Exbook Change" className="logo_DashBoard" />
        </a>
        <div className="right-icons">
          <a href="/perfil">
            <FaUser className="icon" />
          </a>
        </div>
      </header>

      <hr className="divider" />

      <div className="side-menu">
        <div className="menu-header">
          <FaUser className="menu-icon" />
          <p>Name Profile</p>
        </div>
        <hr />
        <ul className="menu-list">
          <li><a href="/dashboard">Início</a></li>
          <li><a href="/CriarAnuncio">Criar Anúncio</a></li>
          <li><a href="/"><FaSignOutAlt /> Sair</a></li>
        </ul>
      </div>

      <div className="create-ad-container">
        <h2 className="title">Criar Anúncio</h2>

        <form className="ad-form">
          <label>TITLE</label>
          <input type="text" placeholder="Digite o título" />

          <label>Autor</label>
          <input type="text" placeholder="Digite o autor" />

          <div className="image-upload">
            <div className="upload-placeholder">
              <FaImage size={60} />
            </div>
          </div>

          <div className="status-container">
            <div className="switch-field">
              <label>Disponível</label>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <span>Troca</span>
            </div>
            <div className="status-field">
              <label>Status</label>
              <select>
                <option value="bom">Bom</option>
                <option value="otimo">Ótimo</option>
                <option value="novo">Novo</option>
                <option value="lacrado">Lacrado</option>
              </select>
            </div>
          </div>

          <label>Descrição</label>
          <textarea placeholder="Escreva a descrição"></textarea>

          <button type="submit" className="create-btn">
            CRIAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default CriarAnuncio;
