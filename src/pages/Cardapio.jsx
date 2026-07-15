import { useEffect, useMemo, useState } from "react";
import "../styles/Cardapio.css";

function Cardapio() {
  const produtoInicial = {
    id: null,
    nome: "",
    categoria: "",
    preco: "",
    descricao: "",
    imagem: "",
    disponivel: true,
    destaque: false,
    maisVendido: false,
  };

  const [produto, setProduto] = useState(produtoInicial);
  const [produtos, setProdutos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const dados = localStorage.getItem("lumi_produtos");

    if (dados) {
      setProdutos(JSON.parse(dados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "lumi_produtos",
      JSON.stringify(produtos)
    );
  }, [produtos]);

  function alterarCampo(e) {
    const { name, value, type, checked } = e.target;

    setProduto((old) => ({
      ...old,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  function limparFormulario() {
    setProduto(produtoInicial);
    setEditando(false);
  }

  function salvarProduto() {
    if (
      produto.nome.trim() === "" ||
      produto.preco === ""
    ) {
      alert("Preencha nome e preço.");
      return;
    }

    if (editando) {
      setProdutos((lista) =>
        lista.map((item) =>
          item.id === produto.id
            ? produto
            : item
        )
      );

      limparFormulario();

      return;
    }

    setProdutos((lista) => [
      ...lista,
      {
        ...produto,
        id: Date.now(),
      },
    ]);

    limparFormulario();
  }

  function editarProduto(item) {
    setProduto(item);
    setEditando(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function excluirProduto(id) {
    if (!window.confirm("Excluir produto?")) {
      return;
    }

    setProdutos((lista) =>
      lista.filter((item) => item.id !== id)
    );
  }

  const categorias = useMemo(() => {
    const lista = produtos.map(
      (item) => item.categoria
    );

    return [
      "Todos",
      ...new Set(
        lista.filter((c) => c !== "")
      ),
    ];
  }, [produtos]);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((item) => {
      const nome = item.nome
        .toLowerCase()
        .includes(
          pesquisa.toLowerCase()
        );

      const categoria =
        categoriaFiltro === "Todos"
          ? true
          : item.categoria === categoriaFiltro;

      return nome && categoria;
    });
  }, [
    produtos,
    pesquisa,
    categoriaFiltro,
  ]);

  return (
    <div className="cardapio">

      <div className="titulo-cardapio">

        <div>

          <h1>🍔 Cardápio</h1>

          <p>
            Cadastre e gerencie
            todos os produtos.
          </p>

        </div>

        <div className="contador-produtos">

          <strong>
            {produtos.length}
          </strong>

          <span>Produtos</span>

        </div>

      </div>

      <div className="card-formulario">

        <h2>
          {editando
            ? "Editar Produto"
            : "Novo Produto"}
        </h2>

        <div className="grid-form">

  <input
            type="text"
            name="nome"
            placeholder="Nome do produto"
            value={produto.nome}
            onChange={alterarCampo}
          />

          <input
            type="text"
            name="categoria"
            placeholder="Categoria"
            value={produto.categoria}
            onChange={alterarCampo}
          />

          <input
            type="number"
            step="0.01"
            name="preco"
            placeholder="Preço"
            value={produto.preco}
            onChange={alterarCampo}
          />

          <input
            type="text"
            name="imagem"
            placeholder="URL da imagem (opcional)"
            value={produto.imagem}
            onChange={alterarCampo}
          />

          <textarea
            name="descricao"
            placeholder="Descrição do produto..."
            value={produto.descricao}
            onChange={alterarCampo}
          />

          <div className="opcoes-produto">

            <label>

              <input
                type="checkbox"
                name="disponivel"
                checked={produto.disponivel}
                onChange={alterarCampo}
              />

              Disponível

            </label>

            <label>

              <input
                type="checkbox"
                name="destaque"
                checked={produto.destaque}
                onChange={alterarCampo}
              />

              Destaque

            </label>

            <label>

              <input
                type="checkbox"
                name="maisVendido"
                checked={produto.maisVendido}
                onChange={alterarCampo}
              />

              Mais Vendido

            </label>

          </div>

        </div>

        <div className="acoes-formulario">

          <button
            className="btn-salvar"
            onClick={salvarProduto}
          >
            {editando
              ? "Salvar Alterações"
              : "Cadastrar Produto"}
          </button>

          <button
            className="btn-limpar"
            onClick={limparFormulario}
          >
            Limpar
          </button>

        </div>

      </div>

      <div className="barra-pesquisa">

        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={pesquisa}
          onChange={(e) =>
            setPesquisa(e.target.value)
          }
        />

        <select
          value={categoriaFiltro}
          onChange={(e) =>
            setCategoriaFiltro(e.target.value)
          }
        >
          {categorias.map((categoria) => (
            <option
              key={categoria}
              value={categoria}
            >
              {categoria}
            </option>
          ))}
        </select>

      </div>

      <div className="grid-produtos">

  {produtosFiltrados.length === 0 && (
          <div className="sem-produtos">
            <h3>Nenhum produto encontrado.</h3>
            <p>Cadastre um novo produto para começar.</p>
          </div>
        )}

        {produtosFiltrados.map((item) => (
          <div
            className="card-produto"
            key={item.id}
          >
            <div className="imagem-produto">

              {item.imagem ? (
                <img
                  src={item.imagem}
                  alt={item.nome}
                />
              ) : (
                <div className="imagem-placeholder">
                  🍔
                </div>
              )}

            </div>

            <div className="conteudo-produto">

              <div className="topo-produto">

                <h3>{item.nome}</h3>

                <span className="preco">
                  R$ {Number(item.preco).toFixed(2)}
                </span>

              </div>

              <span className="categoria">
                {item.categoria || "Sem categoria"}
              </span>

              <p className="descricao">
                {item.descricao || "Sem descrição."}
              </p>

              <div className="badges">

                {item.disponivel ? (
                  <span className="badge disponivel">
                    Disponível
                  </span>
                ) : (
                  <span className="badge indisponivel">
                    Indisponível
                  </span>
                )}

                {item.destaque && (
                  <span className="badge destaque">
                    ⭐ Destaque
                  </span>
                )}

                {item.maisVendido && (
                  <span className="badge vendido">
                    🔥 Mais Vendido
                  </span>
                )}

              </div>

              <div className="acoes-card">

                <button
                  className="editar"
                  onClick={() =>
                    editarProduto(item)
                  }
                >
                  ✏️ Editar
                </button>

                <button
                  className="excluir"
                  onClick={() =>
                    excluirProduto(item.id)
                  }
                >
                  🗑 Excluir
                </button>

              </div>

            </div>

          </div>
             ))}

      </div>

      <div className="rodape-cardapio">

        <div className="estatistica">
          <strong>{produtos.length}</strong>
          <span>Total de Produtos</span>
        </div>

        <div className="estatistica">
          <strong>
            {
              produtos.filter(
                (item) => item.disponivel
              ).length
            }
          </strong>
          <span>Disponíveis</span>
        </div>

        <div className="estatistica">
          <strong>
            {
              produtos.filter(
                (item) => item.destaque
              ).length
            }
          </strong>
          <span>Destaques</span>
        </div>

        <div className="estatistica">
          <strong>
            {
              produtos.filter(
                (item) => item.maisVendido
              ).length
            }
          </strong>
          <span>Mais Vendidos</span>
        </div>

      </div>

    </div>
  );
}

export default Cardapio;