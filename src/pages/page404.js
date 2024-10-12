
import { useEffect, useState } from 'react';
import '../style/main.css';
import ProductListShort from '../list/product-list-short';

function ErrorPage({title, subtitle,showpopup}) {
  const [data, setData] = useState(null);
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
  
  return (
    
    <><div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "black", padding: "100px"}}>
      <h1>{title ? title : "Oops! Her har visst noe gått galt ..."}</h1>
      <p>{subtitle ? subtitle : "Fortvil ikke! Du kan gå tilbake til forsiden, eller kanskje et av disse valgene kan hjelpe deg videre?"}</p>
      <h2>Sjekk våre populære kategorier:</h2>
      <div className= "errorpage-buttons-container" >
  {data&& data.map((category, index) => 
    <div key = {index} className='errorpage-buttons'>{category.title}</div>
  )}

      </div>
    </div><div style={{ color: "black", marginTop: "15%", maxWidth:"1700px", margin:"auto", paddingBottom:"20%"}}>
        <ProductListShort product="boker" message="Andre kjøpte også:" allowinteractives={true} showpopup={showpopup} />
      </div></>
  );
}

export default ErrorPage;
