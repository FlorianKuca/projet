import axios from 'axios';
import { useEffect, useState } from 'react';

export default function User() {
  // useState est utilisé pour gérer l'état du tableau d'utilisateurs
  // Il initialise le tableau vide qui sera rempli avec les données récupérées
  const [array, setArray] = useState([]);
  
  // États pour gérer les valeurs du formulaire
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [phone, setPhone] = useState('');
  
  // États pour la modal d'édition
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editLastname, setEditLastname] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editRole, setEditRole] = useState('member');
  const [editPhone, setEditPhone] = useState('');
  
  // fetchData est une fonction asynchrone qui récupère les données des utilisateurs depuis l'API
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/users');
      // setArray est utilisé pour mettre à jour l'état du tableau avec les données récupérées
      setArray(response.data);
  }
  
  // Fonction pour créer un nouvel utilisateur
  const createUser = async () => {
    try {
      // Vérifier que les champs obligatoires ne sont pas vides
      if (!username || !lastname || !email || !password || !phone) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }
      
      // Envoyer les données à l'API
      await axios.post('http://localhost:3000/users', {
        username: username,
        lastname: lastname,
        email: email,
        password: password,
        role: role,
        phone: phone
      });
      
      // Réinitialiser le formulaire
      setUsername('');
      setLastname('');
      setEmail('');
      setPassword('');
      setRole('member');
      setPhone('');
      
      // Actualiser la liste des utilisateurs
      fetchData();
      
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      alert('Erreur lors de la création de l\'utilisateur');
    }
  }
  
  // Fonction pour ouvrir la modal d'édition
  const openEditModal = (user) => {
    setEditingUser(user);
    setEditUsername(user.username);
    setEditLastname(user.lastname);
    setEditEmail(user.email);
    setEditPassword(''); // Ne pas pré-remplir le mot de passe
    setEditRole(user.role);
    setEditPhone(user.phone);
    setIsEditModalOpen(true);
  }
  
  // Fonction pour fermer la modal d'édition
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
    setEditUsername('');
    setEditLastname('');
    setEditEmail('');
    setEditPassword('');
    setEditRole('member');
    setEditPhone('');
  }
  
  // Fonction pour sauvegarder les modifications
  const saveEdit = async () => {
    try {
      if (!editUsername || !editLastname || !editEmail || !editPhone) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }
      
      const updateData = {
        username: editUsername,
        lastname: editLastname,
        email: editEmail,
        role: editRole,
        phone: editPhone
      };
      
      // Ajouter le mot de passe seulement s'il est fourni
      if (editPassword) {
        updateData.password = editPassword;
      }
      
      await axios.patch(`http://localhost:3000/users/${editingUser.id}`, updateData);
      
      closeEditModal();
      fetchData(); // Rafraîchir la liste après édition
      
    } catch (error) {
      console.error('Erreur lors de l\'édition de l\'utilisateur:', error);
      alert('Erreur lors de l\'édition de l\'utilisateur');
    }
  }
  
  // useEffect est utilisé pour récupérer les données lorsque le composant est monté
  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl text-left mx-2 my-5">Table User</h2>
      
      {/* Formulaire d'ajout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4 mx-3">
        <input 
          className="input input-bordered" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          className="input input-bordered" 
          placeholder="Lastname" 
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input 
          className="input input-bordered" 
          placeholder="Email" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          className="input input-bordered" 
          placeholder="Password" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select 
          className="select select-bordered"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <input 
          className="input input-bordered" 
          placeholder="Phone" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <button 
          className="btn btn-primary"
          onClick={createUser}
        >
          Add User
        </button>
      </div>
      
      {/* Table des utilisateurs */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              array.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'badge-error' : 'badge-info'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.phone}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-success mr-1"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-warning"
                      onClick={async () => {
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
                          try {
                            await axios.delete(`http://localhost:3000/users/${user.id}`);
                            fetchData(); // Rafraîchir la liste après suppression
                          } catch (error) {
                            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      
      {/* Modal d'édition */}
      {isEditModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Éditer l'utilisateur</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username *</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Username" 
                  className="input input-bordered" 
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Lastname *</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Lastname" 
                  className="input input-bordered" 
                  value={editLastname}
                  onChange={(e) => setEditLastname(e.target.value)}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email *</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="input input-bordered" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone *</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Phone" 
                  className="input input-bordered" 
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password (optionnel)</span>
                </label>
                <input 
                  type="password" 
                  placeholder="Nouveau mot de passe" 
                  className="input input-bordered" 
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select 
                  className="select select-bordered"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            
            <div className="modal-action">
              <button 
                className="btn btn-success"
                onClick={saveEdit}
              >
                Sauvegarder
              </button>
              <button 
                className="btn btn-ghost"
                onClick={closeEditModal}
              >
                Annuler
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeEditModal}></div>
        </div>
      )}
    </div>
  );
}