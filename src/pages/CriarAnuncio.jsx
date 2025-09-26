import "./styles/CriarAnuncio.css";
import { useState, useTransition } from "react";
import Logo from "../assets/images/icon.png";
import { FaBars, FaUser, FaSignOutAlt, FaImage } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function CriarAnuncio() {
  const [isPending, startTransition] = useTransition();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    autor: "",
    descricao: "",
    status: "danificado",
  });
  const [anuncioCriado, setAnuncioCriado] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "" });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); 
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function handleCreateAnnounce() {
    startTransition(async () => {
      const accessToken = localStorage.getItem("accessToken");
      const csrfToken = localStorage.getItem("csrf-token");

      if (!accessToken || !csrfToken) {
        setAlert({ open: true, message: "❌ Ocorreu um erro com seu login, refaça o login para criar um anúncio. 1" });
        return;
      };

      const decodedToken = jwtDecode(accessToken);

      if (!decodedToken || !decodedToken.user_id) {
        setAlert({ open: true, message: "❌ Ocorreu um erro com seu login, refaça o login para criar um anúncio. 2" });
        return;
      }

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.descricao);
      formData.append("type", form.type);
      formData.append("user", decodedToken.user_id);
      formData.append("author_full_name", form.autor);
      formData.append("conservation_status", form.status);
      formData.append("file", image);
    
      axios.post(import.meta.env.VITE_BASE_URL + "announces/",
        formData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Authorization": `Bearer ${accessToken}`
          }
        })
      .then((response) => {
        if (response.status !== 201) {
          setForm({ title: "", autor: "", descricao: "", status: "bom" });
          setImage(null);
          setAlert({
            open: true,
            message: response.data.message + " ❌ Ocorreu um erro ao criar o anúncio.",
          });
          return;
        };
        
        setAnuncioCriado(response.data); 
        setAlert({ open: true, message: "✅ Anúncio criado com sucesso!" });
      })
      .catch((error) => {
        console.error("Error creating announce:", error);
        
        setForm({ title: "", autor: "", descricao: "", status: "bom" });
        setImage(null);

        if (error.status === 403) {
          setAlert({
            open: true,
            message: error.message + " ❌ Ocorreu um erro com seu login, refaça o login para criar um anúncio.",
          });
          return;
        };

        setAlert({
          open: true,
          message: error.message + " ❌ Ocorreu um erro ao criar o anúncio.",
        });
        return;
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.autor || !form.descricao || !image) {
      setAlert({
        open: true,
        message: "⚠️ Preencha todos os campos e adicione uma foto!",
      });
      return;
    }

    handleCreateAnnounce();
  };

  const closeAlert = () => {
    setAlert({ open: false, message: "" });
  };

  return (
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

      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

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

      <div className="create-ad-container">
        <h2 className="title">Criar Anúncio</h2>

        <form className="ad-form" onSubmit={handleSubmit}>
          <label>Título</label>
          <input
            type="text"
            name="title"
            placeholder="Digite o título"
            value={form.title}
            onChange={handleChange}
          />

          <label>Autor</label>
          <input
            type="text"
            name="autor"
            placeholder="Digite o autor"
            value={form.autor}
            onChange={handleChange}
          />

          <div className="image-upload">
            <label htmlFor="file-input">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="preview-img"
                />
              ) : (
                <div className="upload-placeholder">
                  <FaImage size={60} />
                </div>
              )}
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="status-container">
            <div className="status-field">
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="1">Danificado</option>
                <option value="2">Usado</option>
                <option value="3">Bom</option>
                <option value="4">Ótimo</option>
                <option value="5">Novo</option>
              </select>
            </div>

             <div className="status-field">
            
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="1">Troca</option>
                <option value="2">Doação</option>
              </select>
            </div>
          </div>

          <label>Descrição</label>
          <textarea
            name="descricao"
            placeholder="Escreva a descrição"
            value={form.descricao}
            onChange={handleChange}
          />

          <button type="submit" className="create-btn">
            CRIAR
          </button>
        </form>
      </div>

      {alert.open && (
        <div className="custom-alert">
          <div className="custom-alert-box">
            <p>{alert.message}</p>
            <button onClick={closeAlert}>OK</button>
          </div>
        </div>
      )}

      {anuncioCriado && (
        <div className="anuncio-card">
          <h3>📌 Último Anúncio Criado</h3>
          <img src={anuncioCriado.imageUrl} alt={anuncioCriado.title} />
          <h4>{anuncioCriado.title}</h4>
          <p><b>Autor:</b> {anuncioCriado.autor}</p>
          <p><b>Status:</b> {anuncioCriado.status}</p>
          <p><b>Descrição:</b> {anuncioCriado.descricao}</p>
        </div>
      )}
    </div>
  );
}

export default CriarAnuncio;
