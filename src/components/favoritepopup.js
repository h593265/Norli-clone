import '../style/sidebar-components.css';
import { ReactComponent as CheckIcon } from '../icons/check.svg';  

function Favoritepopup({ action }) {
  return (
    <div style={{
      width: "300px", 
      height: "100px", 
      position: "fixed", 
      right: "20px", 
      bottom: "30px", 
      backgroundColor: "white", 
      border: "solid gray", 
      borderRadius: "15px", 
      borderWidth: "1px", 
      color: "black", 
      textAlign: "center", 
      display: "flex", 
      alignItems: "center"
    }}>
      <div style={{
        width: "40px", 
        height: "40px", 
        backgroundColor: "green", 
        borderRadius: "100%", 
        margin: "0px 20px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center"
      }}>
        <CheckIcon fill='white' style={{ width: "25px" }} />
      </div>
      <div style={{ maxWidth: "250px" }}>
        {action ? "Favoritten ble lagt til i listen din" : "Favoritten ble fjernet fra listen din"}
      </div>
    </div>
  );
}

export default Favoritepopup;
