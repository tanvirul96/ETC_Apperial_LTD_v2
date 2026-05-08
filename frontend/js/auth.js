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
            // Save token and user info
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role);
            localStorage.setItem('user', JSON.stringify(data.user));

            showToast('Welcome back, ' + data.user.name.split(' ')[0] + '!', 'success');
            
            // Redirect to homepage
            setTimeout(() => {
                window.location.href = '/frontend/index.html';
            }, 1000);
        } else {
            showToast(data.message || 'Login failed. Please check your credentials.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast('Unable to connect to server. Is the backend running?', 'error');
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
            showToast('Registration successful! Redirecting to sign in...', 'success');
            setTimeout(() => {
                window.location.href = '/frontend/account/sign-in.html';
            }, 2000);
        } else {
            showToast(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showToast('An error occurred during registration.', 'error');
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
        window.location.href = '/frontend/account/sign-in.html';
    }
}

/**
 * Logout user
 */
function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    showToast('Signed out successfully.', 'info');
    setTimeout(() => {
        window.location.href = '/frontend/index.html';
    }, 800);
}
