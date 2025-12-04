const dev = {
    API_URL: 'https://norli-clone-api.vercel.app',
  };
  
  const prod = {
    API_URL: 'https://norli-clone-api.vercel.app',
    DOMAIN_URL: 'https://norli-clone.onrender.com'
  };

  

  
  export const config = process.env.NODE_ENV === 'development' ? dev : prod;