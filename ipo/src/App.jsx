import { Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <div>
      {/* Barra de navegação superior em bootstap 4 */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">IPO</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/clientes">Clientes</Link>
            <Link className="nav-link" to="/veiculos">Veículos</Link>
            <Link className="nav-link" to="/inspecoes">inspecoes</Link>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/veiculos" element={<VeiculosList />} />
          <Route path="/inspecoes" element={<InspecoesList />} />
        </Routes>
      </div>
    </div>
  );
}
// Estas páginas serão criadas nas próximas etapas
function Inicio() {
  return (
    <div class="jumbotron">
      <h1 class="text-center">Centro de inspeções de automoveis</h1>
      <p class="text-center">IPO - ESDS1</p>

    </div>

  );
}
function ClientesList() {
  return (
    <div class="row g-3">
      <div className="col-md-8">
        <h2>Página de Clientes</h2>
      </div>
      <div className="col-md-4">
        <button className="btn btn-secondary"><i className="fa fa-plus"></i> Novo Cliente</button>
        <button className="btn btn-secondary"><i className="fa fa-refresh"></i> Atualizar Cliente</button>
      </div>

          
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nome</th>
              <th>Morada</th>
              <th>NIF</th>
              <th>Funções</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button className="btn btn-dark"><i className="fa fa-eye"></i></button>
                <button className="btn btn-dark"><i className="fa fa-pencil"></i></button>
                <button className="btn btn-dark"><i className="fa fa-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button className="btn btn-dark"><i className="fa fa-eye"></i></button>
                <button className="btn btn-dark"><i className="fa fa-pencil"></i></button>
                <button className="btn btn-dark"><i className="fa fa-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td> </td>
              <td></td>
              <td>
                <button className="btn btn-dark"><i className="fa fa-eye"></i></button>
                <button className="btn btn-dark"><i className="fa fa-pencil"></i></button>
                <button className="btn btn-dark"><i className="fa fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>




    </div>


  );
}
function VeiculosList() {
  return (<h2>Página de Veículos</h2>);
}
function InspecoesList() {
  return (<h2>Página de Inspeções</h2>);
}
export default App