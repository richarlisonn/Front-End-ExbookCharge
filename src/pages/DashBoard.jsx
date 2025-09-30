import React, { useEffect, useState, useTransition } from "react";
import Logo from "../assets/images/icon.png"; 
import { FaBars, FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
import "./styles/DashBoard.css"; 
import axios from "axios";
import { Authentication } from "../utils/Authentication";

function DashBoard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [announces, setAnnounces] = useState();
  const [error, setError] = useState();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // setAnnounces([
  //   { title: "Dom Casmurro", autor: "Machado de Assis", link: "/dom-casmurro" },
  //   { title: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", link: "/senhor-dos-aneis" },
  //   { title: "1984", autor: "George Orwell", link: "/1984" },
  //   { title: "Harry Potter", autor: "J.K. Rowling", link: "/harry-potter" },
  // ]);
  
  const handleGetAnnonces = () => {
    startTransition(() => {
      const accessToken = localStorage.getItem('accessToken');  
      const csrfToken =  localStorage.getItem("csrf-token");

      axios.get(import.meta.env.VITE_BASE_URL + 'announces/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-CSRFToken': csrfToken
        }
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setAnnounces(response.data);
        };
      })
      .catch((error) => {
        console.error('Error fetching announces:', error);

        if (error.response.status === 403) {
          const reloginResponse = Authentication.reloginRefreshToken();

          if (reloginResponse.status === "error") {
            setError(reloginResponse);
          };

          return;
        };

        setError('Erro ao buscar anúncios: ' + JSON.stringify(error));
      });
    });
  };

  useEffect(() => {
    handleGetAnnonces();
  }, []);

  return (
    <div className="div_main">
     
      <header className="header">
        <FaBars className="icon" onClick={toggleMenu} /> 
        <a href="/dashboard">
          <img src={Logo} alt="Logo Exbook Change" className="logo_DashBoard" />
        </a>
        <div className="right-icons">
          <a href="/perfil"><FaUser className="icon" /></a>
        </div>
      </header>

      <hr className="divider" />

      
      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}

     
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
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

      
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Qual livro você procura?"
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      
      <div className="ads-container">
        {announces ? announces.map((livro) => (
          <a key={livro.id} href={"/" + livro.title} className="ad-card">
            <div className="ad-image"><img src={livro.images ? import.meta.env.VITE_BASE_URL_IMG + livro.images.find((img) => img.is_cover)?.image : ''} /></div>
            <div className="ad-info">
              <h3>{livro.title}</h3>
            </div>
          </a>
        )) : <p>{error ? error : 'Carregando anúncios...'}</p>}
      </div>
    </div>
  );
}

export default DashBoard;
