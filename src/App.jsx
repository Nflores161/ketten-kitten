import React, { useState } from 'react';
import { commerce } from './lib/commerce'
import Products from './components/Products';
import Navbar from './components/Navbar';
import { useEffect } from 'react/cjs/react.production.min';


const App = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Products products={products}/>
    </div>
  );
}

export default App;
