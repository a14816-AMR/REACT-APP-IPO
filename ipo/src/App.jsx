import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useParams } from 'react-router-dom';

const API_BASE = 'https://reimagined-tribble-4jjrjj5jrxw7357j6-3000.app.github.dev'

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
            <Link className="nav-link" to="/inspecoes">Inspeções</Link>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/clientes" element={<ClientesList />} />
          {/* Rotas do formulário de Clientes */}
          <Route path="/clientes/create" element={<ClienteForm modo="create" />} />
          <Route path="/clientes/update/:id" element={<ClienteForm modo="update" />} />
          <Route path="/clientes/read/:id" element={<ClienteForm modo="read" />} />
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
    <div>
      <div className="jumbotron text-center">
        <h1> Centro de inspeções de automoveis </h1>
        <p>IPO - ESDS1 </p>
      </div>
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
    }
    finally {
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
          <Link to="/clientes/create" className="btn btn-dark">
            <i className="fa fa-plus-square"></i> Novo Cliente
          </Link>
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
                <button className="btn btn-dark btn-sm mr-2" onClick={() => navigate(`/clientes/read/${cliente.codcli}`)}>
                  <i className='fa fa-eye' aria-hidden='true'></i>
                </button>
                <button className="btn btn-dark btn-sm mr-2" onClick={() => navigate(`/clientes/update/${cliente.codcli}`)}>
                  <i className='fa fa-pencil' aria-hidden='true'></i>
                </button>
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
                  <p>Tem certeza que deseja eliminar esta inspeção?</p>
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
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [veiculos, setVeiculos] = useState([]);
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
      const response = await fetch(API_BASE + '/veiculos/' + id, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        setMensagemErro(data.message);
      }
    } catch {
      setMensagemErro('Erro ao eliminar veiculo');
    } finally {
      closeDeleteModal();
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_BASE + '/veiculos');
      const data = await response.json();
      if (data.success) {
        setVeiculos(data.data);
      } else {
        setMensagemErro(data.message);
      }
    } catch {
      setMensagemErro('Erro ao carregar Veiculos');
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <p>Carregando...</p>;
  return (
    <>
      <div className="row">
        <div className="col-6">
          <h2>Veiculos</h2>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-dark ml-3" ><i className="fa fa-plus-square" aria-hidden="true"></i> Novo Veiculo</button>
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
            <th>Matrícula</th>
            <th>Data Livrete</th>
            <th>Ano farbrico</th>
            <th>Nome do cliente</th>
            <th>Marca</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map(veiculos => (
            <tr key={veiculos.codveiculo}>
              <td>{veiculos.codveiculo}</td>
              <td>{veiculos.codmatricula}</td>
              <td>{veiculos.datalivrete}</td>
              <td>{veiculos.anofabrico}</td>
              <td>{veiculos.cliente.nome}</td>
              <td>{veiculos.marca.marca}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button className="btn btn-dark btn-sm mr-2" ><i className='fa fa-eye' aria-hidden='true'></i></button>
                <button className="btn btn-dark btn-sm mr-2" ><i className='fa fa-pencil' aria-hidden='true'></i></button>
                <button className="btn btn-dark btn-sm" onClick={() => openDeleteModal(veiculos.codveiculo)}>
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
                  <p>Tem certeza que deseja eliminar este veiculo?</p>
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

function InspecoesList() {
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inspecoes, setInspecoes] = useState([]);
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
      const response = await fetch(API_BASE + '/inspecoes/' + id, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        setMensagemErro(data.message);
      }
    } catch {
      setMensagemErro('Erro ao eliminar inspeção');
    }
    finally {
      closeDeleteModal();
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_BASE + '/inspecoes');
      const data = await response.json();
      if (data.success) {
        setInspecoes(data.data);
      } else {
        setMensagemErro(data.message);
      }
    } catch {
      setMensagemErro('Erro ao carregar inspeções');
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <p>Carregando...</p>;
  return (
    <>
      <div className="row">
        <div className="col-6">
          <h2>Página de Inspeções</h2>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-dark ml-3" ><i className="fa fa-plus-square" aria-hidden="true"></i> Nova Inspeção</button>
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
            <th>Codigo Inspeção</th>
            <th>Código Cliente</th>
            <th>Código Matrícula</th>
            <th>Código Inspetor</th>
            <th>Data Inspeção</th>
            <th>Número Faltas</th>
            <th>Descrição Faltas</th>
            <th>Aprovado</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {inspecoes.map(inspecao => (
            <tr key={inspecao.codinspecao}>
              <td>{inspecao.codinspecao}</td>
              <td>{inspecao.codcli}</td>
              <td>{inspecao.codmatricula}</td>
              <td>{inspecao.codinspetor}</td>
              <td>{inspecao.datainspecao}</td>
              <td>{inspecao.numerofaltas}</td>
              <td>{inspecao.descricaofaltas}</td>
              <td>{inspecao.aprovado}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button className="btn btn-dark btn-sm mr-2" ><i className='fa fa-eye' aria-hidden='true'></i></button>
                <button className="btn btn-dark btn-sm mr-2" ><i className='fa fa-pencil' aria-hidden='true'></i></button>
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
                  <p>Tem certeza que deseja eliminar este veículo?</p>
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

function ClienteForm({ modo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: '', morada: '', nif: '' });
  const [loading, setLoading] = useState(true);
  const [mensagemErro, setMensagemErro] = useState(null);
  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    try {
      if (id) {
        const response = await fetch(API_BASE + '/clientes/' + id);
        const data = await response.json();
        if (data.success) {
          setFormData(data.data);
        } else {
          setMensagemErro(data.message);
        }
      }
    } catch {
      setMensagemErro('Erro ao carregar cliente');
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = modo === 'update' ? 'PUT' : 'POST';
      const url = modo === 'update' ? `${API_BASE}/clientes/${id}` : `${API_BASE}/clientes`;
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        if (modo === 'update') {
          navigate('/clientes/');
        } else {
          navigate('/clientes');
        }
      } else {
        setMensagemErro(data.message);
      }
    } catch {
      setMensagemErro('Erro ao guardar o cliente');
    }
  };
  if (loading) return <p>Carregando...</p>;
  let title;
  if (modo === 'create') title = 'Novo Cliente';
  else if (modo === 'update') title = 'Editar Cliente #' + id;
  else title = 'Cliente #' + id;
  return (
    <form onSubmit={modo !== 'read' ? handleSubmit : undefined}>
      <h2>{title}</h2>
      {mensagemErro && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {mensagemErro}
          <button type="button" className="close" onClick={() => setMensagemErro('')} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <div className="row">
        <div className="col-sm-8">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" className="form-control" value={formData.nome} onChange={(e) => setFormData({
              ...formData, nome:

                e.target.value
            })} required readOnly={modo === 'read'} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="morada">Morada</label>
            <input type="text" className="form-control" value={formData.morada} onChange={(e) => setFormData({
              ...formData, morada:
                e.target.value
            })} required readOnly={modo === 'read'} />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="nif">NIF</label>
            <input type="text" className="form-control" value={formData.nif} onChange={(e) => setFormData({
              ...formData, nif:

                e.target.value
            })} required readOnly={modo === 'read'} />
          </div>
        </div>
      </div>
      {modo !== 'read' ? (
        <>
          <button type="submit" className="btn btn btn-dark mr-2">Guardar</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/clientes')}>Cancelar</button>
        </>
      ) : (
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/clientes')}>Voltar</button>
      )}
    </form>
  );
}

export default App