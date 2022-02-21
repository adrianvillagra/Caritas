import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const addItem = (item, quantity) => {
		if (isInCart(item.id)) {
			const newCart = cart.map((cartElement) => {
				if (cartElement.id === item.id) {
					return {
						...cartElement,
						quantity: parseInt(cartElement.quantity) + parseInt(quantity),
					};
				} else return cartElement;
			});
			setCart(newCart);
			saveCartInLocalStorage(newCart);
		} else {
			setCart((prev) => [...prev, { ...item, quantity: parseInt(quantity) }]);
			saveCartInLocalStorage([
				...cart,
				{ ...item, quantity: parseInt(quantity) },
			]);
		}
	};

	const reduceItem = (item, quantity) => {
		if (isInCart(item.id)) {
			const newCart = cart.map((cartElement) => {
				if (cartElement.id === item.id) {
					return {
						...cartElement,
						quantity: parseInt(cartElement.quantity - quantity),
					};
				} else return cartElement;
			});
			setCart(newCart);
			saveCartInLocalStorage(newCart);
		} else {
			setCart((prev) => [...prev, { ...item, quantity }]);
			saveCartInLocalStorage([
				...cart,
				{ ...item, quantity: parseInt(quantity) },
			]);
		}
	};

	const getAmountCart = () => {
		return cart.reduce((acc, item) => {
			return acc + item.quantity * item.price;
		}, 0);
	};

	const getQuantityByItem = (itemId) => {
		return cart.reduce((acc, item) => {
			if (item.id === itemId) {
				return acc + item.quantity;
			} else return acc;
		}, 0);
	};

	const isInCart = (itemId) => {
		return cart.some((item) => item.id === itemId);
	};

	const removeItem = (itemId) => {
		const newCart = cart.filter((item) => item.id !== itemId);
		setCart(newCart);
		saveCartInLocalStorage(newCart);
	};

	const clear = () => setCart([]);

	const saveCartInLocalStorage = async (data) => {
		localStorage.setItem('cart', JSON.stringify(data));
	};

	useEffect(() => {
		let data = JSON.parse(localStorage.getItem('cart'));
		if (data !== null) {
			setCart(data);
		}
	}, []);

	return (
		<CartContext.Provider
			value={{
				cart,
				reduceItem,
				addItem,
				isInCart,
				removeItem,
				clear,
				getQuantityByItem,
				getAmountCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
