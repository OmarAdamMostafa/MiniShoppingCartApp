import CartItem from "../CartItem/CartItem";
import { Container } from "./Cart.styles"; 
import { CartItemType } from "../App";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart}) =>{
    return (
        <Container>
            <h2>Shopping Cart</h2>
            {
                cartItems.length === 0 ? <p>No Items in Cart</p> : null
            }
            {
                cartItems.map(item => (
                    <CartItem 
                        key={item.id} 
                        item={item} 
                        addToCart={addToCart} 
                        removeFromCart={removeFromCart}
                    />
                ))
            }
        </Container>
    )
}

export default Cart;