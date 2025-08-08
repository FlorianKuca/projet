import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Tag() {
  // useState est utilisé pour gérer l'état du tableau de tags
  // Il initialise le tableau vide qui sera rempli avec les données récupérées
  const [array, setArray] = useState([]);
  
  // États pour gérer les valeurs du formulaire
  // name et color sont utilisés pour stocker les valeurs des champs de saisie
  const [name, setName] = useState('');
  const [color, setColor] = useState('#FFFFFF');
  
  // États pour la modal d'édition
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('#FFFFFF');
  
  // fetchData est une fonction asynchrone qui récupère les données des tags depuis l'API
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/tags');
      // setArray est utilisé pour mettre à jour l'état du tableau avec les données récupérées
      setArray(response.data);
  }
  
  // Fonction pour créer un nouveau tag
  const createTag = async () => {
    try {
      // Vérifier que les champs ne sont pas vides
      if (!name || !color) {
        alert('Veuillez remplir tous les champs');
        return;
      }
      
      // Envoyer les données à l'API
      await axios.post('http://localhost:3000/tags', {
        name: name,
        color: color
      });
      
      // Réinitialiser le formulaire
      setName('');
      setColor('#FFFFFF');
      
      // Actualiser la liste des tags
      fetchData();
      
    } catch (error) {
      console.error('Erreur lors de la création du tag:', error);
      alert('Erreur lors de la création du tag');
    }
  }
  
  // Fonction pour ouvrir la modal d'édition
  const openEditModal = (tag) => {
    setEditingTag(tag);
    setEditName(tag.name);
    setEditColor(tag.color);
    setIsEditModalOpen(true);
  }
  
  // Fonction pour fermer la modal d'édition
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTag(null);
    setEditName('');
    setEditColor('#FFFFFF');
  }
  
  // Fonction pour sauvegarder les modifications
  const saveEdit = async () => {
    try {
      if (!editName || !editColor) {
        alert('Veuillez remplir tous les champs');
        return;
      }
      
      await axios.patch(`http://localhost:3000/tags/${editingTag.id}`, {
        name: editName,
        color: editColor
      });
      
      closeEditModal();
      fetchData(); // Rafraîchir la liste après édition
      
    } catch (error) {
      console.error('Erreur lors de l\'édition du tag:', error);
      alert('Erreur lors de l\'édition du tag');
    }
  }
  
  // useEffect est utilisé pour récupérer les données lorsque le composant est monté
  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl text-left mx-2 my-5">Table Tag</h2>
      
      {/* Formulaire d'ajout */}
      <div className="join mx-3">
        <input 
          className="input join-item" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="color"
          className="input join-item w-20" 
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button 
          className="btn join-item rounded-r-full"
          onClick={createTag}
        >
          Send
        </button>
      </div>
      
      {/* Table des tags */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Color</th>
              <th>Preview</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              array.map((tag, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{tag.name}</td>
                  <td>{tag.color}</td>
                  <td>
                    <div 
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: tag.color }}
                    ></div>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => openEditModal(tag)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-warning ml-2"
                      onClick={async () => {
                        try {
                          await axios.delete(`http://localhost:3000/tags/${tag.id}`);
                          fetchData(); // Rafraîchir la liste après suppression
                        } catch (error) {
                          console.error('Erreur lors de la suppression du tag:', error);
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
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Éditer le tag</h3>
            
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Nom</span>
              </label>
              <input 
                type="text" 
                placeholder="Nom du tag" 
                className="input input-bordered w-full" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Couleur</span>
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="color"
                  className="input input-bordered w-20" 
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                />
                <span className="text-sm text-gray-500">{editColor}</span>
                <div 
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: editColor }}
                ></div>
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