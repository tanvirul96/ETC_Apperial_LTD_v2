// api.js — Centralized API handler for ETC Apparel
// Backend: Express + Supabase (PostgreSQL)

const API_BASE_URL = 'http://localhost:5000/api';

/** Get auth headers with JWT token */
function getHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────

async function loginUser(email, password) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return await res.json();
    } catch (err) {
        console.error('Login error:', err);
        return null;
    }
}

async function registerUser(name, email, password) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        return await res.json();
    } catch (err) {
        console.error('Register error:', err);
        return null;
    }
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

async function fetchProducts() {
    try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return await res.json();
    } catch (err) {
        console.error('Error fetching products:', err);
        return [];
    }
}

async function createProduct(productData) {
    try {
        const res = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(productData)
        });
        if (!res.ok) throw new Error('Failed to create product');
        return await res.json();
    } catch (err) {
        console.error('Error creating product:', err);
        return null;
    }
}

async function updateProduct(id, productData) {
    try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(productData)
        });
        if (!res.ok) throw new Error('Failed to update product');
        return await res.json();
    } catch (err) {
        console.error('Error updating product:', err);
        return null;
    }
}

async function deleteProduct(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!res.ok) throw new Error('Failed to delete product');
        return await res.json();
    } catch (err) {
        console.error('Error deleting product:', err);
        return null;
    }
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────

async function fetchOrders() {
    try {
        const res = await fetch(`${API_BASE_URL}/orders`, { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch orders');
        return await res.json();
    } catch (err) {
        console.error('Error fetching orders:', err);
        return [];
    }
}

async function createOrder(orderData) {
    try {
        const res = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(orderData)
        });
        if (!res.ok) throw new Error('Failed to create order');
        return await res.json();
    } catch (err) {
        console.error('Error creating order:', err);
        return null;
    }
}

async function updateOrderStatus(id, status) {
    try {
        const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error('Failed to update order status');
        return await res.json();
    } catch (err) {
        console.error('Error updating order status:', err);
        return null;
    }
}

async function deleteOrder(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!res.ok) throw new Error('Failed to delete order');
        return await res.json();
    } catch (err) {
        console.error('Error deleting order:', err);
        return null;
    }
}

// ─── NEWS ─────────────────────────────────────────────────────────────────────

async function fetchNews() {
    try {
        const res = await fetch(`${API_BASE_URL}/news`);
        if (!res.ok) throw new Error('Failed to fetch news');
        return await res.json();
    } catch (err) {
        console.error('Error fetching news:', err);
        return [];
    }
}

async function createNews(newsData) {
    try {
        const res = await fetch(`${API_BASE_URL}/news`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(newsData)
        });
        if (!res.ok) throw new Error('Failed to create news');
        return await res.json();
    } catch (err) {
        console.error('Error creating news:', err);
        return null;
    }
}

async function deleteNews(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/news/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!res.ok) throw new Error('Failed to delete news');
        return await res.json();
    } catch (err) {
        console.error('Error deleting news:', err);
        return null;
    }
}

// ─── DASHBOARD STATS ─────────────────────────────────────────────────────────

async function fetchDashboardStats() {
    try {
        const res = await fetch(`${API_BASE_URL}/stats`, { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch stats');
        return await res.json();
    } catch (err) {
        console.error('Error fetching stats:', err);
        return null;
    }
}
