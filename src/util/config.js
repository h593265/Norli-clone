const dev = {
    API_URL: 'http://localhost:5000',
  };
  
  const prod = {
    API_URL: 'https://norliklone-api.no',
  };
  
  export const config = process.env.NODE_ENV === 'development' ? dev : prod;