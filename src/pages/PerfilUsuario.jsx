import React, { useEffect, useState, useTransition } from "react";
import Logo from "../assets/images/icon.png";
import {
  FaBars,
  FaUserCircle,
  FaEdit,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import "./styles/PerfilUsuario.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Authentication } from "../utils/Authentication";
import { useNavigate } from "react-router-dom";
import { CgArrowsExchangeAlt } from "react-icons/cg";

function PerfilUsuario() {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState({});
  const [data, setData] = useState({});
  const [profile, setProfile] = useState({});


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fecharMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    startTransition(async () => {
      const accessToken = localStorage.getItem("accessToken");
      const csrfToken = localStorage.getItem("csrf-token");

      const decodeAccessToken = jwtDecode(accessToken);
      const id = decodeAccessToken.user_id;
      await setUserId(id);

      await axios
        .get(
          `${import.meta.env.VITE_BASE_URL}profile/?user_id=${
            id
          }`,
          {
            headers: {
              "X-CSRFToken": csrfToken,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setData(response.data);
          setProfile(response.data.profile);
        })
        .catch(async (error) => {
          console.error("Error fetching user data:", error);
          if (error.response.status === 403) {
            await Authentication.reloginRefreshToken()
              .then((response) => {
                if (response.status === "error") {
                  alert("Login expirado, por favor faça login novamente.");
                  navigate("/login");
                  return;
                }
                window.location.reload();
                return;
              })
              .catch(() => {
                alert("Login expirado, por favor faça login novamente.");
                navigate("/login");
                return;
              });

            return;
          }
          alert("❌ " + error.response.data.message, JSON.stringify(error));
          return;
        });
    });
  }, []);

  return (
    <div className="div_main">
      <header className="header">
        <FaBars className="icon" onClick={toggleMenu} />
        <a href="/dashboard">
          <img src={Logo} alt="Logo Exbook Change" className="logo_DashBoard" />
        </a>
        <div className="right-icons">
          <a href="/profile">
            <FaUser className="icon" />
          </a>
        </div>
      </header>

      <hr className="divider" />

      {isMenuOpen && <div className="overlay" onClick={fecharMenu}></div>}

      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <FaUser className="menu-icon" />
          <p>{profile.nickname}</p>
          <hr />
        </div>
        <ul className="menu-list">
          <li>
            <a href="/dashboard">Início</a>
          </li>
          <li>
            <a href="/criarAnuncio">Criar Anúncio</a>
          </li>
          <li>
            <a href="/dashboard">
              <FaSignOutAlt /> Sair
            </a>
          </li>
        </ul>
      </div>

      {isPending || !data ? (
        <p>Carregando...</p>
      ) : (
        <>
          <section className="perfil">
            {profile.photo ? <img
              src={
                import.meta.env.VITE_BASE_URL_IMG + profile.photo } className="photo"/> : <FaUserCircle className="profile-icon" />}
            <div className="profile-info">
              {!data.profile ? <h3>Erro ao carregar perfil</h3> : <></>}
              <h3>{profile.nickname}</h3>
              <p>{profile.description}</p>
            </div>
            <a href={`/updateprofile/${userId}`}>
              <FaEdit className="edit-icon" />
            </a>
          </section>

          <hr className="divider" />

          <section className="stats">
            <h4>MINHAS ESTATÍSTICAS</h4>
            <p className="number">
              {data.announces ? data.announces.length : 0}
            </p>
            <p>Anúncios</p>
          </section>

          <hr className="divider" />

          <div className="ads-container">
            {data.announces ? (
              data.announces.map((livro, index) => (
                <a
                  key={livro.id}
                  href={"/dashboard/" + livro.id}
                  className="ad-card"
                >
                  <div className="ad-image">
                    <img
                      src={
                        livro.images
                          ? import.meta.env.VITE_BASE_URL_IMG +
                            livro.images.find((img) => img.is_cover)?.image
                          : ""
                      }
                    />
                  </div>
                  <div className="ad-info">
                    <h3>{livro.title}</h3>
                    <a href={"/dashboard/exchangedonation/" + livro.id}><CgArrowsExchangeAlt /></a>
                    <a href={"/dashboard/editbook/" + livro.id}><FaEdit /></a>
                  </div>
                </a>
              ))
            ) : (
              <p>Sem anúncios disponíveis</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PerfilUsuario;
