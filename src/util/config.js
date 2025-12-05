const dev = {
    API_URL: 'https://norli-clone-api-1.onrender.com',
  };
  
  const prod = {
    API_URL: 'https://norli-clone-api-1.onrender.com',
    DOMAIN_URL: 'https://norli-clone.onrender.com'
  };

  

  
  export const config = process.env.NODE_ENV === 'development' ? dev : prod;