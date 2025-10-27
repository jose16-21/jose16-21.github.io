import React, { useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../../domain/entities/Cart';
import { Service } from '../../domain/entities/Service';
import { CartRepository } from '../../domain/repositories/CartRepository';
import { LocalStorageCartRepository } from '../../infrastructure/repositories/LocalStorageCartRepository';
import { AddToCartUseCase } from '../../domain/use-cases/AddToCartUseCase';
import { RemoveFromCartUseCase } from '../../domain/use-cases/RemoveFromCartUseCase';
import { CartContext } from '../hooks/useCart';

interface CartProviderProps {
  children: ReactNode;
  repository?: CartRepository;
}

export const CartProvider: React.FC<CartProviderProps> = ({ 
  children, 
  repository = new LocalStorageCartRepository() 
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCartUseCase = new AddToCartUseCase(repository);
  const removeFromCartUseCase = new RemoveFromCartUseCase(repository);

  useEffect(() => {
    const loadedItems = repository.getItems();
    setItems(loadedItems);
  }, [repository]);

  const addToCart = (product: Service, quantity: number = 1, customizations?: string) => {
    addToCartUseCase.execute(product, quantity, customizations);
    setItems(repository.getItems());
  };

  const removeFromCart = (productId: string) => {
    removeFromCartUseCase.execute(productId);
    setItems(repository.getItems());
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const currentItems = repository.getItems();
    const item = currentItems.find(item => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
        repository.saveItems(currentItems);
        setItems([...currentItems]);
      }
    }
  };

  const clearCart = () => {
    repository.clear();
    setItems([]);
  };

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + (item.product.price.amount * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      totalAmount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};
