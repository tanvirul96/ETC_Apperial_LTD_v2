function loadHeader() {
    const headerHtml = `
<header class="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-white/80 backdrop-blur-md border-b border-outline-variant/10">
    <nav class="container mx-auto px-8 md:px-16 h-24 flex items-center justify-between">
        <div class="flex items-center gap-12">
            <a href="/frontend/index.html" class="font-headline text-3xl font-black text-primary tracking-tighter">ETC.</a>
            <div class="hidden lg:flex items-center gap-8">
                <a href="/frontend/index.html" class="nav-link font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Home</a>
                <a href="/frontend/all-products.html" class="nav-link font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Collections</a>
                <a href="/frontend/about-us.html" class="nav-link font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Our Story</a>
                <a href="/frontend/management.html" class="nav-link font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Management</a>
                <a href="/frontend/contact-us.html" class="nav-link font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Contact</a>
            </div>
        </div>
        <div class="flex items-center gap-8">
            <div class="hidden md:flex items-center gap-6">
                <a href="/frontend/account/sign-in.html" class="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Sign In</a>
                <a href="/frontend/account/create-account.html" class="editorial-gradient text-on-primary px-6 py-3 rounded-DEFAULT font-label text-[10px] uppercase tracking-widest shadow-sm hover:opacity-90 transition-all">Join Atelier</a>
            </div>
            <button class="relative group">
                <span class="material-symbols-outlined text-primary" data-icon="shopping_bag">shopping_bag</span>
                <span class="absolute -top-2 -right-2 w-4 h-4 bg-secondary text-on-secondary text-[8px] flex items-center justify-center rounded-full font-bold">0</span>
            </button>
        </div>
    </nav>
</header>
    `;

    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        placeholder.innerHTML = headerHtml;
        highlightActiveLink();
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.endsWith(currentPath) || href === '/' + currentPath) && href !== '#') {
            link.classList.add('text-secondary', 'font-bold');
            link.classList.remove('text-on-surface-variant');
        }
    });
}

// Auto-load
if (document.getElementById('header-placeholder')) {
    loadHeader();
}
