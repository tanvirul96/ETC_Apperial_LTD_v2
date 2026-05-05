function loadAdminSidebar() {
    const sidebarHtml = `
<aside class="h-screen w-64 fixed left-0 top-0 z-50 bg-[#f8f3ef] dark:bg-slate-900 shadow-[40px_0_60px_-15px_rgba(23,30,41,0.06)] flex flex-col p-6 space-y-8">
    <div class="mb-4 flex items-center justify-between">
        <div>
            <span class="font-serif text-xl font-bold uppercase tracking-widest text-[#171e29] dark:text-white">Atelier Admin</span>
            <p class="text-[10px] text-outline font-label tracking-widest uppercase mt-1">Premium Management</p>
        </div>
    </div>
    <nav class="flex-1 space-y-2">
        <a class="admin-nav-link flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all hover:bg-[#e6e2de] dark:hover:bg-slate-800 rounded-lg scale-[0.99] active:scale-95" href="/admin/dashboard.html">
            <span class="material-symbols-outlined">dashboard</span>
            <span class="font-label text-sm">Dashboard</span>
        </a>
        <a class="admin-nav-link flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all hover:bg-[#e6e2de] dark:hover:bg-slate-800 rounded-lg scale-[0.99] active:scale-95" href="/admin/inventory.html">
            <span class="material-symbols-outlined">inventory_2</span>
            <span class="font-label text-sm">Inventory</span>
        </a>
        <a class="admin-nav-link flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all hover:bg-[#e6e2de] dark:hover:bg-slate-800 rounded-lg scale-[0.99] active:scale-95" href="/admin/orders.html">
            <span class="material-symbols-outlined">shopping_bag</span>
            <span class="font-label text-sm">Orders</span>
        </a>
        <a class="admin-nav-link flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all hover:bg-[#e6e2de] dark:hover:bg-slate-800 rounded-lg scale-[0.99] active:scale-95" href="/admin/news.html">
            <span class="material-symbols-outlined">newspaper</span>
            <span class="font-label text-sm">News & Events</span>
        </a>
        <a class="admin-nav-link flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all hover:bg-[#e6e2de] dark:hover:bg-slate-800 rounded-lg scale-[0.99] active:scale-95" href="/admin/analytics.html">
            <span class="material-symbols-outlined">insights</span>
            <span class="font-label text-sm">Analytics</span>
        </a>
    </nav>
    <div class="pt-6 mt-6 border-t border-outline-variant/15 space-y-2">
        <a class="flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all" href="/index.html">
            <span class="material-symbols-outlined">exit_to_app</span>
            <span class="font-label text-sm">Back to Store</span>
        </a>
        <a class="flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all" href="#">
            <span class="material-symbols-outlined">settings</span>
            <span class="font-label text-sm">Settings</span>
        </a>
    </div>
</aside>
    `;

    const placeholder = document.getElementById('admin-sidebar-placeholder');
    if (placeholder) {
        placeholder.innerHTML = sidebarHtml;

        // Highlight active link
        const currentPath = window.location.pathname.split('/').pop() || 'admin-dashboard.html';
        const links = placeholder.querySelectorAll('.admin-nav-link');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.endsWith(currentPath) || href === '/' + currentPath) && href !== '#') {
                // Remove inactive styles
                link.classList.remove('text-slate-500', 'dark:text-slate-400');
                // Add active styles
                link.classList.add('text-[#171e29]', 'dark:text-white', 'font-semibold', 'bg-[#e6e2de]', 'dark:bg-slate-800');
            }
        });
    }
}
