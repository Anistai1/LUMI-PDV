import { useEffect, useMemo, useState } from "react";
import "../styles/Pedidos.css";

function Pedidos() {
  const pedidoInicial = {
    id: null,
    cliente: "",
    tipo: "Balcão",
    status: "Aguardando",
    valor: "",
    observacao: "",
    mesa: "",
    pagamento: "Dinheiro",
    data: "",
  };

  const [pedido, setPedido] = useState(pedidoInicial);
  const [pedidos, setPedidos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const dados = localStorage.getItem("lumi_pedidos");

    if (dados) {
      setPedidos(JSON.parse(dados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "lumi_pedidos",
      JSON.stringify(pedidos)
    );
  }, [pedidos]);

  function alterarCampo(e) {
    const { name, value } = e.target;

    setPedido((old) => ({
      ...old,
      [name]: value,
    }));
  }

  function limparFormulario() {
    setPedido(pedidoInicial);
    setEditando(false);
  }

  function salvarPedido() {
    if (
      pedido.cliente.trim() === "" ||
      pedido.valor === ""
    ) {
      alert("Preencha cliente e valor.");
      return;
    }

    const novoPedido = {
      ...pedido,
      data:
        pedido.data ||
        new Date().toLocaleString("pt-BR"),
    };

    if (editando) {
      setPedidos((lista) =>
        lista.map((item) =>
          item.id === pedido.id
            ? novoPedido
            : item
        )
      );

      limparFormulario();

      return;
    }

    setPedidos((lista) => [
      {
        ...novoPedido,
        id: Date.now(),
      },
      ...lista,
    ]);

    limparFormulario();
  }

  function editarPedido(item) {
    setPedido(item);
    setEditando(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function excluirPedido(id) {
    if (!window.confirm("Excluir pedido?")) {
      return;
    }

    setPedidos((lista) =>
      lista.filter((item) => item.id !== id)
    );
  }

  function alterarStatus(id, status) {
    setPedidos((lista) =>
      lista.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  }

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter((item) => {
      const nome = item.cliente
        .toLowerCase()
        .includes(
          pesquisa.toLowerCase()
        );

      const status =
        statusFiltro === "Todos"
          ? true
          : item.status === statusFiltro;

      return nome && status;
    });
  }, [
    pedidos,
    pesquisa,
    statusFiltro,
  ]);

  return (
    <div className="pedidos">

      <div className="titulo-pedidos">

        <div>

          <h1>📋 Pedidos</h1>

          <p>
            Controle todos os pedidos da loja.
          </p>

        </div>

        <div className="contador-pedidos">

          <strong>
            {pedidos.length}
          </strong>

          <span>Pedidos</span>

        </div>

      </div>

      <div className="card-formulario">

        <h2>
          {editando
            ? "Editar Pedido"
            : "Novo Pedido"}
        </h2>

        <div className="grid-form">

<input
                
            type="text"
            name="cliente"
            placeholder="Nome do cliente"
            value={pedido.cliente}
            onChange={alterarCampo}
          />

          <input
            type="number"
            name="valor"
            placeholder="Valor Total"
            value={pedido.valor}
            onChange={alterarCampo}
          />

          <select
            name="tipo"
            value={pedido.tipo}
            onChange={alterarCampo}
          >
            <option>Balcão</option>
            <option>Mesa</option>
            <option>Delivery</option>
            <option>Retirada</option>
          </select>

          <select
            name="status"
            value={pedido.status}
            onChange={alterarCampo}
          >
            <option>Aguardando</option>
            <option>Em Preparo</option>
            <option>Pronto</option>
            <option>Finalizado</option>
            <option>Cancelado</option>
          </select>

          <select
            name="pagamento"
            value={pedido.pagamento}
            onChange={alterarCampo}
          >
            <option>Dinheiro</option>
            <option>PIX</option>
            <option>Cartão Débito</option>
            <option>Cartão Crédito</option>
          </select>

          <input
            type="text"
            name="mesa"
            placeholder="Mesa (opcional)"
            value={pedido.mesa}
            onChange={alterarCampo}
          />

          <textarea
            name="observacao"
            placeholder="Observações do pedido..."
            value={pedido.observacao}
            onChange={alterarCampo}
          />

        </div>

        <div className="acoes-formulario">

          <button
            className="btn-salvar"
            onClick={salvarPedido}
          >
            {editando
              ? "Salvar Alterações"
              : "Cadastrar Pedido"}
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
          placeholder="Pesquisar cliente..."
          value={pesquisa}
          onChange={(e) =>
            setPesquisa(e.target.value)
          }
        />

        <select
          value={statusFiltro}
          onChange={(e) =>
            setStatusFiltro(e.target.value)
          }
        >
          <option>Todos</option>
          <option>Aguardando</option>
          <option>Em Preparo</option>
          <option>Pronto</option>
          <option>Finalizado</option>
          <option>Cancelado</option>
        </select>

      </div>

      <div className="lista-pedidos">

              {pedidosFiltrados.length === 0 && (
          <div className="sem-pedidos">
            <h3>Nenhum pedido encontrado.</h3>
            <p>Cadastre um novo pedido para começar.</p>
          </div>
        )}

        {pedidosFiltrados.map((item) => (
          <div
            className="card-pedido"
            key={item.id}
          >
            <div className="topo-pedido">

              <div>

                <h3>{item.cliente}</h3>

                <small>
                  #{item.id}
                </small>

              </div>

              <span className={`status ${item.status.toLowerCase().replace(/\s/g,"-")}`}>
                {item.status}
              </span>

            </div>

            <div className="informacoes">

              <p>
                <strong>Tipo:</strong> {item.tipo}
              </p>

              <p>
                <strong>Pagamento:</strong> {item.pagamento}
              </p>

              <p>
                <strong>Mesa:</strong>{" "}
                {item.mesa || "-"}
              </p>

              <p>
                <strong>Data:</strong>{" "}
                {item.data}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                <span className="valor">
                  R$ {Number(item.valor).toFixed(2)}
                </span>
              </p>

              {item.observacao && (
                <p className="obs">
                  {item.observacao}
                </p>
              )}

            </div>

            <div className="trocar-status">

              <select
                value={item.status}
                onChange={(e) =>
                  alterarStatus(
                    item.id,
                    e.target.value
                  )
                }
              >
                <option>Aguardando</option>
                <option>Em Preparo</option>
                <option>Pronto</option>
                <option>Finalizado</option>
                <option>Cancelado</option>
              </select>

            </div>

            <div className="acoes-pedido">

              <button
                className="editar"
                onClick={() =>
                  editarPedido(item)
                }
              >
                ✏️ Editar
              </button>

              <button
                className="excluir"
                onClick={() =>
                  excluirPedido(item.id)
                }
              >
                🗑 Excluir
              </button>

            </div>

          </div>
        ))}      </div>

      <div className="rodape-pedidos">

        <div className="estatistica">

          <strong>
            {pedidos.length}
          </strong>

          <span>Total de Pedidos</span>

        </div>

        <div className="estatistica">

          <strong>
            {
              pedidos.filter(
                (item) =>
                  item.status === "Aguardando"
              ).length
            }
          </strong>

          <span>Aguardando</span>

        </div>

        <div className="estatistica">

          <strong>
            {
              pedidos.filter(
                (item) =>
                  item.status === "Em Preparo"
              ).length
            }
          </strong>

          <span>Em Preparo</span>

        </div>

        <div className="estatistica">

          <strong>
            {
              pedidos.filter(
                (item) =>
                  item.status === "Pronto"
              ).length
            }
          </strong>

          <span>Prontos</span>

        </div>

        <div className="estatistica">

          <strong>
            {
              pedidos.filter(
                (item) =>
                  item.status === "Finalizado"
              ).length
            }
          </strong>

          <span>Finalizados</span>

        </div>

        <div className="estatistica">

          <strong>
            {
              pedidos.filter(
                (item) =>
                  item.status === "Cancelado"
              ).length
            }
          </strong>

          <span>Cancelados</span>

        </div>

      </div>

    </div>
  );
}

export default Pedidos;