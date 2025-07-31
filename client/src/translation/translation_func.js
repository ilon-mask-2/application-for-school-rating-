export const current_language = { lang: "ru" };

export function set_language(lang) {
  current_language.lang = lang;
  localStorage.setItem('language', lang);
}

export function get_current_language() {
  return localStorage.getItem('language') || current_language.lang;
}

import * as login_page_translation from "./login_page_translation.js";

const modules = {
  login_page_translation,
};

export function get_translation(key, module = "login_page_translation") {
  const translations = modules[module]?.translations || {};
  const lang = current_language.lang;
  const entry = translations[key];
  return entry?.[lang] || entry?.en || key;
}
