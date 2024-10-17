import { useEffect, useState } from 'react';
import '../style/main.css';
import Breadcrumbs from '../components/breadcrumbs';
import ProductList from '../list/product-list';
import { useMain } from '../context/maincontext';
import ErrorPage from './page404';
import { useLocation } from 'react-router-dom';

function Main({ showpopup }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { mainProp } = useMain();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  useEffect(() => {
    if (!mainProp) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/product-desc.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        const formatted = jsonData.find((item) =>
          item.title.toLowerCase() === location.pathname.slice(1)
        );

        setData(formatted || null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mainProp, location.pathname]);

  return (
    <div className="main">
      {loading ? (
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <ErrorPage />
      ) : data ? (
        <div>
          <div className="main-top-flex">
            <div className="main-top-left"><Breadcrumbs /></div>
            <div className="main-top-right">
              <div>Gratis frakt på ordre fra 299,-</div>
              <div>Bytt i 200 butikker</div>
            </div>
          </div>
          <div className="main-content-flex">
            <div className="main-title">
              {data.alttitle ? data.alttitle : data.title}
            </div>
            <div className="main-description">
              {data.description}
            </div>
            <ProductList product={data.title} allowinteractives={true} showpopup={showpopup} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Main;
