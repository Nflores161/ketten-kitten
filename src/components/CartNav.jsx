import React, { useState } from 'react'
import Cart from './Cart'


const CartNav = ({ cart, onRemoveFromCart, onUpdateCartQty, onEmptyCart }) => {
    const [isCartVisible, setCartVisible] = useState(false)

    const renderOpenButton = () => (
        //fontawesome "shopping-bag" icon goes here
        <button>
            {cart !== null ? <span>{cart.total_items}</span> : ''}
        </button>
    )

    const renderCloseButton = () => (
        //font awesome "times" icon goes here
        <button>
            Close Cart
        </button>
    )


    return (
        <div>
            <h1>Cart Nav</h1>
            <div onClick={() => setCartVisible(!isCartVisible)}>
                {!isCartVisible ? renderOpenButton() : renderCloseButton()}
            </div>
            {isCartVisible &&
                <Cart
                    cart={cart}
                    onUpdateCartQty={onUpdateCartQty}
                    onRemoveFromCart={onRemoveFromCart}
                    onEmptyCart={onEmptyCart}
                />
            }
        </div>
    )
}

export default CartNav