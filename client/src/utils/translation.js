export const currentLanguage = { lang: "ru" }; // начальный язык

export function setLanguage(lang) {
  currentLanguage.lang = lang;
}

export function getCurrentLanguage() {
  return currentLanguage.lang;
}

// Тексты
const translations = {
  login_title: {
    ru: "Вход в систему",
    en: "Login",
    he: "התחברות",
  },
  login_placeholder: {
    ru: "Логин",
    en: "Username",
    he: "שם משתמש",
  },
  password_placeholder: {
    ru: "Пароль",
    en: "Password",
    he: "סיסמה",
  },
  login_button: {
    ru: "Войти",
    en: "Log in",
    he: "התחבר",
  },
  error_wrong: {
    ru: "Неверный логин или пароль",
    en: "Incorrect login or password",
    he: "שם משתמש או סיסמה שגויים",
  },
  select_language: {
    ru: "Язык:",
    en: "Language:",
    he: "שפה:",
  },
};

export function t(key) {
  const lang = currentLanguage.lang;
  return translations[key]?.[lang] || translations[key]?.["ru"] || key;
}