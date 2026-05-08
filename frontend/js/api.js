// api.js — Centralized API handler for ETC Apparel

const API_BASE_URL = 'http://localhost:5000/api';

/** Get headers with authorization token */
function getHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

/** Fetch dashboard statistics */
async function fetchDashboardStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/stats`, { headers: getHeaders() });
        if (!response.ok) throw new Error('Failed to fetch stats');
        return await response.json();
    } catch (error) {
        console.error('Error fetching stats:', error);
        return null;
    }
}

/** Fetch all products */
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, { headers: getHeaders() });
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

/** Create a new product */
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

/** Update a product */
async function updateProduct(id, productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error('Failed to update product');
        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
}

/** Delete a product */
async function deleteProduct(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete product');
        return await response.json();
    } catch (error) {
        console.error('Error deleting product:', error);
        return null;
    }
}

/** Fetch all orders */
async function fetchOrders() {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, { headers: getHeaders() });
        if (!response.ok) throw new Error('Failed to fetch orders');
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

/** Create a new order */
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

/** Update order status */
async function updateOrderStatus(id, status) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ status })
        });
        if (!response.ok) throw new Error('Failed to update order status');
        return await response.json();
    } catch (error) {
        console.error('Error updating order status:', error);
        return null;
    }
}

/** Fetch all news entries */
async function fetchNews() {
    try {
        const response = await fetch(`${API_BASE_URL}/news`, { headers: getHeaders() });
        if (!response.ok) throw new Error('Failed to fetch news');
        return await response.json();
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

/** Create a new news entry */
async function createNews(newsData) {
    try {
        const response = await fetch(`${API_BASE_URL}/news`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(newsData)
        });
        if (!response.ok) throw new Error('Failed to create news');
        return await response.json();
    } catch (error) {
        console.error('Error creating news:', error);
        return null;
    }
}

/** Update a news entry */
async function updateNews(id, newsData) {
    try {
        const response = await fetch(`${API_BASE_URL}/news/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(newsData)
        });
        if (!response.ok) throw new Error('Failed to update news');
        return await response.json();
    } catch (error) {
        console.error('Error updating news:', error);
        return null;
    }
}

/** Delete a news entry */
async function deleteNews(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/news/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete news');
        return await response.json();
    } catch (error) {
        console.error('Error deleting news:', error);
        return null;
    }
}

/** === Cart Utilities (localStorage) === */
function getCart() {
    return JSON.parse(localStorage.getItem('etc_cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('etc_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
}

function addToCartLocal(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart(cart);
    showToast(`"${product.name}" added to your bag!`, 'success');
}

function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
}

function getCartCount() {
    return getCart().reduce((total, item) => total + (item.qty || 1), 0);
}

/** === Toast Notification System === */
function showToast(message, type = 'info') {
    // Remove existing toast
    const existing = document.getElementById('etc-toast');
    if (existing) existing.remove();

    const colors = {
        success: 'bg-emerald-600',
        error: 'bg-red-600',
        info: 'bg-[#171e29]',
        warning: 'bg-amber-600'
    };

    const toast = document.createElement('div');
    toast.id = 'etc-toast';
    toast.className = `fixed bottom-6 right-6 z-[999] ${colors[type] || colors.info} text-white px-6 py-4 rounded-lg shadow-2xl font-label text-sm font-medium flex items-center gap-3 transition-all duration-500 translate-y-20 opacity-0`;
    toast.style.maxWidth = '380px';

    const icons = { success: 'check_circle', error: 'error', info: 'info', warning: 'warning' };
    toast.innerHTML = `<span class="material-symbols-outlined text-lg" style="font-variation-settings:'FILL' 1;">${icons[type] || 'info'}</span><span>${message}</span>`;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Animate out
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 3500);
}

/** Export CSV utility */
function exportToCSV(data, filename) {
    if (!data || data.length === 0) { showToast('No data to export.', 'warning'); return; }
    const headers = Object.keys(data[0]);
    const rows = data.map(row => headers.map(h => `"${(row[h] ?? '').toString().replace(/"/g, '""')}"`).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'export.csv';
    a.click();
    URL.revokeObjectURL(url);
}
