import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../style/breadcrumbs.css'; 

function Breadcrumbs() {
  const location = useLocation();

  function format() {
    const paths = location.pathname.replaceAll("%20", " ").split('/').slice(1);

    return paths.map((path, index) => {
      const to = `/${paths.slice(0, index + 1).join('/')}`;

      return (
        <div className="breadcrumb-item" key={index}>
          <Link to={to} className="breadcrumb-link">
            {path}
          </Link>
          {index < paths.length - 1 && <span className="breadcrumb-separator">/</span>}
        </div>
      );
    });
  }

  return (
    <div className="breadcrumbs">
      <div className="breadcrumb-item">
        <Link to="/" className="breadcrumb-link">Hjem</Link>
      </div>
      <span className="breadcrumb-separator">/</span>
      {format()}
    </div>
  );
}

export default Breadcrumbs;
