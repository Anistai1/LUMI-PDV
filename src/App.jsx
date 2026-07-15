import { useState } from "react";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Cardapio from "./pages/Cardapio";
import Caixa from "./pages/Caixa";
import Pedidos from "./pages/Pedidos";
import Clientes from "./pages/Clientes";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";

function App() {
  const [pagina, setPagina] = useState("dashboard");

  function renderPagina() {
    switch (pagina) {
      case "dashboard":
        return <Dashboard />;

      case "cardapio":
        return <Cardapio />;

      case "caixa":
        return <Caixa />;

      case "pedidos":
        return <Pedidos />;

      case "clientes":
        return <Clientes />;

      case "relatorios":
        return <Relatorios />;

      case "configuracoes":
        return <Configuracoes />;

      default:
        return <Dashboard />;
    }
  }

  return (
    <Layout pagina={pagina} setPagina={setPagina}>
      {renderPagina()}
    </Layout>
  );
}

export default App;