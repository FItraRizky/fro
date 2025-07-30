import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="produk" element={<Products />} />
            <Route path="produk/:id" element={<ProductDetail />} />
            <Route path="keranjang" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="akun" element={<Account />} />
            <Route path="tentang" element={<About />} />
            <Route path="kontak" element={<Contact />} />
          </Route>
        </Routes>
      </div>
    </AppProvider>
  )
}

export default App