import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchPrices } from './store/cryptoSlice';
import './App.css';

const CRYPTO_META = {
  bitcoin:  { name: 'Bitcoin',  symbol: 'BTC', logo: '/logos/btc.jpg',      color: '#F7931A', desc: 'The original digital gold' },
  ethereum: { name: 'Ethereum', symbol: 'ETH', logo: '/logos/ethereum.png',  color: '#627EEA', desc: 'Programmable blockchain' },
  ripple:   { name: 'XRP',      symbol: 'XRP', logo: '/logos/image.png',     color: '#00AAE4', desc: 'Cross-border payments' },
} as const;

export default function App() {
  const dispatch = useAppDispatch();
  const { prices, status, error } = useAppSelector((s) => s.crypto);
  const [countdown, setCountdown] = useState(30);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchPrices());
    const dataTimer = setInterval(() => {
      dispatch(fetchPrices());
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCountdown(30);
    }, 30000);
    const tick = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => { clearInterval(dataTimer); clearInterval(tick); };
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && !lastUpdated) {
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  }, [status]);

  const fmt = (price?: number) => {
    if (!price) return '—';
    if (price < 1)   return `$${price.toFixed(4)}`;
    if (price < 100) return `$${price.toFixed(2)}`;
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const fmtPct = (pct?: number) => {
    if (pct === undefined) return null;
    return { str: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`, positive: pct >= 0 };
  };

  const isLoaded = status === 'succeeded' || (status === 'loading' && lastUpdated);

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <svg className="brand-hex" viewBox="0 0 28 28" fill="none">
              <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <polygon points="14,8 21,12 21,18 14,21 7,18 7,12" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
            </svg>
            <span className="brand-name">CRYPTOLUX</span>
          </div>
          <div className="header-right">
            <span className={`pill ${status === 'succeeded' ? 'pill-live' : status === 'loading' ? 'pill-sync' : 'pill-err'}`}>
              <span className="pill-dot" />
              {status === 'succeeded' ? 'LIVE' : status === 'loading' ? 'SYNC' : 'ERR'}
            </span>
            {lastUpdated && (
              <span className="header-clock">
                {lastUpdated}
                <span className="header-cd"> · {countdown}s</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <span className="hero-eyebrow">Real-time market data</span>
        <h1 className="hero-h1">Market <em>Overview</em></h1>
        <p className="hero-sub">Tracking {Object.keys(CRYPTO_META).length} assets · auto-refresh every 30 s</p>
      </section>

      {/* Main */}
      <main className="main">

        {status === 'loading' && !lastUpdated && (
          <div className="state-wrap">
            <div className="loader">
              <div className="loader-ring" />
              <span className="loader-sym">◈</span>
            </div>
            <p className="state-txt">Fetching live prices…</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="state-wrap">
            <div className="err-box">
              <span className="err-sym">△</span>
              <p>{error || 'Unable to reach market data.'}</p>
              <button className="btn-retry" onClick={() => dispatch(fetchPrices())}>Retry</button>
            </div>
          </div>
        )}

        {isLoaded && (
          <div className="grid">
            {(Object.entries(CRYPTO_META) as [keyof typeof CRYPTO_META, (typeof CRYPTO_META)[keyof typeof CRYPTO_META]][]).map(([id, meta], i) => {
              const data = prices[id as keyof typeof prices];
              const chg  = fmtPct(data?.usd_24h_change);
              return (
                <article className="card" key={id} style={{ '--accent': meta.color, '--i': i } as React.CSSProperties}>
                  <div className="card-top">
                    <div className="coin-ident">
                      <div className="coin-img-wrap">
                        <img src={meta.logo} alt={meta.name} className="coin-img" />
                        <div className="coin-halo" />
                      </div>
                      <div>
                        <div className="coin-name">{meta.name}</div>
                        <div className="coin-sym">{meta.symbol}</div>
                      </div>
                    </div>
                    {chg && (
                      <span className={`chg ${chg.positive ? 'chg-pos' : 'chg-neg'}`}>
                        {chg.positive ? '▲' : '▼'} {chg.str}
                      </span>
                    )}
                  </div>

                  <div className="card-price">{fmt(data?.usd)}</div>
                  <div className="card-desc">{meta.desc}</div>

                  <div className="card-bar" />
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Knowledge */}
      <section className="knowledge">
        <h2 className="knowledge-h2">Did you know?</h2>
        <div className="facts">
          {[
            { icon: '⬡', text: 'Blockchain makes financial records the most tamper-resistant ever created.' },
            { icon: '◎', text: 'Crypto markets run 24 / 7 with no borders, no banking hours, no middlemen.' },
            { icon: '◈', text: 'Bitcoin was the best-performing asset of the last decade by a wide margin.' },
          ].map((f, i) => (
            <div className="fact" key={i} style={{ '--i': i } as React.CSSProperties}>
              <span className="fact-icon">{f.icon}</span>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span>© {new Date().getFullYear()} CryptoLux · Data via CoinGecko</span>
        <span className="footer-note">For informational purposes only. Not financial advice.</span>
      </footer>
    </div>
  );
}