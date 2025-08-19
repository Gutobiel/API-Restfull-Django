import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
});

// Interceptor para lidar com 401 (token expirado)
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // pega o refresh token (de cookie HttpOnly ou armazenamento seguro)
        const refreshToken = localStorage.getItem("refresh"); 

        const res = await axios.post("http://localhost:8000/api/v1/authentication/token/refresh/", {
          refresh: refreshToken
        });

        const newAccessToken = res.data.access;
        localStorage.setItem("access", newAccessToken);

        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest); // repete a requisição original
      } catch (err) {
        console.log("Erro ao renovar token", err);
        // redireciona para login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
