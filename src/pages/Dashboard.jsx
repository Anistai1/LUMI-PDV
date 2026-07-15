import "../styles/Dashboard.css";

function Dashboard() {
  const cards = [
    {
      titulo: "Vendas Hoje",
      valor: "R$ 2.845,90",
      emoji: "💰",
    },
    {
      titulo: "Pedidos",
      valor: "34",
      emoji: "🛒",
    },
    {
      titulo: "Clientes",
      valor: "128",
      emoji: "👥",
    },
    {
      titulo: "Produtos",
      valor: "56",
      emoji: "🍔",
    },
  ];

  const pedidos = [
    {
      mesa: "Mesa 01",
      cliente: "João",
      valor: "R$ 58,90",
      status: "Finalizado",
    },
    {
      mesa: "Mesa 05",
      cliente: "Maria",
      valor: "R$ 92,50",
      status: "Em preparo",
    },
    {
      mesa: "Delivery",
      cliente: "Carlos",
      valor: "R$ 41,90",
      status: "Saiu para entrega",
    },
    {
      mesa: "Balcão",
      cliente: "Ana",
      valor: "R$ 18,00",
      status: "Pago",
    },
  ];

  const produtos = [
    "🍔 X-Bacon",
    "🍟 Batata Frita",
    "🥤 Refrigerante",
    "🍕 Pizza Calabresa",
    "🌭 Cachorro-Quente",
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-topo">
        <div>
          <h1>LUMI PDV</h1>
          <p>Painel geral do sistema.</p>
        </div>
      </div>

      <div className="dashboard-cards">
        {cards.map((card) => (
          <div className="card" key={card.titulo}>
            <span>{card.emoji}</span>

            <h2>{card.valor}</h2>

            <p>{card.titulo}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-boxes">
        <div className="box">
          <h3>Últimos Pedidos</h3>

          {pedidos.map((pedido, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <strong>{pedido.cliente}</strong>

                <br />

                <small>{pedido.mesa}</small>
              </div>

              <div style={{ textAlign: "right" }}>
                <strong>{pedido.valor}</strong>

                <br />

                <small>{pedido.status}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="box">
          <h3>Produtos Mais Vendidos</h3>

          {produtos.map((produto, index) => (
            <div
              key={index}
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              {produto}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;