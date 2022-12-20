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
  
  const handleAddtoCart = (clickedItem: CartItemType) => {
    //Since we use the setters, We can access the previous state through 'prev'
    setCartItems(prev => {
      //Checks whether item is already in the cart
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if(isItemInCart){
        return prev.map(item=>(
          item.id === clickedItem.id 
            ? {...item, amount: item.amount + 1} 
            : item
        ))
      }

      //First time item is added to the cart
      return [...prev, {...clickedItem, amount: 1}]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => 
      prev.reduce((ack, item) =>{
        if(item.id === id){
          if(item.amount === 1){
            return ack;
          }
          return [...ack, {...item, amount: item.amount - 1}]
        }
        else{
          return [...ack, item]
        }
      }, [] as CartItemType[]) 
    );
  };

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
