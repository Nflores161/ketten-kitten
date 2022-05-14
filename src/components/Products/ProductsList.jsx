import React from 'react'
import ProductItem from '../Products/ProductItem'
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/system";

const theme = createTheme({
  content: {
    flexGrow: 1,
  },
    root: {
      flexGrow: 1,
    }
})

const ProductsList = ({ products, onAddToCart }) => {

if (!products.length) return <p>Loading...</p>;

return (
  <ThemeProvider theme={theme}>
    <div/>
    <Grid container justify="center" spacing={4}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
          <ProductItem product={product} onAddToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  </ThemeProvider>
);
};


export default ProductsList