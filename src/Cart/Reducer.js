export const initialState = {
    cart: []
};

const CartReducer = (state,action) =>{
    switch(action.type){
        case "ADD_TO_CART":
            return {...state, cart: [...state.cart, action.item]}

        case "REMOVE_FROM_CART":
            const index = state.cart.findIndex(
                (cartItem) => cartItem.id === action.id
            );
            let newCart = [...state.cart];
            if (index >= 0){
                newCart.splice(index, 1);
            } else{
                alert(`Can't remove product(id: ${action.id}). Not in cart!`);
            }
            return {...state, cart: newCart}

        case "EMPTY_CART":
            return {...state, cart: []}

        default:
            return state;
    }
}

export default CartReducer;