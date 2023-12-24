import React, { useState, useEffect } from "react";

const Formulario = (props) => {
  const [materiaA, setMateriaA] = useState(0);
  const [materiaB, setMateriaB] = useState(0);
  const [materiaC, setMateriaC] = useState(0);
  const [nome, setNome] = useState("");
  const [githubData, setGithubData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("o componente iniciou");

    return () => {
      console.log("o componente finalizou");
    };
  }, []);

  useEffect(() => {
    console.log("o estado nome mudou");
  }, [nome]);

  useEffect(() => {
    console.log("materia A mudou para: " + materiaA);
  }, [materiaA, materiaB, materiaC]);

  const alteraNome = (evento) => {
    setNome(evento.target.value);
  };

  const buscaPerfilGithub = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${nome}`);
      
      if (!response.ok) {
        throw new Error("Erro ao buscar perfil do GitHub");
      }

      const data = await response.json();
      setGithubData(data);
      setError(null);
    } catch (error) {
      setGithubData(null);
      setError(error.message);
    }
  };

  const renderizaResultado = () => {
    if (error) {
      return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!githubData) {
      return null;
    }

    const soma = materiaA + materiaB + materiaC;
    const media = soma / 3;

    return (
      <div>
        <p>Olá {githubData.name || githubData.login}, você foi aprovado</p>
        <img src={githubData.avatar_url} alt="Avatar do GitHub" />
      </div>
    );
  };

  return (
    <form>
      <ul>
        {[1, 2, 3, 4, 5].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <input type="text" placeholder="Seu nome" onChange={alteraNome} />
      <button type="button" onClick={buscaPerfilGithub}>
        Buscar perfil do GitHub
      </button>
      <input
        type="number"
        placeholder="Nota matéria A"
        onChange={({ target }) => setMateriaA(parseInt(target.value))}
      />
      <input
        type="number"
        placeholder="Nota matéria B"
        onChange={(evento) => setMateriaB(parseInt(evento.target.value))}
      />
      <input
        type="number"
        placeholder="Nota matéria C"
        onChange={(evento) => setMateriaC(parseInt(evento.target.value))}
      />
      {renderizaResultado()}
    </form>
  );
};

export default Formulario;
