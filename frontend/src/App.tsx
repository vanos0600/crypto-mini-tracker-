import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchPrices } from './store/cryptoSlice';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { prices, status, error } = useAppSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchPrices());
    const interval = setInterval(() => dispatch(fetchPrices()), 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const formatPrice = (price: number | undefined) => {
    return price ? `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}` : 'N/A';
  };

  const formatPercentage = (percent?: number) => {
    if (percent === undefined) return 'N/A';
    return `${percent > 0 ? '↑' : '↓'} ${Math.abs(percent).toFixed(2)}%`;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🪙 Crypto Luxe Tracker</h1>
          <p className="tagline">Monitoreo en tiempo real de las criptomonedas líderes</p>
          <div className="gold-bar"></div>
        </div>
      </header>

      <div className="banner">
        <p>El futuro de las finanzas está aquí. Invierte con sabiduría.</p>
      </div>

      <main className="crypto-dashboard">
        {status === 'loading' && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Obteniendo datos en tiempo real...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <p>Error: {error}</p>
            <button onClick={() => dispatch(fetchPrices())}>
              Reintentar conexión
            </button>
          </div>
        )}

        {status === 'succeeded' && (
          <>
            <div className="market-info">
              <div className="info-card">
                <h3>Mercado en Movimiento</h3>
                <p>Las criptomonedas están transformando el panorama financiero global</p>
              </div>
              <div className="info-card">
                <h3>Actualizaciones cada 30 segundos</h3>
                <p>Datos precisos y en tiempo real para tus decisiones</p>
              </div>
            </div>
            
            <div className="crypto-grid">
              <div className="crypto-card bitcoin">
                <div className="crypto-header">
                  <img src="/logos/btc.jpg" alt="Bitcoin" />
                  <div className="crypto-titles">
                    <h2>Bitcoin</h2>
                    <p className="symbol">BTC</p>
                  </div>
                </div>
                <div className="crypto-price-info">
                  <p className="crypto-price">{formatPrice(prices.bitcoin?.usd)}</p>
                  <p className="crypto-change">
                    {formatPercentage(prices.bitcoin?.usd_24h_change)}
                  </p>
                </div>
                <div className="crypto-quote">
                  <p>"El oro digital que redefinió las finanzas"</p>
                </div>
              </div>

              <div className="crypto-card ethereum">
                <div className="crypto-header">
                  <img src="/logos/ethereum.png" alt="Ethereum" />
                  <div className="crypto-titles">
                    <h2>Ethereum</h2>
                    <p className="symbol">ETH</p>
                  </div>
                </div>
                <div className="crypto-price-info">
                  <p className="crypto-price">{formatPrice(prices.ethereum?.usd)}</p>
                  <p className="crypto-change">
                    {formatPercentage(prices.ethereum?.usd_24h_change)}
                  </p>
                </div>
                <div className="crypto-quote">
                  <p>"La plataforma para la economía descentralizada"</p>
                </div>
              </div>

              <div className="crypto-card ripple">
                <div className="crypto-header">
                  <img src="/logos/image.png" alt="XRP" />
                  <div className="crypto-titles">
                    <h2>XRP</h2>
                    <p className="symbol">XRP</p>
                  </div>
                </div>
                <div className="crypto-price-info">
                  <p className="crypto-price">{formatPrice(prices.ripple?.usd)}</p>
                  <p className="crypto-change">
                    {formatPercentage(prices.ripple?.usd_24h_change)}
                  </p>
                </div>
                <div className="crypto-quote">
                  <p>"Revolucionando las transacciones transfronterizas"</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <div className="knowledge-section">
        <h3>Sabías que...</h3>
        <div className="facts-grid">
          <div className="fact-card">
            <div className="fact-icon">🔒</div>
            <p>Blockchain es la tecnología más segura jamás creada para transacciones financieras</p>
          </div>
          <div className="fact-card">
            <div className="fact-icon">🌍</div>
            <p>Las criptomonedas no tienen fronteras y operan 24/7 en todo el mundo</p>
          </div>
          <div className="fact-card">
            <div className="fact-icon">📈</div>
            <p>Bitcoin ha sido el activo de mejor rendimiento de la última década</p>
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Crypto Luxe Tracker | Fuente: CoinGecko</p>
          <p className="disclaimer">Los precios son informativos. Invertir implica riesgos.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;