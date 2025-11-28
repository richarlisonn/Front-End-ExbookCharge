import "./styles/UpdateProfile.css";
import "./styles/DashBoard.css";

import { useEffect, useState, useTransition } from "react";
import { FaBars, FaImage, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/images/icon.png";
import axios from "axios";
import { Authentication } from "../utils/Authentication";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState({});
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({
    nickname: "",
    description: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [isPending, startTransition] = useTransition();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", id);
    formData.append("nickname", form.nickname);
    formData.append("description", form.description);
    formData.append("photo", photo);

    startTransition(async () => {
      const accessToken = localStorage.getItem("accessToken");
      const csrfToken = localStorage.getItem("csrf-token");
    
      await axios.put(import.meta.env.VITE_BASE_URL + "profile/", formData, {
          headers: {
            "X-CSRFToken": csrfToken,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          setSuccessMessage(response.data.message);
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
          };

          alert("❌ " + error.response.data.message, JSON.stringify(error));
          return;
        });
    });
  };

  useEffect(() => {
    startTransition(async () => {
      const accessToken = localStorage.getItem("accessToken");
      const csrfToken = localStorage.getItem("csrf-token");

      await axios
        .get(`${import.meta.env.VITE_BASE_URL}profile/?user_id=${id}`, {
          headers: {
            "X-CSRFToken": csrfToken,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          setPhotoPreview(response.data.profile.photo);
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
          };
          
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

      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <FaUser className="menu-icon" />
          <p>{profile.nickname}</p>
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
      <div className="align-update-profile">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Edite seu perfil {profile.nickname}</h2>

          <label>Nickname</label>
          <input
            type="text"
            name="nickname"
            value={form.nickname}
            placeholder={profile.nickname}
            onChange={handleChange}
          />
          {errors.nickname && <span className="erro">{errors.nickname}</span>}

          <label>Descrição</label>
          <input
            type="text"
            name="description"
            value={form.description}
            placeholder={profile.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className="erro">{errors.description}</span>
          )}

          <div className="image-upload">
            {!isPending && photoPreview ? (
              <div className="image-current-preview">
                <label>Photo Atual</label>
                <img
                  src={import.meta.env.VITE_BASE_URL_IMG + photoPreview}
                  className="preview-img"
                />
              </div>
            ) : null}
            <label htmlFor="file-input">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
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

          <button type="submit" className="btn-criar" disabled={isPending}>
            {isPending ? "Editando Perfil..." : "EDITAR PERFIL"}
          </button>
        </form>

        {successMessage && <p className="success">{successMessage.message}</p>}
        {errors.server && (
          <p className="errors-server">
            {errors.server}
            {console.log({ message: errors.server, details: errors.details })}
          </p>
        )}
      </div>
    </div>
  );
}
