import { useNavigate } from 'react-router-dom';
import '../style/home.css';
import ImageSlider from '../util/imageslider';
import ProductListShort from '../list/product-list-short';


function Home({ showpopup }) {
  const navigate = useNavigate();
  const slides = [
    { url: 'carousel-nr1.jpg', title: 'boker' },
    { url: 'carousel-nr2.jpg', title: 'leker' },
    { url: 'carousel-nr3.jpg', title: 'spill' },
    { url: 'carousel-nr4.jpg', title: 'spill' },
  ];

  return (
    <div className="home">
      <div className='medals-wrapper'>
        <div className='medals-flex'>
          <div className='medals-icon'>
            <img src='delivery.png' />
            <div className='medals-text'>Gratis frakt fra 299,-</div>
          </div>
          <div className='medals-icon'>
            <img src='return.png' />
            <div className='medals-text'>Bytt i 200 butikker</div>
          </div>
          <div className='medals-icon'>
            <img src='openbuy.png' />
            <div className='medals-text'>God service</div>
          </div>
          <div className='medals-icon'>
            <img src='klarna.png' />
            <div className='medals-text'>Betal med Klarna</div>
          </div>
        </div>
      </div>
      <div className='home-cat-wrapper'>
        <div className='home-cat-container-flex'>
          <div className='home-cat-img1' style={{ backgroundImage: `url(${slides[0].url})` }} onClick={() => navigate(`/boker`)}>
            <div className='home-cat-text'>Bøker</div>
          </div>
          <div className='home-cat-img2' style={{ backgroundImage: `url(${slides[1].url})` }} onClick={() => navigate(`/leker`)}>
            <div className='home-cat-text'>Leker</div>
          </div>
          <div className='home-cat-container-image-flex'>
            <div className='home-cat-img3' style={{ backgroundImage: `url(${slides[3].url})` }} onClick={() => navigate(`/tilbud`)}>
              <div className='home-cat-text'>Tilbud</div>
            </div>
            <div className='home-cat-img4' style={{ backgroundImage: `url(${slides[2].url})` }} onClick={() => navigate(`/spill`)}>
              <div className='home-cat-text'>Spill</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{width:"100%"}}>
      <ProductListShort product="boker" message="Forskjellige Bøker" allowinteractives={true} showpopup={showpopup} />
      <ProductListShort product="leker" message="Forskjellige leker" allowinteractives={true} showpopup={showpopup} />
      <ProductListShort product="spill" message="Forskjellige spill" allowinteractives={true} showpopup={showpopup} />
      </div>
    </div>
  );
}

export default Home;
