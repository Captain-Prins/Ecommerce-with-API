export function computeCartTotal(cartItems) {
    return `$ ${(cartItems / 100).toFixed(2)}`;
}