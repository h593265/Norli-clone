import { useEffect, useState } from 'react';
import '../style/imageslider.css';

function ImageSlider({slides}) {
    const [currentIndex, setCurrentIndex] = useState(0);

   
    const incrementImage = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    
    const decrementImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className='imageslider-wrapper'>
            <div className='imageslider-overlay' style={{ backgroundImage: `url(${slides[currentIndex].overlay})` }}></div>
            <div className='imageslider-image-container' style={{ backgroundImage: `url(${slides[currentIndex].url})` }} >
            <div className='arrow-flex'>
                    <div className='arrowleft' onClick={decrementImage}>&lt;</div>
                    <div className='arrowright' onClick={incrementImage}>&gt;</div>
                </div>
            </div>
                
            </div>
      
    );
}

export default ImageSlider;
