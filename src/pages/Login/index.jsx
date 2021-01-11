import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import StoreContext from "../../components/Store/Context";
import api from "../../services/api";
import "./index.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  async function onSubmit(e) {
    e.preventDefault();
    const res = await api.post("/autenticacao", {
      usuario: usuario,
      senha: senha,
    });
    setToken(res.data.token);
    history.push("/usuarios");
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title"></h1>
      <form autoComplete="nope" onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="usuario">Usuário</label>
          <input
            id="usuario"
            type="text"
            name="usuario"
            autoComplete="off"
            value={usuario}
            onChange={(e) => {
              setUsuario(e.target.value);
            }}
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="senha"
            type="password"
            name="senha"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
          />
        </div>
        <Button
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
        >
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default Login;
