import axios from "axios";

const basuUrl = "https://ns1.digitalocean.com.razgoanizada.com/api/v1";

export const login = (userName: String, password: String) => {
  return axios.post(`${basuUrl}/login`, { userName, password }).then((res) => {
    const token = res.data.jwt;
    const permission = res.data.permission;

    if (token) {
      localStorage.setItem(
        "user",
        JSON.stringify({ token, permission, userName })
      );
    }

    return res;
  });
};
export const logout = () => {
  //forget the user
  localStorage.removeItem("user");
  window.location.reload();
};

const authService = { login, logout };
export default authService;
