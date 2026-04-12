// src/components/ShoppingCart.jsx

import { useSelector, useDispatch } from 'react-redux'
import { updateQuantity, removeFromCart, clearCart } from '../redux/cartSlice'
import { selectCart, selectTotalCount, selectTotalPrice } from '../redux/selectors' 
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import OrderHistory from './OrderHistory';
import { auth } from '../firebaseConfig';


const ShoppingCart = () => {
    const dispatch = useDispatch();

    // Selectors (for totals)
    const cart = useSelector(selectCart);
    const totalCount = useSelector(selectTotalCount);
    const totalPrice = useSelector(selectTotalPrice);

    // Handle Checkout
    const handleCheckout = async () => {

        const order = {
            userId: auth.currentUser?.uid,
            createdAt: serverTimestamp(),
            product: cart,
            totalPrice
        }
        
        await addDoc(collection(db, 'orders'), order)       
        
        dispatch(clearCart())
        alert('order placed successfuly! Your cart has been cleared.')
    }

    

    return (
        <div className='shopping-cart-container'>



            <h2>Shopping Cart</h2>
           
           {!cart.length && <p>Your cart is empty</p>}
           

            {cart.map((item) => (
                
                <div 
                    key={item.id} 
                    className='cart-item-card'
                >

                    <h3>{item.title}</h3>
                    <img 
                        src={item.image}
                        alt={item.title}
                        width='100'
                    />

                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.count ?? 0}</p>

                    <div className='quantity-controls'>
                        <button 
                            onClick={() => 
                                dispatch(updateQuantity({ 
                                    id: item.id, 
                                    count: (item.count ?? 0) - 1 
                                }))
                            }
                        >
                            -
                        </button>
                        <span>{item.count}</span>
                        <button 
                            onClick={() => 
                                dispatch(updateQuantity({ 
                                    id: item.id, 
                                    count: (item.count ?? 0) + 1 
                                }))
                            }
                        >
                            +
                        </button>
                    </div>

                    <button onClick={() => dispatch(removeFromCart(item.id))}>
                        Remove
                    </button>

                </div>

            ))}

            <hr />

            <p><strong>Total Items:</strong> {totalCount}</p>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            <button onClick={handleCheckout}>Checkout</button>

            <hr />
            <OrderHistory />

        </div>
    )

}

export default ShoppingCart;