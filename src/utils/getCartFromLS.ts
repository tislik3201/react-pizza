import { TCartItem } from './../redux/slices/cartSlice';
import { calcTotalPrice } from './caltTotalPrice';
export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(items)

        return {
            items: items as TCartItem[],
            totalPrice
        }
}