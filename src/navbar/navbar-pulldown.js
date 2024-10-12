import React, { useRef, useEffect} from 'react';
import '../style/pulldown.css'; 

function useOutsideAlerter(ref, callback) {
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
       callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mouseleave", handleClickOutside);
  }, [ref, callback]);
}

function Dropdown({ prop , onClose, onclick}) {
  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, onClose);
  return (
     prop.dropdownlistitems.length > 0 && <div className="dropdown" ref={dropdownRef}>
      {prop.dropdownlistitems.map((item, index) => (
        
        <div style={{fontWeight:"100"}} className="dropdown-text"key={index} onClick={()=> {onclick(item[1])}}>{item[0]}</div>
      ))}
    </div>
  );
}

export default Dropdown;
