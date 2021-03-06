import React from 'react';
import CartItem from './CartItem.jsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Cart = ({ cart, onRemoveFromCart, onEmptyCart, onUpdateCartQty}) => {

    const handleEmptyCart = () => {
        onEmptyCart();
    }

    const renderEmptyMessage = () => {
        if (cart.total_unique_items > 0) {
            return;
        }
        return (
            <p> You have no items in your shopping cart, start adding some!</p>
        )
    }

    const renderItems = () => (
        cart.line_items.map((lineItem) => (
            <CartItem
                item={lineItem}
                key={lineItem.id}
                onUpdateCartQty={onUpdateCartQty}
                onRemoveFromCart={onRemoveFromCart}
            />
        ))
    )

    const renderTotal = () => (
        <div>
            <p>Subtotal:</p>
            <p>{cart.subtotal.formatted_with_symbol}</p>
        </div>
    )

    return (
        <div id='cart'>
            <h4>Your Shopping Cart</h4>
            {renderEmptyMessage()}
            {renderItems()}
            <button onClick={handleEmptyCart}>Empty Cart</button>
            {renderTotal()}
            <div>
                <button onClick={handleEmptyCart}>Empty Cart</button>
                <Link to='/checkout'>
                    Checkout
                </Link>
            </div>
        </div>
    )
}

Cart.propTypes = {
    cart: PropTypes.object,
    onEmptyCart: () => {},
};

export default Cart