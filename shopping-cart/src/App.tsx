import React, {useState} from 'react';
import {useQuery} from 'react-query'

import Item from './Item/Item'
import { Drawer, LinearProgress, Grid, Badge } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import { Container } from './App.styles';

export type CartItemType = {
  id: number;
  category: string;
  desc: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

//Fetches data from FakeStore API
const getProducts = async(): Promise<CartItemType[]> => await(await fetch('https://fakestoreapi.com/products')).json();


const App = () => {
  const {data, isLoading, isError} = useQuery<CartItemType[]>('products', getProducts)

  const getTotalItems = () => null;
  
  const handleAddtoCart = (clickedItem: CartItemType) => null;

  const handleRemovetoCart = () => null;

  if(isLoading){
    return <LinearProgress/>
  }
  if(isError){
    return <div>Something went wrong...</div>
  }
    

  return (
    <Container>
      <Grid container spacing={3}>
        {
          data?.map(item=>(
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddtoCart}/>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

export default App;
