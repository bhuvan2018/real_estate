import React, { useState } from 'react';
    import './SellProperty.css';

    function SellProperty({ addProperty }) {
      const [newProperty, setNewProperty] = useState({
        title: '',
        description: '',
        image: '',
        price: '',
      });

      const handleInputChange = (e) => {
        setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
      };

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setNewProperty({ ...newProperty, image: e.target.result });
          };
          reader.readAsDataURL(file);
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        addProperty(newProperty);
        setNewProperty({ title: '', description: '', image: '', price: '' });
        alert('Property submitted for sale!');
      };

      return (
        <div className="sell-property">
          <h2>Sell Your Property</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" value={newProperty.title} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" value={newProperty.description} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
              {newProperty.image && <img src={newProperty.image} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />}
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input type="number" id="price" name="price" value={newProperty.price} onChange={handleInputChange} required />
            </div>
            <button type="submit">Submit Property</button>
          </form>
        </div>
      );
    }

    export default SellProperty;
