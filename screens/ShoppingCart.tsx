// screens/ShoppingCart.tsx
import React from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';

export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
  }
  

interface ShoppingCartProps {
  cart: Product[];
  onDelete: (productId: number) => void;
  onIncreaseQuantity: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
  total: string;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cart,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
  total,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Shopping Cart</Text>
      {cart.map((cartProduct) => (
        <View key={cartProduct.id} style={styles.cartProductItem}>
          <Image source={{ uri: cartProduct.image }} style={styles.cartProductImage} />
          <Text style={styles.productName}>{cartProduct.name}</Text>
          <Text style={styles.productDescription}>{cartProduct.description}</Text>
          <Text style={styles.productPrice}>Price: ${cartProduct.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <Button title="-" onPress={() => onDecreaseQuantity(cartProduct.id)} />
            <Text style={styles.quantityText}>{cartProduct.quantity}</Text>
            <Button title="+" onPress={() => onIncreaseQuantity(cartProduct.id)} />
          </View>
          <Button title="Delete" onPress={() => onDelete(cartProduct.id)} />
        </View>
      ))}
      <Text style={styles.cartTotal}>Total Price: ${total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
