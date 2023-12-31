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

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
}

const products: Product[] = [
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

const Products: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<Product[]>([]);

    const handleSearch = () => {
        const results = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSelectedProduct(results.length > 0 ? results[0] : null);
    };


    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
    };

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

        setSelectedProduct(null);
    };

    const handleDeleteFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
    };

    const handleIncreaseQuantity = (productId: number) => {
        setCart((prevCart) =>
            prevCart.map((product) =>
                product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
            )
        );
    };

    const handleDecreaseQuantity = (productId: number) => {
        setCart((prevCart) =>
            prevCart.map((product) =>
                product.id === productId && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
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
                            <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
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
                        <Button title="Add to Cart" onPress={() => handleAddToCart(selectedProduct)} />
                    </>
                ) : (
                    <Text>No product selected</Text>
                )}
            </View>

            <View style={styles.cartContainer}>
                <Text style={styles.cartTitle}>Shopping Cart</Text>
                {cart.map((cartProduct) => (
                    <View key={cartProduct.id} style={styles.cartProductItem}>
                        <Image source={{ uri: cartProduct.image }} style={styles.cartProductImage} />
                        <Text style={styles.productName}>{cartProduct.name}</Text>
                        <Text style={styles.productDescription}>{cartProduct.description}</Text>
                        <Text style={styles.productPrice}>Price: ${cartProduct.price.toFixed(2)}</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => handleDecreaseQuantity(cartProduct.id)}
                            >
                                <Text>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{cartProduct.quantity}</Text>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => handleIncreaseQuantity(cartProduct.id)}
                            >
                                <Text>+</Text>
                            </TouchableOpacity>
                        </View>
                        <Button title="Delete" onPress={() => handleDeleteFromCart(cartProduct.id)} />
                    </View>
                ))}
                <Text style={styles.cartTotal}>Total Price: ${calculateTotalPrice()}</Text>
            </View>
        </View>
    );
};

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

export default Products;