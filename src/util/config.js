const dev = {
    API_URL: 'http://localhost:5000',
  };
  
  const prod = {
    API_URL: 'https://norli-clone-api.onrender.com',
  };
  
  export const config = process.env.NODE_ENV === 'development' ? dev : prod;