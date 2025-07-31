import axios from "axios";

export async function loginUser(login, password) {
  try {
    const res = await axios.post("/auth/login", { login, password });
    return {
      success: true,
      token: res.data.token,
      role: res.data.role
    };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || "Ошибка входа"
    };
  }
}
