import "./../../styles/topbar.css";

function Topbar() {
  const hoje = new Date().toLocaleDateString("pt-BR");

  return (
    <header className="topbar">
      <div className="topbar-esquerda">
        <h2>Lumi PDV</h2>
        <span>{hoje}</span>
      </div>

      <div className="topbar-direita">
        <button className="notificacao">
          🔔
        </button>

        <div className="usuario">
          <div className="avatar">
            M
          </div>

          <div>
            <strong>Maninho</strong>
            <small>Administrador</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;