import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  // Hooks para el estado de los items, el nuevo item, y el item en edición
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState(null); 

  // Hook useEffect: Ejecuta fetchItems al cargar la página
  useEffect(() => {
    fetchItems();
  }, []);

  // Función para obtener los datos de la base de datos
  const fetchItems = () => {
    axios.get('http://localhost:5000/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  };

  // Agregar un nuevo item
  const addItem = () => {
    axios.post('http://localhost:5000/items', { name: newItem })
      .then(() => {
        setNewItem('');
        fetchItems();
      });
  };

  // Actualizar un item existente
  const updateItem = () => {
    axios.put(`http://localhost:5000/items/${editItem.id}`, { name: newItem })
      .then(() => {
        setNewItem('');
        setEditItem(null);
        fetchItems();
      });
  };

  // Eliminar un item
  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/items/${id}`)
      .then(() => fetchItems());
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      updateItem();
    } else {
      addItem();
    }
  };

  // Estilos básicos
  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ddd'
  };

  return (
    <div style={containerStyle}>
      <h1>CRUD Completo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Nombre del item"
          style={{ padding: '8px', marginRight: '10px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px' }}>
          {editItem ? 'Actualizar' : 'Agregar'}
        </button>
      </form>
      <ul style={listStyle}>
        {items.map(item => (
          <li key={item.id} style={listItemStyle}>
            <span>{item.name}</span>
            <div>
              <button onClick={() => { setEditItem(item); setNewItem(item.name); }} style={{ marginRight: '5px' }}>
                Editar
              </button>
              <button onClick={() => deleteItem(item.id)} style={{ marginRight: '5px', color: 'red' }}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
