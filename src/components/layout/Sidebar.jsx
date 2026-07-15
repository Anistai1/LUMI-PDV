import "./../../styles/sidebar.css";

function Sidebar({ pagina, setPagina }) {
  const menus = [
    { id: "dashboard", nome: "🏠 Dashboard" },
    { id: "cardapio", nome: "🍔 Cardápio" },
    { id: "caixa", nome: "🧾 Caixa PDV" },
    { id: "pedidos", nome: "📦 Pedidos" },
    { id: "clientes", nome: "👥 Clientes" },
    { id: "relatorios", nome: "📊 Relatórios" },
    { id: "configuracoes", nome: "⚙ Configurações" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h1>Lumi PDV</h1>
        <span>Versão 1.0</span>
      </div>

      <nav className="menu">
        {menus.map((item) => (
          <button
            key={item.id}
            className={pagina === item.id ? "ativo" : ""}
            onClick={() => setPagina(item.id)}
          >
            {item.nome}
          </button>
        ))}
      </nav>

      <div className="rodape-sidebar">
        <small>© Lumi Software</small>
      </div>
    </aside>
  );
}

export default Sidebar;