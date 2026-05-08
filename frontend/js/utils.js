// utils.js — Shared UI utilities for ETC Apparel admin & storefront

/**
 * Show a toast notification
 * @param {string} message - The text to display
 * @param {'success'|'error'|'info'|'warning'} type - Toast style
 * @param {number} duration - Duration in ms (default 3500)
 */
function showToast(message, type = 'info', duration = 3500) {
    // Remove any existing toast
    const existing = document.getElementById('etc-toast');
    if (existing) existing.remove();

    const colors = {
        success: 'bg-emerald-50 border-emerald-500 text-emerald-900',
        error:   'bg-red-50 border-red-500 text-red-900',
        warning: 'bg-amber-50 border-amber-500 text-amber-900',
        info:    'bg-blue-50 border-blue-500 text-blue-900',
    };
    const icons = {
        success: 'check_circle',
        error:   'cancel',
        warning: 'warning',
        info:    'info',
    };
    const iconColors = {
        success: 'text-emerald-600',
        error:   'text-red-600',
        warning: 'text-amber-600',
        info:    'text-blue-600',
    };

    const toast = document.createElement('div');
    toast.id = 'etc-toast';
    toast.className = `fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-xl border-l-4 shadow-2xl transition-all duration-500 max-w-sm ${colors[type] || colors.info}`;
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    toast.innerHTML = `
        <span class="material-symbols-outlined ${iconColors[type] || ''}" style="font-variation-settings:'FILL' 1;">${icons[type] || 'info'}</span>
        <p class="text-sm font-semibold leading-snug flex-1">${message}</p>
        <button onclick="this.parentElement.remove()" class="text-current opacity-40 hover:opacity-100 ml-2">
            <span class="material-symbols-outlined text-base">close</span>
        </button>
    `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });
    });

    // Auto-remove
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

/**
 * Export an array of objects to a CSV file download
 * @param {Object[]} data - Array of row objects
 * @param {string} filename - Output filename
 */
function exportToCSV(data, filename = 'export.csv') {
    if (!data || !data.length) {
        showToast('No data to export.', 'warning');
        return;
    }
    const headers = Object.keys(data[0]);
    const rows = data.map(row =>
        headers.map(h => {
            const val = String(row[h] ?? '').replace(/"/g, '""');
            return `"${val}"`;
        }).join(',')
    );
    const csv = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Format a number as currency
 * @param {number} amount
 * @param {string} currency
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

/**
 * Debounce a function
 */
function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
