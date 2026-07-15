import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../../styles/Layout.css";

function Layout({ pagina, setPagina, children }) {
  return (
    <div className="layout">
      <Sidebar
        pagina={pagina}
        setPagina={setPagina}
      />

      <div className="conteudo-principal">
        <Topbar />

        <main className="pagina">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;