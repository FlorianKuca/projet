import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Note() {
  // useState est utilisé pour gérer l'état du tableau de notes
  // Il initialise le tableau vide qui sera rempli avec les données récupérées
  const [array, setArray] = useState([]);
  
  // États pour gérer les valeurs du formulaire
  // title et content sont utilisés pour stocker les valeurs des champs de saisie
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // États pour la modal d'édition
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  
  // fetchData est une fonction asynchrone qui récupère les données des notes depuis l'API
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/notes');
      // setArray est utilisé pour mettre à jour l'état du tableau avec les données récupérées
      setArray(response.data);
  }
  
  // Fonction pour créer une nouvelle note
  const createNote = async () => {
    try {
      // Vérifier que les champs ne sont pas vides
      if (!title || !content) {
        alert('Veuillez remplir tous les champs');
        return;
      }
      
      // Envoyer les données à l'API
      await axios.post('http://localhost:3000/notes', {
        title: title,
        content: content
      });
      
      // Réinitialiser le formulaire
      setTitle('');
      setContent('');
      
      // Actualiser la liste des notes
      fetchData();
      
    } catch (error) {
      console.error('Erreur lors de la création de la note:', error);
      alert('Erreur lors de la création de la note');
    }
  }
  
  // Fonction pour ouvrir la modal d'édition
  const openEditModal = (note) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditModalOpen(true);
  }
  
  // Fonction pour fermer la modal d'édition
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingNote(null);
    setEditTitle('');
    setEditContent('');
  }
  
  // Fonction pour sauvegarder les modifications
  const saveEdit = async () => {
    try {
      if (!editTitle || !editContent) {
        alert('Veuillez remplir tous les champs');
        return;
      }
      
      await axios.patch(`http://localhost:3000/notes/${editingNote.id}`, {
        title: editTitle,
        content: editContent
      });
      
      closeEditModal();
      fetchData(); // Rafraîchir la liste après édition
      
    } catch (error) {
      console.error('Erreur lors de l\'édition de la note:', error);
      alert('Erreur lors de l\'édition de la note');
    }
  }
  
  // useEffect est utilisé pour récupérer les données lorsque le composant est monté
  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl text-left mx-2 my-5">Table Note</h2>
      
      {/* Formulaire d'ajout */}
      <div className="join mx-3">
        <input 
          className="input join-item" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          className="input join-item" 
          placeholder="Description" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button 
          className="btn join-item rounded-r-full"
          onClick={createNote}
        >
          Send
        </button>
      </div>
      
      {/* Table des notes */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Definition</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              array.map((note, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{note.title}</td>
                  <td>{note.content}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => openEditModal(note)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-warning ml-2"
                      onClick={async () => {
                        try {
                          await axios.delete(`http://localhost:3000/notes/${note.id}`);
                          fetchData(); // Rafraîchir la liste après suppression
                        } catch (error) {
                          console.error('Erreur lors de la suppression de la note:', error);
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
            <h3 className="font-bold text-lg mb-4">Éditer la note</h3>
            
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Titre</span>
              </label>
              <input 
                type="text" 
                placeholder="Titre de la note" 
                className="input input-bordered w-full" 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Contenu</span>
              </label>
              <textarea 
                className="textarea textarea-bordered w-full" 
                placeholder="Contenu de la note"
                rows="4"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              ></textarea>
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