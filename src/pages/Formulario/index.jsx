import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import api from "../../services/api";

import "./index.css";

const Formulario = () => {
  const history = useHistory();
  const { id } = useParams();
  const [model, setModel] = useState({
    nome: "",
    usuario: "",
    email: "",
    senha: "",
    telefone: "",
    sexo: "",
    dataNascimento: "",
    idade: "",
    perfilId: "",
  });

  useEffect(() => {
    if (id !== undefined) {
      buscarUsuario(id);
    }
  }, [id]);

  function updatedModel(e) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    var token = localStorage.getItem("token");

    token = token.replace('"', "");
    token = token.replace('"', "");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (id !== undefined) {
      const response = await api.put(`/usuarios/${id}`, model, config);
    } else {
      const response = await api.post("/usuarios", model, config);
    }
    back();
  }

  async function buscarUsuario(id) {
    const res = await api.get(`usuarios/${id}`);
    setModel(res.data);
  }

  function back() {
    history.goBack();
  }

  return (
    <div className="container">
      <br />
      <div className="lista-header">
        <h3>Novo Usuário</h3>
        <Button variant="dark" size="sm" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              className="form-control"
              type="text"
              placeholder="Nome"
              name="nome"
              value={model.nome}
              onChange={updatedModel}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="form-control"
              type="text"
              placeholder="Usuário"
              name="usuario"
              value={model.usuario}
              onChange={updatedModel}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              value={model.email}
              onChange={updatedModel}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="form-control"
              type="password"
              placeholder="Senha"
              name="senha"
              value={model.senha}
              onChange={updatedModel}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="form-control"
              type="number"
              placeholder="Telefone"
              name="telefone"
              value={model.telefone}
              onChange={updatedModel}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="form-control"
              type="text"
              placeholder="Sexo"
              name="sexo"
              value={model.sexo}
              onChange={updatedModel}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="form-control"
              type="text"
              placeholder="Data de nacimento"
              name="dataNascimento"
              value={model.dataNascimento}
              onChange={updatedModel}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="form-control"
              type="number"
              placeholder="Idade"
              name="idade"
              value={model.idade}
              onChange={updatedModel}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="form-control"
              type="number"
              placeholder="perfilTipo"
              name="perfilId"
              value={model.perfilId}
              onChange={updatedModel}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="dark">
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Formulario;
