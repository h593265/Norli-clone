
import { useEffect, useState } from 'react';
import '../style/main.css';
import { useNavigate, useParams } from 'react-router-dom';

function Search({mainProp}) {

    const {searchvalue} = useParams(); 
    const navigate = useNavigate();
    

   
  return (
    <div style={{color:"black", display:'flex'} } className=''>
   {searchvalue}
    </div>
    
  );
}

export default Search;
