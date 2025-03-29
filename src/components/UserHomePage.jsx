import React, { useState } from 'react';
    import './UserHomePage.css';

    function UserHomePage({ properties }) {
      const [searchTerm, setSearchTerm] = useState('');

      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };

      const filteredProperties = properties.filter((property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      return (
        <div className="user-home-page">
          <h2>Welcome to the Real Estate Website</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for properties..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="property-grid">
            {filteredProperties.map((property, index) => (
              <div key={index} className="property-card">
                <img src={property.image} alt={property.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <h4>{property.title}</h4>
                <p>Price: ${property.price}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    export default UserHomePage;
