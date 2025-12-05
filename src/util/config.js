const dev = {
    API_URL: 'https://your-render-url.onrender.com',
  };
  
  const prod = {
    API_URL: 'https://your-render-url.onrender.com',
    DOMAIN_URL: 'https://norli-clone.onrender.com'
  };

  

  
  export const config = process.env.NODE_ENV === 'development' ? dev : prod;