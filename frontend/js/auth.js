// auth.js
// Handles frontend authentication logic

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Perform login and handle redirection
 * @param {string} email 
 * @param {string} password 
 */
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save token and role
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect based on role
            if (data.user.role === 'admin') {
                window.location.href = '/admin/dashboard.html';
            } else {
                window.location.href = '/index.html'; // Or account page
            }
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Make sure the backend server is running.');
    }
}

/**
 * Perform registration and handle redirection
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 */
async function registerUser(name, email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! Please sign in.');
            window.location.href = '/account/sign-in.html';
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration.');
    }
}

/**
 * Protect admin routes
 * Call this on every admin page load
 */
function protectAdminRoute() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
        window.location.href = '/account/sign-in.html';
    }
}

/**
 * Logout user
 */
function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    window.location.href = '/index.html';
}
