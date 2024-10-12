import React, { useState } from 'react';

function Sideslidemenu({ items, onClick }) {
  const [activeItem, setActiveItem] = useState(null);

  const handleHeaderClick = (index) => {
    setActiveItem(activeItem === index ? null : index);
  };

  const handleDropdownItemClick = (item) => {
    onClick(item);
    setActiveItem(null); 
  };

  return (
    <div className="sideslide-menu">
      
      {items.map((item, index) => (
        <div key={index}>
          <div className="sideslide-menu-header" onClick={() => onClick(item.value)}>
            {item.title}
          </div>
       
        </div>
      ))}
    </div>
  );
}

export default Sideslidemenu;
