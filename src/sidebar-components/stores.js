import { useEffect, useState } from 'react';
import '../style/sidebar-components.css';
import { filterStores } from '../util/filtering';

function Stores({ setClose }) {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSubmit = () => {
    setFilteredData(filterStores(data, searchValue));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/stores.json");

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();
        setData(jsonData);
        setFilteredData(jsonData); 
      } catch (e) {
        console.log("Error: " + e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="stores-wrapper" style={{ overflowY: "scroll" }}>
      <div className='stores-head-flex'>
        <div className='stores-dummy'></div>
        <div className='stores-head'>Finn butikk</div>
        <div className='sidebar-exit' onClick={() => setClose()}>X</div>
      </div>

      <div className='stores-container-first'>
        <div className='stores-container-second'>
          <div>Søk etter butikker i nærheten</div>
          <input
            className='stores-searchbar'
            placeholder='Postnummer eller sted'
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <button className='login-button' onClick={handleSubmit}>Søk etter butikker</button>
        </div>
      </div>

      <div className='stores-list' >
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div className='stores-list-item' key={index} >
              <div className='stores-list-name'>{item.name} </div>
              <p className='stores-list-address' style={{textAlign:"start"}}>{item.address}</p>
              <p className='stores-list-opening' style={{textAlign:"start"}}>Man-Fre: {item.openingHours[0]}, Lørdag: {item.openingHours[1]}</p>
              <div className='stores-list-links'><a href="#">Se butikkside</a> <a href="#">Vis i kart</a></div>
            </div>
          ))
        ) : (
          <h1 style={{ margin: "auto" }}>Ingen butikker funnet med søk...</h1>
        )}
      </div>
    </div>
  );
}

export default Stores;
