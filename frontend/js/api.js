// api.js
// Centralized API handler for ETC Apparel

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Get headers with authorization token
 */
function getHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

/**
 * Fetch dashboard statistics
 */
async function fetchDashboardStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/stats`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch stats');
        return await response.json();
    } catch (error) {
        console.error('Error fetching stats:', error);
        return null;
    }
}

/**
 * Fetch all products
 */
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}
/**
 * Create a new product
 */
async function createProduct(productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error('Failed to create product');
        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        return null;
    }
}

/**
 * Create a new order
 */
async function createOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(orderData)
        });
        if (!response.ok) throw new Error('Failed to create order');
        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        return null;
    }
}

/**
 * Fetch all orders
 */
async function fetchOrders() {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}
