import React from 'react'
import PropTypes from 'prop-types';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart}) => {

  const handleUpdateCartQty = (lineItemId, quantity) => {
    onUpdateCartQty(lineItemId, quantity);
  }

  const handleRemoveFromCart = () => {
    onRemoveFromCart(item.id);
  }

  return (
    <div id='cart-item'>
      <img class='item-img' src={item.image.url} alt={item.name} />
      <div>
        <h4 >{item.name}</h4>
        <div>
          <button type="button" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</button>
          <p>{item.quantity}</p>
          <button type="button" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</button>
        </div>
        <div>{item.line_total.formatted_with_symbol}</div>
      </div>
      <button 
        type="button"
        onClick={handleRemoveFromCart}
      >
        Remove
      </button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;