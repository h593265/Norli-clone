import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/authprovider';

function Auth({ setClose }) {
  const { setUser, logout } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    
    setError('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
  }, [isLogin]);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
        credentials: 'include',
      });

      if (response.ok) {
        const authResponse = await fetch('http://localhost:5000/login/protected', {
          method: 'GET',
          credentials: 'include',
        });

        if (authResponse.ok) {
          const text = await authResponse.text();
          try {
            const authData = JSON.parse(text);

            if (authData.user) {
              setUser(authData.user);
              setClose(true);
              setError('');
            } else {
              setError('User data is missing');
            }
          } catch (jsonError) {
            setError('Failed to parse server response');
          }
        } else {
          setError('Failed to fetch protected resource');
        }
      } else {
        setError('Feil brukernavn/passord');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  const handleRegister = async () => {
    if (password === repeatPassword) {
      if (email && password) {
        try {
          const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password: password }),
            credentials: 'include',
          });

          if (response.ok) {
            setClose(true);
            setError('');
          } else {
            setError('E-postadresse er allerede i bruk');
          }
        } catch (error) {
          setError('Noe gikk galt...');
        }
      } else {
        setError('Vennligst skriv inn E-postadresse og passord');
      }
    } else {
      setError('Passordene stemmer ikke');
    }
  };

  const renderLogin = () => (
    <>
      <div className='login-container-second'>
        <div>E-postadresse</div>
        <input
          type="email"
          placeholder='Testuser: "test"'
          
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{}}
        />
        <div>Passord</div>
        <input
          type="password"
          placeholder='Testuser: "test"'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: "red", fontSize: "13px" }}>{error}</div>}
      <a  className='link' style={{textDecoration:"underline", color:"purple", cursor:"pointer"}}>Glemt passord?</a>
      <div className='button-flex'>
        <button className='login-button' onClick={handleLogin}>Logg inn</button>
        <button className='register-button' onClick={() => setIsLogin(false)}>Registrer ny bruker</button>
      </div>
    </>
  );

  const renderRegister = () => (
    <>
      <div className='login-container-second'>
        <div>E-postadresse</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>Passord</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>Gjenta passord</div>
        <input
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: "red", fontSize: "13px" }}>{error}</div>}
      <div className='button-flex'>
        <button className='login-button' onClick={handleRegister}>Registrer</button>
        <button className='register-button' onClick={() => setIsLogin(true)}>Tilbake til innlogging</button>
      </div>
    </>
  );

  return (
    <div className="stores-wrapper">
      <div className='stores-head-flex'>
        <div className='stores-dummy'></div>
        <div className='stores-head'>{isLogin ? 'Logg inn' : 'Registrer'}</div>
        <div className='sidebar-exit' onClick={() => setClose(true)}>X</div>
      </div>
      <div className='login-wrapper'>
        <div className='login-container-first'>
          {isLogin ? renderLogin() : renderRegister()}
        </div>
      </div>
    </div>
  );
}

export default Auth;
