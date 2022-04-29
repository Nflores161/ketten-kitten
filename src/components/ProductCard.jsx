import React from 'react'

const ProductCard = ({ name, description, price, image, checkout }) => {
  return (
    <div>
      <div>
        <h2>{name}</h2>
      </div>
      <div>
        <img className="item-display" src={image} alt="good work" />
        <p>{description}</p>
      </div>
      <div>{price}</div>
      <button onClick={checkout}>Shop Now</button>

    </div>
  )
}

export default ProductCard



// key={product.id}
// name={product.name}
// description={product.description}
// price={product.price.formatted_with_symbol}
// image={product.image.url}
// checkout={product.checkout_url.checkout}
// products={products}