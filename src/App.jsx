import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
  const [toastMessage, setToastMessage] = useState('');

  const showNotification = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />

        {toastMessage && (
          <div className="toast-notification" role="status">
            {toastMessage}
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home onNotify={showNotification} />} />
          <Route
            path="/product/:id"
            element={<ProductDetails onNotify={showNotification} />}
          />
          <Route path="/cart" element={<Cart onNotify={showNotification} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;