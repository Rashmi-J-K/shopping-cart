// screens/ShoppingCart.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
import { Product } from './types'; 

interface ShoppingCartScreenProps {
  route: any; // Route prop for accessing navigation params
}

const ShoppingCart: React.FC<ShoppingCartScreenProps> = ({ route }) => {
  const { product } = route.params;

  // State to manage the cart items
  const [cart, setCart] = useState<Product[]>([]);

  // useEffect to update cart when a product is added
  useEffect(() => {
    if (product) {
      handleAddToCart(product);
    }
  }, [product]);

  const handleAddToCart = (product: Product) => {
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };    

    function calculateTotalPrice(): React.ReactNode {
        throw new Error('Function not implemented.');
    }

  // Add other cart-related functions as needed

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Shopping Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // Render each item in the cart using a separate component or JSX
          <View key={item.id} style={styles.cartProductItem}>
            {/* ... Render cart item details ... */}
          </View>
        )}
      />
      <Text style={styles.cartTotal}>Total Price: ${calculateTotalPrice()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles for ShoppingCart page
  // ...
  container: {
    marginTop: 16,
    padding: 16,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cartProductItem: {
    marginBottom: 16,
    borderWidth: 1,
    padding: 8,
  },
  cartProductImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDescription: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    marginBottom: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  quantityButton: {
    backgroundColor: '#DDDDDD',
    padding: 8,
    marginHorizontal: 4,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default ShoppingCart;


