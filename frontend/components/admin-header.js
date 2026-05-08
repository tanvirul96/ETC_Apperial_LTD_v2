function loadAdminHeader() {
    const adminHeaderHtml = `
<header class="lg:ml-64 h-24 flex items-center justify-between px-4 lg:px-8 bg-surface border-b border-outline-variant/10 z-40 sticky top-0">
    <div class="flex items-center space-x-4">
        <button onclick="toggleAdminSidebar(true)" class="lg:hidden p-2 hover:bg-surface-container-low rounded-lg transition-colors">
            <span class="material-symbols-outlined">menu</span>
        </button>
        <div class="hidden md:flex items-center space-x-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/10 w-96">
            <span class="material-symbols-outlined text-outline-variant text-sm">search</span>
            <input type="text" placeholder="Search curated data..." class="bg-transparent border-none focus:ring-0 text-sm font-label w-full">
        </div>
    </div>
    <div class="flex items-center space-x-6">
        <div class="relative group">
            <button class="p-2 hover:bg-surface-container-low rounded-lg transition-colors relative">
                <span class="material-symbols-outlined">notifications</span>
                <span class="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-surface"></span>
            </button>
        </div>
        <div class="h-10 w-[1px] bg-outline-variant/20"></div>
        <div class="flex items-center space-x-3">
            <div class="hidden sm:block text-right">
                <p class="text-xs font-bold font-label text-primary">Admin User</p>
                <p class="text-[10px] font-label text-outline-variant uppercase tracking-widest">Master Curator</p>
            </div>
            <div class="w-10 h-10 rounded-full editorial-gradient flex items-center justify-center text-white font-bold text-sm">A</div>
        </div>
        <button onclick="logoutUser()" class="p-2 text-outline-variant hover:text-secondary transition-colors" title="Sign Out">
            <span class="material-symbols-outlined">logout</span>
        </button>
    </div>
</header>
    `;

    const placeholder = document.getElementById('admin-header-placeholder');
    if (placeholder) {
        placeholder.innerHTML = adminHeaderHtml;
    }
}

// Auto-load
if (document.getElementById('admin-header-placeholder')) {
    loadAdminHeader();
}
