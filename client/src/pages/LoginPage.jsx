import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth";
import {
  get_translation as t,
  set_language,
  current_language,
} from "../translation/translation_func";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(login, password);
    if (result.success) {
      localStorage.setItem("token", result.token);
      navigate(`/${result.role}`);
    } else {
      setError(t("error_msg", "login_page_translation"));
    }
  };

  const changeLang = (lang) => {
    set_language(lang);
    window.location.reload();
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-gray-50 justify-center items-center font-sans"
      style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}
    >
      <div className="bg-white/95 max-w-[480px] w-full shadow-2xl rounded-3xl px-6 py-8 border border-blue-100 flex flex-col gap-6">
        <h2 className="text-[#101419] text-[28px] font-bold text-center pb-1">Welcome back</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className="flex flex-col">
            <input
              placeholder={t("login_placeholder", "login_page_translation")}
              className="form-input min-w-0 flex-1 rounded-xl text-[#101419] focus:outline-0 focus:ring-0 border border-[#d3dbe4] bg-gray-50 focus:border-[#1976D2] h-14 placeholder:text-[#58728d] px-[15px] text-base font-normal leading-normal transition"
              value={login}
              onChange={e => setLogin(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className="flex flex-col">
            <input
              placeholder={t("password_placeholder", "login_page_translation")}
              className="form-input min-w-0 flex-1 rounded-xl text-[#101419] focus:outline-0 focus:ring-0 border border-[#d3dbe4] bg-gray-50 focus:border-[#1976D2] h-14 placeholder:text-[#58728d] px-[15px] text-base font-normal leading-normal transition"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="text-red-500 text-xs pl-1 mt-1">{error}</p>}
          <button
            className="w-full h-10 bg-[#d2e2f3] hover:bg-[#b8d4ef] text-[#101419] text-sm font-bold rounded-xl mt-1 transition"
            type="submit"
          >
            {t("submit_button", "login_page_translation")}
          </button>
        </form>
        <div className="flex items-center gap-2 justify-end">
          <span className="text-sm text-[#101419] pr-2">🌐 {t("change_lang", "login_page_translation")}</span>
          <LangButton lang="ru" text="Рус" />
          <LangButton lang="en" text="Eng" />
          <LangButton lang="he" text="עיברית" />
        </div>
      </div>
      <div className="h-5" />
    </div>
  );

  function LangButton({ lang, text }) {
    const active = current_language.lang === lang;
    return (
      <button
        type="button"
        onClick={() => changeLang(lang)}
        className={
          "min-w-[48px] px-3 h-8 flex items-center justify-center rounded-xl text-xs font-bold transition " +
          (active
            ? "bg-[#1976D2] text-white shadow border border-[#1976D2]"
            : "bg-gray-100 text-[#101419] border border-[#d3dbe4] hover:bg-[#d2e2f3]")
        }
      >
        {text}
      </button>
    );
  }
}

export default LoginPage;
