import "./styles/CriarAnuncio.css";
import { useEffect, useState, useTransition } from "react";
import { FaBars, FaImage, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/images/icon.png";
import axios, { all } from "axios";
import { jwtDecode } from "jwt-decode";
import { Authentication } from "../utils/Authentication";

export default function ExchangeDonationPage() {
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const csrfToken = localStorage.getItem("csrf-token");

  const [isPending, startTransition] = useTransition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [form, setForm] = useState({});
  const [announce, setAnnounce] = useState({});
  const [announceView, setAnnounceView] = useState({});
  const announceType = announceView.type ? announceView.type === 1 ? "Trocar": "Doar" : "";
  
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    startTransition(async () => {
      if (!form.phone || form.phone.trim() === "") {
        alert("❌ Phone obrigatório.");
        return;
      }

      if (!accessToken || !csrfToken) {
        alert(
          "❌ Ocorreu um erro com seu login, refaça o login para criar um anúncio."
        );
        navigate("/login");
        return;
      };

      const decodedToken = jwtDecode(accessToken);

      if (!decodedToken || !decodedToken.user_id) {
        alert(
          "❌ Ocorreu um erro com seu login, refaça o login para criar um anúncio."
        );
        navigate("/login");
        return;
      };

      let phoneNumber = form.phone.trim();
      phoneNumber = phoneNumber.replace("+", '');
      
      await axios.get(
        import.meta.env.VITE_BASE_URL + "users/?phone=" + phoneNumber, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-CSRFToken": csrfToken,
          }}
      ).then(async (response) => {
          console.log(response);
          await setForm({"user_id": response.data.user_id});
          return;
        })
        .catch(async (error) => {
          console.error("Error fetching user data:", error);
          if (error.response?.status === 403) {
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
          if (error.response?.status === 404) {
            alert("❌ Usuário não encontrado, verifique o telefone e tente novamente.");
            return;
          };

          alert("❌ " + error.response.data.message, JSON.stringify(error));
          return;
        });

        if (!form.user_id) {
          return;
        };
        
        await axios.post(
          import.meta.env.VITE_BASE_URL + "transactions",
          {
            id_user: decodedToken.user_id,
            user_receiver: form.user_id,
            id_announce: id,
        },{
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-CSRFToken": csrfToken,
          }}
        ).then((response) => {
          console.log(response);
          alert("✅ Solicitação enviada com sucesso!");
          navigate(-1);
          return;
        })
        .catch(async (error) => {
          console.error("Error fetching user data:", error);
          if (error.response?.status === 403) {
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
          };

          if (error.response?.status === 404) {
            alert("❌ Anúncio não encontrado.");
            return;
          };

          alert(error.response?.status === 500 ? "❌ Erro no servidor, tente novamente mais tarde." : "❌ Ocorreu um erro ao enviar a solicitação, tente novamente.");
          return;
        });
      });
    };
    
    useEffect(() => {
      startTransition(async () => {
      await axios
        .get(import.meta.env.VITE_BASE_URL + "announces/?announce_id=" + id, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-CSRFToken": csrfToken,
          },
        })
        .then((response) => {
          console.log(response);
          setAnnounce(response.data);
          setAnnounceView(response.data.announce);
        })
        .catch(async (error) => {
          console.error("Error fetching user data:", error);
          if (error.response?.status === 403) {
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
        });
    });
  }, [id]);

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

      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

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
            <a href="/criarAnuncio">criar Anúncio</a>
          </li>
          <li>
            <a href="/">
              <FaSignOutAlt /> Sair
            </a>
          </li>
        </ul>
      </div>
      <div className="create-ad-container">
        <h2 className="title">{announceType}</h2>
        <form className="ad-form" onSubmit={handleSubmit}>
          <label>Digite o telefone do usuário que receberá o livro</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={(e) => {
              let value = e.target.value;

              if (!value.startsWith("+55")) {
                value = "+55" + value.replace(/\D/g, ""); 
              }
              
              
              if (value.length > 14) {
                value = value.slice(0, 14);
              }
              
              handleChange({
                target: { name: "phone", value }
              });
            }}
            maxLength={14} 
          />
          <button type="submit" disabled={isPending} className="create-btn">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
