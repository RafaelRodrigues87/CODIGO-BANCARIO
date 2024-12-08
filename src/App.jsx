import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';
import './style/style.css';
// Código dos bancos: https://www.meupositivo.com.br/doseujeito/dicas/lista-de-codigos-de-bancos-brasileiros/

function App() {
  const [bancos, setBancos] = useState([]);  // Lista de todos os bancos
  const [bancoSelecionado, setBancoSelecionado] = useState(null); // Banco específico selecionado
  const [carregando, setCarregando] = useState(true);
  const [codigoBanco, setCodigoBanco] = useState(""); // Valor do código inserido pelo usuário

  // Função para buscar todos os bancos na primeira renderização
  useEffect(() => {
    const pegarDados = async () => {
      try {
        const resposta = await axios.get('https://brasilapi.com.br/api/banks/v1');
        setBancos(resposta.data);  // Armazenar todos os bancos no estado
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
      } finally {
        setCarregando(false);
      }
    };

    pegarDados();
  }, []);



  // Função para buscar o banco específico com base no código
  const buscarBancoPorCodigo = async () => {
    setCarregando(true);  // Começar o carregamento enquanto busca os dados
    try {
      const resposta = await axios.get(`https://brasilapi.com.br/api/banks/v1/${codigoBanco}`);
      setBancoSelecionado(resposta.data);  // Atualiza o estado com os dados do banco
    } catch (erro) {
      console.error("Erro ao buscar banco específico:", erro);
      setBancoSelecionado(null);  // Caso não encontre o banco, limpa o estado
    } finally {
      setCarregando(false);  // Termina o carregamento
    }
  };

  if (carregando) return <h3>Carregando...</h3>;

  return (
    <>

    
    
      <div className="container">

      <h1 className="titulo">Consulta de Bancos</h1>
        <label htmlFor="codigo_banco" className="label-banco">Digite o código do Banco: </label> <br />
        <input
          type="text"
          id="codigo_banco"
          value={codigoBanco}
          onChange={(e) => setCodigoBanco(e.target.value)} // Atualiza o código conforme digita
        /> <br /> <br />
        <button id="btn-fetch" onClick={buscarBancoPorCodigo}>Buscar Dados</button>
      

      {bancoSelecionado ? (
        <div id="resultado_banco">
          <h3>Informações do Banco:</h3>
          <p><strong>Código:</strong> {bancoSelecionado.code}</p>
          <p><strong>Nome:</strong> {bancoSelecionado.name}</p>
          <p><strong>Nome Completo:</strong> {bancoSelecionado.fullName}</p>
          <p><strong>ISPB:</strong> {bancoSelecionado.ispb}</p>
          
        </div>
      ) : (
        <div id="result">
          <h3>Selecione um código de banco para ver os detalhes.</h3>
        </div>
      )}
      </div>
      
      {/* <div id="lista_completa">
        <h1>Lista de Bancos</h1>
        <ul>
          {bancos.map((banco) => (
            <li key={banco.code}>
              <strong>Nome:</strong> {banco.name} <br />
              <strong>Nome Completo:</strong> {banco.fullName} <br />
              <strong>ISPB:</strong> {banco.ispb} <br />
              <strong>Código:</strong> {banco.code} <br /> <br />
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
}

export default App;
