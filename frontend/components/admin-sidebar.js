function loadAdminSidebar() {
    const sidebarHtml = `
<div id="admin-sidebar-overlay" class="fixed inset-0 bg-black/50 z-[90] hidden lg:hidden transition-opacity duration-300 opacity-0"></div>
<aside id="admin-sidebar" class="h-screen w-64 fixed left-0 top-0 z-[100] bg-[#f8f3ef] dark:bg-slate-900 shadow-[40px_0_60px_-15px_rgba(23,30,41,0.06)] flex flex-col p-6 space-y-8 overflow-y-auto no-scrollbar transition-transform duration-300 -translate-x-full lg:translate-x-0">
    <div class="mb-4 flex items-center justify-between">
        <div>
            <span class="font-serif text-xl font-bold uppercase tracking-widest text-[#171e29] dark:text-white">Atelier Admin</span>
            <p class="text-[10px] text-outline font-label tracking-widest uppercase mt-1">Premium Management</p>
        </div>
        <button id="close-sidebar" class="lg:hidden p-2 hover:bg-[#e6e2de] dark:hover:bg-slate-800 rounded-lg transition-colors">
            <span class="material-symbols-outlined">close</span>
        </button>
    </div>
    <nav class="flex-1 space-y-2">
        <a class="admin-nav-link flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all hover:bg-[#e6e2de] dark:hover:bg-slate-800 rounded-lg scale-[0.99] active:scale-95" href="/frontend/admin/dashboard.html">
            <span class="material-symbols-outlined">dashboard</span>
            <span class="font-label text-sm">Dashboard</span>
        </a>
        <a class="admin-nav-link flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all hover:bg-[#e6e2de] dark:hover:bg-slate-800 rounded-lg scale-[0.99] active:scale-95" href="/frontend/admin/inventory.html">
            <span class="material-symbols-outlined">inventory_2</span>
            <span class="font-label text-sm">Inventory</span>
        </a>
        <a class="admin-nav-link flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all hover:bg-[#e6e2de] dark:hover:bg-slate-800 rounded-lg scale-[0.99] active:scale-95" href="/frontend/admin/orders.html">
            <span class="material-symbols-outlined">shopping_bag</span>
            <span class="font-label text-sm">Orders</span>
        </a>
        <a class="admin-nav-link flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all hover:bg-[#e6e2de] dark:hover:bg-slate-800 rounded-lg scale-[0.99] active:scale-95" href="/frontend/admin/news.html">
            <span class="material-symbols-outlined">newspaper</span>
            <span class="font-label text-sm">News & Events</span>
        </a>
        <a class="admin-nav-link flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all hover:bg-[#e6e2de] dark:hover:bg-slate-800 rounded-lg scale-[0.99] active:scale-95" href="/frontend/admin/analytics.html">
            <span class="material-symbols-outlined">insights</span>
            <span class="font-label text-sm">Analytics</span>
        </a>
    </nav>
    <div class="pt-6 mt-6 border-t border-outline-variant/15 space-y-2">
        <a class="flex items-center space-x-3 text-slate-500 dark:text-slate-400 hover:text-[#171e29] px-4 py-3 transition-all" href="/frontend/index.html">
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
        const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
        const links = placeholder.querySelectorAll('.admin-nav-link');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.endsWith(currentPath) || href === '/' + currentPath) && href !== '#') {
                link.classList.remove('text-slate-500', 'dark:text-slate-400');
                link.classList.add('text-[#171e29]', 'dark:text-white', 'font-semibold', 'bg-[#e6e2de]', 'dark:bg-slate-800');
            }
        });

        // Toggle Logic
        window.toggleAdminSidebar = function(show) {
            const sidebar = document.getElementById('admin-sidebar');
            const overlay = document.getElementById('admin-sidebar-overlay');
            if (show) {
                sidebar.classList.remove('-translate-x-full');
                overlay.classList.remove('hidden');
                setTimeout(() => overlay.classList.add('opacity-100'), 10);
            } else {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.remove('opacity-100');
                setTimeout(() => overlay.classList.add('hidden'), 300);
            }
        };

        document.getElementById('close-sidebar').addEventListener('click', () => toggleAdminSidebar(false));
        document.getElementById('admin-sidebar-overlay').addEventListener('click', () => toggleAdminSidebar(false));
    }
}

// Auto-load
if (document.getElementById('admin-sidebar-placeholder')) {
    loadAdminSidebar();
}
