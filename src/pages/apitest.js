import React, { useState } from 'react';
import { config } from '../util/config';

function APITest() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testEndpoint = async (endpoint) => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      const startTime = Date.now();
      const response = await fetch(`${config.API_URL}${endpoint}`);
      const endTime = Date.now();
      
      if (!response.ok) {
        setResult(`❌ Error: ${response.status} ${response.statusText} (${endTime - startTime}ms)`);
      } else {
        const data = await response.json();
        setResult(`✅ Success! (${endTime - startTime}ms)\n${JSON.stringify(data, null, 2).substring(0, 500)}...`);
      }
    } catch (error) {
      setResult(`❌ Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>API Test Page</h1>
      <p><strong>API URL:</strong> {config.API_URL}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Test Endpoints:</h3>
        <button 
          onClick={() => testEndpoint('/products/getonsale')} 
          disabled={loading}
          style={{ margin: '5px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Test /products/getonsale
        </button>
        
        <button 
          onClick={() => testEndpoint('/products/getbycategory?category=boker')} 
          disabled={loading}
          style={{ margin: '5px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Test /products/getbycategory
        </button>
        
        <button 
          onClick={() => testEndpoint('/products/search?query=harry')} 
          disabled={loading}
          style={{ margin: '5px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Test /products/search
        </button>
        
        <button 
          onClick={() => testEndpoint('/')} 
          disabled={loading}
          style={{ margin: '5px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Test Base URL
        </button>
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px', minHeight: '200px' }}>
        <h3>Result:</h3>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {result || 'Click a button to test an endpoint'}
        </pre>
      </div>
    </div>
  );
}

export default APITest;
