import React, { useEffect, useState } from 'react';
import { ReactComponent as ArrowDownIcon } from '../icons/arrow-down.svg';
import Sideslidemenu from './sideslidemenu';
import '../style/hamburgermenu.css';
import { useNavigate } from 'react-router-dom';
import { useMain } from '../context/maincontext'; 
import { useSidebar } from '../context/sidebarcontext';

function HamburgerMenu({ }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { setMainProp } = useMain(); 
  const { closeSidebar} = useSidebar();
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/product-desc.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const filter = jsonData.filter(item => item.main);
        setData(filter);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const openDropdownListItems = (index, item) => {
    if (item.title === 'Tilbud') {
      setMainProp('Tilbud');
      navigate(`/Tilbud`);
      closeSidebar()
    } else {
      setDropdownOpen(dropdownOpen === index ? null : index);
    }
  };

  const handleLinkClick = (category) => {
    closeSidebar()
    setMainProp(category);
    navigate(`/${category}`, { state: category });
  };

  return (
    <div className="hamburger-menu">
      <div className="hamburger-menu-content">
        <div style={{ marginLeft: 'auto', color: 'black' }} onClick={() => { closeSidebar(); }}>X</div>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={item.id} className={`hamburger-menu-item ${dropdownOpen === index ? 'active' : ''}`}>
              <div className="hamburger-menu-header" onClick={() => openDropdownListItems(index, item)}>
                {item.alttitle ? item.alttitle : item.title}
                {item.dropdownlistitems.length > 0 && <ArrowDownIcon className="arrow-icon" />}
              </div>
              {dropdownOpen === index && item.dropdownlistitems.length > 0 && (
                <div className="dropdown-content">
                  <Sideslidemenu
                    items={item.dropdownlistitems.map(([title, path]) => ({
                      title: title,
                      value: path
                    }))}
                    onClick={handleLinkClick}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </div>
  );
}

export default HamburgerMenu;
