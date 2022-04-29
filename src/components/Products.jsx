import React from 'react'
import ProductCard from './ProductCard'
// import { commerce } from '../lib/commerce'

const Products = ({ products }) => {



  return (
    <div>
      {products.map(product => {
      return(
        <ProductCard 
        key={product.id}
        name={product.name}
        description={product.description}
        price={product.price.formatted_with_symbol}
        image={product.image.url}
        checkout={product.checkout_url.checkout}
        products={products}
        />
      )
    })}

    </div>
  )
}

export default Products