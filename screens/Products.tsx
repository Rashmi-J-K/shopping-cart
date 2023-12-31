// screens/Products.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product } from './types';

interface ProductsProps {
  navigation: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    padding: 8,
  },
  productListVertical: {
    flex: 1,
  },
  productListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productItem: {
    width: 200,
    marginRight: 16,
    marginBottom: 16,
    borderWidth: 1,
    padding: 8,
  },
  productImage: {
    width: '100%',
    height: 120,
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
  selectedProductContainer: {
    alignItems: 'center',
  },
  cartContainer: {
    marginTop: 16,
    width: 200,
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

const products: Product[] = [
  // Product data remains unchanged
  {
    id: 1,
    name: 'Product1',
    description: 'Description of Product 1',
    image: 'https://tse4.mm.bing.net/th?id=OIP.a0HGVmwS1CoY3YBFqpcQJQHaE8&pid=Api&P=0&h=220',
    price: 20.99,
    quantity: 1,
},
{
    id: 2,
    name: 'Product2',
    description: 'Description of Product 2',
    image: 'https://tse3.mm.bing.net/th?id=OIP.qervQhFDZGWPMGtW8phx9wHaE8&pid=Api&P=0&h=220',
    price: 30.49,
    quantity: 1,
},
{
    id: 3,
    name: 'Product3',
    description: 'Description of Product 3',
    image: 'https://tse3.mm.bing.net/th?id=OIP.FH6iyTAw3ZPg7Pv5cGxj_AHaE8&pid=Api&P=0&h=220',
    price: 15.99,
    quantity: 1,
},
{
    id: 4,
    name: 'Product4',
    description: 'Description of Product 4',
    image: 'https://tse3.mm.bing.net/th?id=OIP.9w6oNcvn4y8qpqBIWBQk0QHaE8&pid=Api&P=0&h=220',
    price: 25.99,
    quantity: 1,
},
{
    id: 5,
    name: 'Product5',
    description: 'Description of Product 5',
    image: 'https://tse2.mm.bing.net/th?id=OIP.H7euLSy8SxmRKSOCI9sgnAHaEo&pid=Api&P=0&h=220',
    price: 25.99,
    quantity: 1,
},
{
    id: 6,
    name: 'Product6',
    description: 'Description of Product 6',
    image: 'https://tse3.mm.bing.net/th?id=OIP.9w6oNcvn4y8qpqBIWBQk0QHaE8&pid=Api&P=0&h=220',
    price: 25.99,
    quantity: 1,
},
];

const Products: React.FC<ProductsProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSearch = () => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSelectedProduct(results.length > 0 ? results[0] : null);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      <ScrollView style={styles.productListVertical}>
        <Text style={styles.productListTitle}>Products</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.productItem} onPress={() => handleProductSelect(item)}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>Price: ${item.price.toFixed(2)}</Text>
              <Button title="Add to Cart" onPress={() => navigation.navigate('ShoppingCart', { product: item })} />
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>

      <View style={styles.selectedProductContainer}>
        {selectedProduct ? (
          <>
            <Image source={{ uri: selectedProduct.image }} style={styles.productImage} />
            <Text style={styles.productName}>{selectedProduct.name}</Text>
            <Text style={styles.productDescription}>{selectedProduct.description}</Text>
            <Text style={styles.productPrice}>Price: ${selectedProduct.price.toFixed(2)}</Text>
          </>
        ) : (
          <Text>No product selected</Text>
        )}
      </View>
    </View>
  );
};

export default Products;
