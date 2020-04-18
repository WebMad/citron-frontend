import axios from "axios";
import router from "../router";
import store from "../store";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production" // если сборка для прода
    ? "https://citron.webmadness.ru/api/" // url обычный
    : "https://citron.webmadness.ru/api/"; // иначе ваш локальный/или тестовый (можно менять)


if (store.getters['auth/isAuth']) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['auth/getToken'];
}

function errorResponseHandler(error) {
  // ставим свои обработчики ошибок от сервера
  if (error.response) {
    if (error.response.status === 401) {
      if (store.getters["auth/isAuth"]) {
        axios.post('/auth/refresh').then((result) => {
          store.commit("auth/setToken", result.data.access_token)
          router.push({path: "/"});
        }).catch(() => {
            store.commit("auth/logout");
            router.push({path: "/login"});
        })
      } else {
        router.push({path: "/login"});
      }
    }
    if (error.response.status === 500) {
      alert("500 Ошибка на сервере");
    }
    if (error.response.status === 502) {
      alert("Сервер недоступен");
    }
  }
  return Promise.reject(error);
}

axios.interceptors.response.use(response => response, errorResponseHandler);

export default axios;
