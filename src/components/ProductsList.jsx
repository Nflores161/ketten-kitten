import React from 'react'
import ProductItem from './ProductItem';
import PropTypes from 'prop-types';

const ProductsList = ({ products, onAddToCart }) => {
//destructure the map function below

  return (
    <div>
      {products.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        )
      })}
    </div>
  )
}

ProductsList.propTypes = {
  products: PropTypes.array,
};

export default ProductsList