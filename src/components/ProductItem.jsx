import React from 'react'
import { stripHtml } from 'string-strip-html';
import PropTypes from 'prop-types';

const ProductItem = ({ product, onAddToCart }) => {

  const { result } = stripHtml(product.description);

  const handleAddToCart = () => { onAddToCart(product.id, 1) }


  return (
    <div id='product-item'>
      <div>
        <h2>{product.name}</h2>
      </div>
      <div>
        <img className="item-display" src={product.image?.url} alt={product.name} />
        <p>{result}</p>
      </div>
      <div>{product.price.formatted_with_symbol}</div>
      <button onClick={handleAddToCart}>Shop Now</button>
    </div>
  )
}

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem
