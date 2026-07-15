import { useMemo, useState } from "react";

function Caixa() {
  const produtos = [
    { id: 1, nome: "X-Burger", preco: 18.9 },
    { id: 2, nome: "X-Bacon", preco: 23.9 },
    { id: 3, nome: "X-Tudo", preco: 29.9 },
    { id: 4, nome: "Batata Frita", preco: 14.9 },
    { id: 5, nome: "Batata com Cheddar", preco: 19.9 },
    { id: 6, nome: "Refrigerante Lata", preco: 6.5 },
    { id: 7, nome: "Suco Natural", preco: 8.5 },
    { id: 8, nome: "Milk Shake", preco: 16.9 },
  ];

  const [busca, setBusca] = useState("");
  const [carrinho, setCarrinho] = useState([]);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function adicionarProduto(produto) {
    const existente = carrinho.find((item) => item.id === produto.id);

    if (existente) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
      return;
    }

    setCarrinho([
      ...carrinho,
      {
        ...produto,
        quantidade: 1,
      },
    ]);
  }

  function aumentar(id) {
    setCarrinho(
      carrinho.map((item) =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  }

  function diminuir(id) {
    setCarrinho(
      carrinho
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function remover(id) {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  }

  const total = useMemo(() => {
    return carrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
  }, [carrinho]);

  function finalizarVenda() {
    if (carrinho.length === 0) {
      alert("Adicione produtos ao carrinho.");
      return;
    }

    alert("Venda finalizada com sucesso! (Modo demonstração)");
    setCarrinho([]);
  }

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>💰 Caixa PDV</h1>

      <p>Sistema de vendas.</p>

      <div
        style={{
          marginTop: 25,
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 20,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 2px 10px rgba(0,0,0,.08)",
          }}
        >
          <input
            type="text"
            placeholder="Pesquisar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ddd",
              marginBottom: 20,
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
              gap: 15,
            }}
          >            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 12,
                  padding: 15,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 45,
                    textAlign: "center",
                  }}
                >
                  🍔
                </div>

                <strong>{produto.nome}</strong>

                <span
                  style={{
                    color: "#ff6b00",
                    fontWeight: "bold",
                  }}
                >
                  R$ {produto.preco.toFixed(2)}
                </span>

                <button
                  onClick={() => adicionarProduto(produto)}
                  style={{
                    padding: 10,
                    background: "#ff6b00",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Adicionar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 2px 10px rgba(0,0,0,.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Carrinho</h2>

          <div
            style={{
              marginTop: 15,
              flex: 1,
            }}
          >
            {carrinho.length === 0 && (
              <p>Seu carrinho está vazio.</p>
            )}

            {carrinho.map((item) => (
              <div
                key={item.id}
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "12px 0",
                }}
              >
                <strong>{item.nome}</strong>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <button
                      onClick={() => diminuir(item.id)}
                      style={{
                        width: 30,
                        height: 30,
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>

                    <strong>{item.quantidade}</strong>

                    <button
                      onClick={() => aumentar(item.id)}
                      style={{
                        width: 30,
                        height: 30,
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>

                  <strong>
                    R$
                    {(item.preco * item.quantidade).toFixed(2)}
                  </strong>
                </div>

                <button
                  onClick={() => remover(item.id)}
                  style={{
                    marginTop: 10,
                    background: "transparent",
                    color: "red",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>          <hr
            style={{
              margin: "20px 0",
            }}
          />

          <h2
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Total</span>

            <span style={{ color: "#ff6b00" }}>
              R$ {total.toFixed(2)}
            </span>
          </h2>

          <button
            onClick={finalizarVenda}
            style={{
              marginTop: 20,
              padding: 15,
              background: "#ff6b00",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Finalizar Venda
          </button>
        </div>
      </div>
    </div>
  );
}

export default Caixa;