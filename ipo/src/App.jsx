import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route, Link } from 'react-router-dom';

const API_BASE = 'https://effective-capybara-v665669654wghp5gj-3000.app.github.dev';

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
    <div className="jumbotron">
      <h1 className="text-center">Centro de inspeções de automoveis</h1>
      <p className="text-center">IPO - ESDS1</p>

    </div>

  );
}
function ClientesList() {
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagemErro, setMensagemErro] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {

    fetchData();
  }, []);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async (id) => {
    try {
      const response = await fetch(API_BASE + '/clientes/' + id, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        setMensagemErro(data.message);
      }
    } catch {
      setMensagemErro('Erro ao eliminar cliente');
    } finally {
      closeDeleteModal();
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_BASE + '/clientes');
      const data = await response.json();
      if (data.success) {
        setClientes(data.data);
      } else {
        setMensagemErro(data.message);
      }
    } catch {
      setMensagemErro('Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <p>Carregando...</p>;
  return (
    <>
      <div className="row">
        <div className="col-6">
          <h2>Clientes</h2>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-dark ml-3" ><i className="fa fa-plus-square" aria-hidden="true"></i> Novo Cliente</button>
          <button className="btn btn-light ml-3" onClick={fetchData}><i className="fa fa-refresh" aria-hidden="true"></i> Atualizar</button>
        </div>
      </div>
      {mensagemErro && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {mensagemErro}
          <button type="button" className="close" onClick={() => setMensagemErro('')} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Morada</th>
            <th>NIF</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.codcli}>
              <td>{cliente.codcli}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.morada}</td>
              <td>{cliente.nif}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button className="btn btn-dark btn-sm mr-2" ><i className='fa fa-eye' aria-hidden='true'></i></button>
                <button className="btn btn-dark btn-sm mr-2" ><i className='fa fa-pencil' aria-hidden='true'></i></button>
                <button className="btn btn-dark btn-sm" onClick={() => openDeleteModal(cliente.codcli)}>
                  <i className='fa fa-trash' aria-hidden='true'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmação</h5>
                  <button type="button" className="close" onClick={closeDeleteModal}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Tem certeza que deseja eliminar este cliente?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancelar</button>
                  <button type="button" className="btn btn-danger" onClick={() => confirmDelete(deleteId)}>Confirmar</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  );
}
function VeiculosList() {
  return (<h2>Página de Veículos</h2>);
}
function InspecoesList() {
  return (<h2>Página de Inspeções</h2>);
}
export default App