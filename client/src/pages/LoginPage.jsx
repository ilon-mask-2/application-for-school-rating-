import React, { useState } from 'react';
import { loginUser } from '../utils/auth';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(login, password);
    if (result.success) {
      alert(`Вы вошли как ${result.role}`);
      // TODO: Навигация на главную страницу
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Войти</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
