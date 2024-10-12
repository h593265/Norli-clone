
import '../style/footer.css';

function Footer() {
  return (
    <div className="footer-wrapper">
      
      <div className="footer-container">

      <div className="footer-flex-container">
        
<div className="footer-head-flex"><div className='footer-head'>Hjelp</div>

<div>Kundeservice</div>
<div>Sikkerhet og personvern</div>
<div>Betingelser</div>

</div>
<div className="footer-head-flex"><div className='footer-head'>Norli</div>

<div>Om Norli</div>
<div>Våre butikker</div>
<div>Våre kategorier</div>

</div>



      </div>

      <div className='footer-end-container'>

      <div className='footer-end-flex'>
    <div className='img-container'><img src='../face.png'/></div>
    <div className='img-container'><img src='../insta.png'/></div>
    <div className='img-container'><img src='../snap.png'/></div>
</div>
      </div>
     
    </div>
    
    </div>

  );
}

export default Footer;
