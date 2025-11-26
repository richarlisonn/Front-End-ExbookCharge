import axios from "axios";

export class Authentication {
    static async reloginRefreshToken() {
        const refresh = localStorage.getItem("refreshToken");
        const csrf = localStorage.getItem("csrf-token");

        if (!refresh) {
            return {status: "error", message: "Refresh token não encontrado para relogin"};
        };

        if (!csrf) {
            return {status: "error", message: "CSRF token não encontrado para relogin"};
        };
        
        await axios.post(import.meta.env.VITE_API_URL + "authentication/refresh/",
        {refresh: refresh},
        {
            headers: {
                "X-CSRFToken": csrf,
            }
        })
        .then((response) => {
            localStorage.setItem("refreshToken", response.data.refresh);
            localStorage.setItem("accessToken", response.data.access);

            return {status: "success", message: "Relogin automático realizado com sucesso"};
        })
        .catch((error) => {
            if (error.status === 400) {
                console.error("Erro ao relogar:", error);
                return {status: "error", message: "Refresh token inválido, por favor faça login novamente"};
            };

            if (error.status === 401) {
                console.error("Erro ao relogar:", error);
                return {status: "error", message: "Não autorizado, por favor faça login novamente"};
            };

            console.error("Erro ao relogar:", error);
            return {status: "error", message: "Ocorreu um erro ao fazer relogin", details: error};
        });
    };
};