import "./styles/AnnouncePage.css";
import "./styles/dashboard.css";
import axios from "axios";
import Logo from "../assets/images/icon.png";
import { useEffect, useState, useTransition } from "react";
import { FaBars, FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { Authentication } from "../utils/Authentication";

export default function AnnouncePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    
    const closeMenu = () => {
        setIsMenuOpen(false);
      };

    const [announce, setAnnounce] = useState({});
    const [announceView, setAnnounceView] = useState({});
    const announceType = announceView.type ? announceView.type === 1 ? "Troca": "Doação" : "";
    
    const [isPending, startTransition] = useTransition();
    const accessToken = localStorage.getItem("accessToken");
    const csrfToken = localStorage.getItem("csrf-token");

    function submitButtonWhatsApp() {
        alert("Você vai ser redirecionado para o WhatsApp do anunciante!");

        window.open(announce.what_user, "_blank");
    };

    async function submitSendRequest() {
        await startTransition(async () => {

        });
    };

    useEffect(() => {
        startTransition(async () => {
            await axios.get(import.meta.env.VITE_BASE_URL + "announces/?announce_id=" + id, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-CSRFToken": csrfToken,
            }}).then((response) => {
                console.log(response);
                setAnnounce(response.data);
                setAnnounceView(response.data.announce);
            })
            .catch(async (error) => {
                console.error("Error fetching announce:", error);
                if (error.response.status === 403) {
                    await Authentication.reloginRefreshToken()
                    .then(() => {
                        window.location.reload();
                        return;
                    }).catch(() => {
                        alert("Login expirado, por favor faça login novamente.");
                        navigate("/login");
                        return;
                    });
                    
                    return;
                };
                
                console.error("Error fetching announce:", error)});

        })},
    [id])
    return (
            isPending || !announce ? <p>Carregando anúncio...</p> : 
            <div className="announce-page">
                <div className="div_main">
                <header className="header">
                        <FaBars className="icon" onClick={toggleMenu} />
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
                
                {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
                
                      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
                        <div className="menu-header">
                          <FaUser className="menu-icon" />
                          <p>Name Profile</p>
                        </div>
                        <hr />
                        <ul className="menu-list">
                          <li>
                            <a href="/dashboard">Início</a>
                          </li>
                          <li>
                            <a href="/CriarAnuncio">Criar Anúncio</a>
                          </li>
                          <li>
                            <a href="/">
                              <FaSignOutAlt /> Sair
                            </a>
                          </li>
                        </ul>
                      </div>
                
                <div className="announce-content">
                    <div className="content1">
                        <h1>{announceView.title}</h1>
                        <hr />
                    </div>
                    
                    <div className="content2">
                        <div className="align">
                            <div className="images">
                                <button onClick={() => {}}>{"<"}</button>
                                {announceView.images ? announceView.images.map((images, index) => (
                                    <img key={index} src={import.meta.env.VITE_BASE_URL_IMG + images.image} />
                                )) : <p>Sem imagens disponíveis</p>}
                                <button onClick={() => {}}>{">"}</button>
                            </div>
                        </div>
                        <p>{announceView.description}</p>
                        
                        {announceView.type ? 
                        <button className="bt"
                        onClick={() => submitButtonWhatsApp()}>{announceType}
                        </button> : null}
                    </div>
                </div>
            </div>
            </div>
    )
}