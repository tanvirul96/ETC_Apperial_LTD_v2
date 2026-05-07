function loadHeader() {
    const headerHtml = `
<header class="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-white/80 backdrop-blur-md border-b border-outline-variant/10">
    <nav class="container mx-auto px-6 md:px-16 h-24 flex items-center justify-between">
        <div class="flex items-center gap-12">
            <a href="/frontend/index.html" class="font-headline text-2xl md:text-3xl font-black text-primary tracking-tighter">ETC.</a>
            <div class="hidden lg:flex items-center gap-8">
                <a href="/frontend/index.html" class="nav-link font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Home</a>
                <a href="/frontend/shop/all-products.html" class="nav-link font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Collections</a>
                <a href="/frontend/company/about-us.html" class="nav-link font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Our Story</a>
                <a href="/frontend/company/management.html" class="nav-link font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Management</a>
                <a href="/frontend/company/contact-us.html" class="nav-link font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Contact</a>
                <a href="/frontend/company/news-and-events.html" class="nav-link font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">News</a>
            </div>
        </div>
        <div class="flex items-center gap-4 md:gap-8">
            <div class="hidden md:flex items-center gap-6">
                <a href="/frontend/account/sign-in.html" class="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Sign In</a>
                <a href="/frontend/account/create-account.html" class="editorial-gradient text-on-primary px-6 py-3 rounded-DEFAULT font-label text-[10px] uppercase tracking-widest shadow-sm hover:opacity-90 transition-all">Join Atelier</a>
            </div>
            <button class="relative group">
                <span class="material-symbols-outlined text-primary" data-icon="shopping_bag">shopping_bag</span>
                <span class="absolute -top-2 -right-2 w-4 h-4 bg-secondary text-on-secondary text-[8px] flex items-center justify-center rounded-full font-bold">0</span>
            </button>
            <button id="mobile-menu-toggle" class="lg:hidden p-2 text-primary">
                <span class="material-symbols-outlined">menu</span>
            </button>
        </div>
    </nav>
    
    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 bg-white z-[60] flex flex-col p-8 transition-transform duration-500 translate-x-full lg:hidden">
        <div class="flex justify-between items-center mb-12">
            <span class="font-headline text-2xl font-black text-primary tracking-tighter">ETC.</span>
            <button id="mobile-menu-close" class="p-2 text-primary">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <nav class="flex flex-col gap-8">
            <a href="/frontend/index.html" class="nav-link font-headline text-3xl font-bold text-primary">Home</a>
            <a href="/frontend/shop/all-products.html" class="nav-link font-headline text-3xl font-bold text-primary">Collections</a>
            <a href="/frontend/company/about-us.html" class="nav-link font-headline text-3xl font-bold text-primary">Our Story</a>
            <a href="/frontend/company/management.html" class="nav-link font-headline text-3xl font-bold text-primary">Management</a>
            <a href="/frontend/company/contact-us.html" class="nav-headline text-3xl font-bold text-primary">Contact</a>
            <a href="/frontend/company/news-and-events.html" class="nav-link font-headline text-3xl font-bold text-primary">News</a>
        </nav>
        <div class="mt-auto flex flex-col gap-4">
            <a href="/frontend/account/sign-in.html" class="w-full py-4 text-center border border-primary text-primary font-label text-xs uppercase tracking-widest font-bold">Sign In</a>
            <a href="/frontend/account/create-account.html" class="w-full py-4 text-center bg-primary text-white font-label text-xs uppercase tracking-widest font-bold">Join Atelier</a>
        </div>
    </div>
</header>
    `;

    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        placeholder.innerHTML = headerHtml;
        highlightActiveLink();
        initMobileMenu();
    }
}

function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const close = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');

    if (toggle && close && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.remove('translate-x-full');
        });
        close.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
        });
        
        // Close on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('translate-x-full');
            });
        });
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
