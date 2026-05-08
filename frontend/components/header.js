function loadHeader() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const isLoggedIn = !!localStorage.getItem('token');
    const cartCount = typeof getCartCount === 'function' ? getCartCount() : 0;

    const isAdmin = localStorage.getItem('role') === 'admin';
    const authLinks = isLoggedIn ? `
        ${isAdmin ? '<a href="/frontend/admin/dashboard.html" class="font-label text-[10px] uppercase tracking-[0.3em] text-secondary hover:text-primary transition-all font-bold">Admin Panel</a>' : ''}
        <a href="/frontend/account/my-account.html" class="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">${user ? user.name.split(' ')[0] : 'Account'}</a>
        <button onclick="logoutUser()" class="editorial-gradient text-on-primary px-6 py-3 rounded-DEFAULT font-label text-[10px] uppercase tracking-widest shadow-sm hover:opacity-90 transition-all">Sign Out</button>
    ` : `
        <a href="/frontend/account/sign-in.html" class="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-secondary transition-all">Sign In</a>
        <a href="/frontend/account/create-account.html" class="editorial-gradient text-on-primary px-6 py-3 rounded-DEFAULT font-label text-[10px] uppercase tracking-widest shadow-sm hover:opacity-90 transition-all">Join Atelier</a>
    `;

    const mobileAuthLinks = isLoggedIn ? `
        ${isAdmin ? '<a href="/frontend/admin/dashboard.html" class="w-full py-4 text-center border border-secondary text-secondary font-label text-xs uppercase tracking-widest font-bold">Admin Panel</a>' : ''}
        <a href="/frontend/account/my-account.html" class="w-full py-4 text-center border border-primary text-primary font-label text-xs uppercase tracking-widest font-bold">My Account</a>
        <button onclick="logoutUser()" class="w-full py-4 text-center bg-primary text-white font-label text-xs uppercase tracking-widest font-bold">Sign Out</button>
    ` : `
        <a href="/frontend/account/sign-in.html" class="w-full py-4 text-center border border-primary text-primary font-label text-xs uppercase tracking-widest font-bold">Sign In</a>
        <a href="/frontend/account/create-account.html" class="w-full py-4 text-center bg-primary text-white font-label text-xs uppercase tracking-widest font-bold">Join Atelier</a>
    `;

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
                ${authLinks}
            </div>
            <button id="cart-btn" onclick="toggleCart()" class="relative group">
                <span class="material-symbols-outlined text-primary">shopping_bag</span>
                <span id="cart-count-badge" class="absolute -top-2 -right-2 w-4 h-4 bg-secondary text-on-secondary text-[8px] flex items-center justify-center rounded-full font-bold">${cartCount}</span>
            </button>
            <button id="mobile-menu-toggle" class="lg:hidden p-2 text-primary">
                <span class="material-symbols-outlined">menu</span>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu -->
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
            <a href="/frontend/company/contact-us.html" class="font-headline text-3xl font-bold text-primary">Contact</a>
            <a href="/frontend/company/news-and-events.html" class="nav-link font-headline text-3xl font-bold text-primary">News</a>
        </nav>
        <div class="mt-auto flex flex-col gap-4">
            ${mobileAuthLinks}
        </div>
    </div>

    <!-- Mini Cart Panel -->
    <div id="cart-panel" class="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[70] transform translate-x-full transition-transform duration-500 flex flex-col">
        <div class="p-8 border-b border-outline-variant/10 flex justify-between items-center">
            <h3 class="font-headline text-xl font-bold text-primary">Your Bag</h3>
            <button onclick="toggleCart()" class="text-on-surface-variant hover:text-primary transition-colors">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <div id="cart-items" class="flex-grow overflow-y-auto p-8 space-y-6"></div>
        <div class="p-8 border-t border-outline-variant/10">
            <div class="flex justify-between items-center mb-6">
                <span class="font-label text-xs uppercase tracking-widest text-on-surface-variant">Subtotal</span>
                <span id="cart-total" class="font-headline text-xl font-bold text-primary">$0.00</span>
            </div>
            <a href="/frontend/shop/all-products.html" class="block w-full editorial-gradient text-on-primary py-4 text-center font-label text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity rounded-lg">View All Collections</a>
        </div>
    </div>
    <div id="cart-overlay" onclick="toggleCart()" class="fixed inset-0 bg-black/40 z-[65] hidden"></div>
</header>
    `;

    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        placeholder.innerHTML = headerHtml;
        highlightActiveLink();
        initMobileMenu();
        updateCartBadge();
    }
}

function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const close = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');

    if (toggle && close && menu) {
        toggle.addEventListener('click', () => menu.classList.remove('translate-x-full'));
        close.addEventListener('click', () => menu.classList.add('translate-x-full'));
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => menu.classList.add('translate-x-full'));
        });
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.endsWith(currentPath) && href !== '#') {
            link.classList.add('text-secondary', 'font-bold');
            link.classList.remove('text-on-surface-variant');
        }
    });
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count-badge');
    if (badge) {
        const count = typeof getCartCount === 'function' ? getCartCount() : 0;
        badge.textContent = count;
        badge.style.display = count === 0 ? 'none' : 'flex';
    }
}

function toggleCart() {
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');
    if (!panel) return;

    const isOpen = !panel.classList.contains('translate-x-full');
    if (isOpen) {
        panel.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    } else {
        renderCartItems();
        panel.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!container) return;

    const cart = typeof getCart === 'function' ? getCart() : [];
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center py-12">
                <span class="material-symbols-outlined text-5xl text-outline-variant mb-4">shopping_bag</span>
                <p class="font-headline text-lg text-on-surface-variant">Your bag is empty.</p>
                <a href="/frontend/shop/all-products.html" class="mt-6 text-secondary font-label text-xs uppercase tracking-widest hover:underline">Browse Collections</a>
            </div>`;
        if (totalEl) totalEl.textContent = '$0.00';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        const price = parseFloat(item.price) || 0;
        const qty = item.qty || 1;
        total += price * qty;
        return `
            <div class="flex gap-4 items-center group">
                <div class="w-16 h-20 bg-surface-container-low rounded overflow-hidden flex-shrink-0">
                    <img src="${item.image_url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80'}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-grow">
                    <p class="font-bold text-sm text-primary leading-tight">${item.name}</p>
                    <p class="text-xs text-on-surface-variant font-label mt-1">${item.category || ''}</p>
                    <div class="flex items-center justify-between mt-2">
                        <span class="font-headline font-bold text-secondary">$${price.toFixed(2)}</span>
                        <span class="font-label text-xs text-on-surface-variant">x${qty}</span>
                    </div>
                </div>
                <button onclick="removeFromCart('${item.id}'); renderCartItems(); updateCartBadge();" class="text-outline-variant hover:text-error transition-colors flex-shrink-0">
                    <span class="material-symbols-outlined text-sm">delete</span>
                </button>
            </div>`;
    }).join('');

    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Listen for cart updates
window.addEventListener('cartUpdated', updateCartBadge);
