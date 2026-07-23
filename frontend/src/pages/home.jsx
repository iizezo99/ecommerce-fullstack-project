import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Welcome to ShopVibe 🛍️
        </h1>
        <p style={{ fontSize: '1.3rem', color: '#475569', marginBottom: '2.5rem' }}>
          Discover amazing products at great prices! Shop electronics, fashion, and more.
        </p>
        <Link to="/products">
          <button className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
            Start Shopping Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;