import "./styles/CriarAnuncio.css";
import { useEffect, useState, useTransition } from "react";
import { FaBars, FaImage, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/images/icon.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Authentication } from "../utils/Authentication";

export default function UpdateAnnounce() {
  const { id } = useParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    autor: "",
    descricao: "",
    status: 1,
    type: 1,
  });
  const [alert, setAlert] = useState({ open: false, message: "" });

  const navigate = useNavigate();
  
  const [isPending, startTransition] = useTransition();

  const accessToken = localStorage.getItem("accessToken");
  const csrfToken = localStorage.getItem("csrf-token");

  useEffect(() => {
    startTransition(async () => {
      await axios
        .get(import.meta.env.VITE_BASE_URL + "announces/?announce_id=" + id, {
          headers: {
            "X-CSRFToken": csrfToken,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);

          setForm({
            title: response.data.announce.title,
            autor: response.data.announce.author_full_name,
            descricao: response.data.announce.description,
            status: response.data.announce.conservation_status,
            type: response.data.announce.type,
          });

          setImagePreview(response.data.announce.images[0]?.image);
        })
        .catch(async (error) => {
          if (error.response.status === 403) {
            await Authentication.reloginRefreshToken()
              .then((response) => {
                if (response.status === "error") {
                  setAlert("Login expirado, por favor faça login novamente.");
                  navigate("/login");
                  return;
                }
                window.location.reload();
                return;
              })
              .catch(() => {
                setAlert("Login expirado, por favor faça login novamente.");
                navigate("/login");
                return;
              });
            return;
          }
        });
    });
  }, []);

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
      if (!accessToken || !csrfToken) {
        setAlert({
          open: true,
          message:
            "❌ Ocorreu um erro com seu login, refaça o login para editar um anúncio. 1",
        });
        return;
      }

      const decodedToken = jwtDecode(accessToken);

      if (!decodedToken || !decodedToken.user_id) {
        setAlert({
          open: true,
          message:
            "❌ Ocorreu um erro com seu login, refaça o login para editar um anúncio. 2",
        });
        return;
      }

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.descricao);
      formData.append("type", form.type);
      formData.append("user", decodedToken.user_id);
      formData.append("author_full_name", form.autor);
      formData.append("conservation_status", form.status);
      formData.append("images", image);

      console.log(form);
      console.log(formData);

      axios
        .put(
          import.meta.env.VITE_BASE_URL + "announces/" + id + "/update",
          formData,
          {
            headers: {
              "X-CSRFToken": csrfToken,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status !== 200) {
            setForm({
              title: "",
              autor: "",
              descricao: "",
              status: 1,
              type: 1,
            });
            setImage(null);
            setAlert({
              open: true,
              message:
                response.data.message +
                " ❌ Ocorreu um erro ao editar o anúncio.",
            });

            return;
        }
        
        setUpdatedAnnounce(response.data);
        setAlert({ open: true, message: "✅ Anúncio editado com sucesso!" });
        navigate("/profile")
        })
        .catch(async (error) => {
          console.error("Error updating announce:", error);

          setForm({ title: "", autor: "", descricao: "", status: 1, type: 1 });
          setImagePreview(null);
          setImage(null);

          if (error.response.status === 403) {
            await Authentication.reloginRefreshToken()
              .then((response) => {
                if (response.status === "error") {
                  setAlert("Login expirado, por favor faça login novamente.");
                  navigate("/login");
                  return;
                }
                window.location.reload();
                return;
              })
              .catch(() => {
                setAlert("Login expirado, por favor faça login novamente.");
                navigate("/login");
                return;
              });

            return;
          }

          setAlert({
            open: true,
            message: error.message + " ❌ Ocorreu um erro ao editar o anúncio.",
          });
          return;
        });
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

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
        <h2 className="title">Editar Anúncio</h2>

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
            {!isPending && imagePreview ? (
              <div className="image-current-preview">
                <label>Imagem Atual</label>
                <img
                  src={import.meta.env.VITE_BASE_URL_IMG + imagePreview}
                  className="preview-img"
                />
              </div>
            ) : null}
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
              <select name="status" value={form.status} onChange={handleChange}>
                <option value={1}>Danificado</option>
                <option value={2}>Usado</option>
                <option value={3}>Bom</option>
                <option value={4}>Ótimo</option>
                <option value={5}>Novo</option>
              </select>
            </div>

            <div className="status-field">
              <select name="type" value={form.type} onChange={handleChange}>
                <option value={1}>Troca</option>
                <option value={2}>Doação</option>
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
            editar
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
    </div>
  );
}
