import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce'
import ProductsList from './components/ProductsList';
import Navbar from './components/Navbar';
import CartNav from './components/CartNav';
import { Routes, Route, useNavigate } from 'react-router-dom'
// import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({})

  let navigate = useNavigate()

  const fetchProducts = () => {
    commerce.products.list().then((products) => {
      setProducts(products.data);
    }).catch((error) => {
      console.log('There was an error fetching the products', error)
    });
  }

  /**
   * Retrieve the current cart or create one if one does not exist
   * https://commercejs.com/docs/sdk/cart
   */
  const fetchCart = () => {
    commerce.cart.retrieve().then((cart) => {
      setCart(cart);
    }).catch((error) => {
      console.log('There was an error fetching the cart', error);
    });
  }

  /**
   * Adds a product to the current cart in session
   * https://commercejs.com/docs/sdk/cart/#add-to-cart
   *
   * @param {string} productId The ID of the product being added
   * @param {number} quantity The quantity of the product being added
   */
   const handleAddToCart = (productId, quantity) => {
    commerce.cart.add(productId, quantity).then((item) => {
      setCart(item.cart);
    }).catch((error) => {
      console.error('There was an error adding the item to the cart', error);
    });
  }

  /**
   * Removes line item from cart
   * https://commercejs.com/docs/sdk/cart/#remove-from-cart
   *
   * @param {string} lineItemId ID of the line item being removed
   */
  const handleRemoveFromCart = (lineItemId) => {
    commerce.cart.remove(lineItemId).then((resp) => {
      setCart(resp.cart);
    }).catch((error) => {
      console.error('There was an error removing the item from the cart', error);
    });
  }
  
  /**
   * Updates line_items in cart
   * https://commercejs.com/docs/sdk/cart/#update-cart
   *
   * @param {string} lineItemId ID of the cart line item being updated
   * @param {number} newQuantity New line item quantity to update
   */
  const handleUpdateCartQty = (lineItemId, quantity) => {
    commerce.cart.update(lineItemId, { quantity }).then((resp) => {
      setCart(resp.cart);
    }).catch((error) => {
      console.log('There was an error updating the cart items', error);
    });
  }

  /**
   * Empties cart contents
   * https://commercejs.com/docs/sdk/cart/#remove-from-cart
   */
  const handleEmptyCart = () => {
    commerce.cart.empty().then((resp) => {
      setCart(resp.cart);
    }).catch((error) => {
      console.error('There was an error emptying the cart', error);
    });
  }

  const handleCaptureCheckout = (checkoutTokenId, newOrder) => {
    commerce.checkout.capture(checkoutTokenId, newOrder).then((order) => {
      setOrder(order)
      refreshCart()
      navigate('/confirmation')
      window.sessionStorage.setItem('order_receipt', JSON.stringify(order))
    }).catch((error) => {
      console.log('There was an error confirming your order', error)
    })
  }


  /*Refreshes to a new cart when order is confirmed*/
  const refreshCart = () => {
    commerce.cart.refresh().then((newCart) => {
      setCart(newCart);
    }).catch((error) => {
      console.log('There was an error refreshing your cart', error)
    })
  }

  

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);


  return (
    <div>
      <Navbar />
      <CartNav
            cart={cart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onEmptyCart={handleEmptyCart}
          />
      <Routes>
        <Route 
          path='/'
          element= {
            <ProductsList 
            products={products} 
            onAddToCart={handleAddToCart}
            />
          }
        />
        <Route 
          path='/checkout'
          element= {
            <Checkout
              cart={cart}
              onCaptureCheckout={handleCaptureCheckout}
            />
          }
        />
        <Route 
          path='/confirmation'
          element= {
            <Confirmation
              order={order}
            />
          }
        />
      </Routes>
    </div>  
  );
}

export default App;
