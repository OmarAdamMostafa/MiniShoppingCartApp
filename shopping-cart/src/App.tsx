import React, {useState} from 'react';
import {useQuery} from 'react-query';
import Item from './Item/Item';
import Cart from './Cart/Cart';
import { Drawer, LinearProgress, Grid, Badge } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { Container, StyledButton } from './App.styles';

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
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[]) // const [cartItem, setCartItem] = useState<CartItemType[]>([]) works as well
  const {data, isLoading, isError} = useQuery<CartItemType[]>('products', getProducts)

  const getTotalItems = (cartItems: CartItemType[]) => cartItems.reduce((total:number, item) => total + item.amount, 0);
  
  const handleAddtoCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  if(isLoading){
    return <LinearProgress/>
  }
  if(isError){
    return <div>Something went wrong...</div>
  }
    

  return (
    <Container>
      <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)}>
        <Cart 
          cartItems={cartItems} 
          addToCart={handleAddtoCart} 
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={()=>setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart/>
        </Badge>
      </StyledButton>
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
