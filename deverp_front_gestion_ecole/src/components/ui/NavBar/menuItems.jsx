import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ menuItems }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const styles = {
    navbar: {
      display: 'flex',
      gap: '20px',
      padding: '10px',
      backgroundColor: '#007bff',
    },
    link: (isHovered) => ({
      color: isHovered ? '#005bff' : '#fff',
      //backgroundColor: isHovered ? 'green' : '#007bff',
      textDecoration: isHovered ? 'underline' : 'none',
      fontSize: '18px',
    }),
    activeLink: {
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
  };

  return (
    <nav style={styles.navbar}>
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          style={styles.link(hoverIndex === index)}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
