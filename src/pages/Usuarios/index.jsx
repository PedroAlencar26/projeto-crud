import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import "./index.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const history = useHistory();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    const response = await api.get("/usuarios");
    console.log(response);
    setUsuarios(response.data.content);
  }

  async function removerUsuario(id) {
    var token = localStorage.getItem("token");

    token = token.replace('"', "");
    token = token.replace('"', "");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await api.delete(`/usuarios/${id}`, config);
    carregarUsuarios();
  }

  function novoUsuario() {
    history.push("/usuario_cadastro");
  }

  function editarUsuario(id) {
    history.push(`/usuario_cadastro/${id}`);
  }

  function logout() {
    localStorage.removeItem("token");
    history.push("/");
  }

  return (
    <div className="container">
      <br />
      <div className="lista-header">
        <h3>Usuários</h3>
        <Button variant="dark" size="sm" onClick={novoUsuario}>
          Novo Usuário
        </Button>
      </div>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Telefone</th>
            <th>Nascimento</th>
            <th>Email</th>
            <th>Perfil</th>
            <th style={{ width: "10%" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.usuario}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.dataNascimento}</td>
              <td>{usuario.email}</td>
              <td>{usuario.perfilTipo}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <Button size="sm" onClick={() => editarUsuario(usuario.id)}>
                  Editar
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => removerUsuario(usuario.id)}
                >
                  Remover
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="lista-botton">
        <h3></h3>
        <Button variant="primary" size="sm" onClick={logout}>
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Usuarios;
