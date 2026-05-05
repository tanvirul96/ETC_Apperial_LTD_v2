function loadHeader() {
  const headerHtml = `
<header class="fixed top-0 w-full z-50 bg-[#fef8f4]/95 backdrop-blur-xl border-b border-surface-variant/30">
<nav class="flex justify-between items-center w-full px-8 md:px-16 py-4 mx-auto">
<div class="flex items-center gap-12">
<a class="text-2xl font-black text-[#171e29] tracking-tighter font-headline" href="index.html">ETC Apparel</a>
<div class="hidden md:flex items-center gap-8 font-body font-medium tracking-tight text-sm">
<a class="nav-link text-[#171e29] hover:text-[#885203] transition-colors" href="/index.html">Home</a>
<a class="nav-link text-[#171e29] hover:text-[#885203] transition-colors" href="/company/about-us.html">About Us</a>
<div class="relative" id="products-dropdown-container">
<button id="products-btn" class="nav-link flex items-center gap-1 text-[#171e29] hover:text-[#885203] transition-colors">
                            Products
                            <span class="material-symbols-outlined text-sm">expand_more</span>
</button>
<!-- Dropdown Menu styled after Image 2 -->
<div id="products-dropdown" class="absolute left-0 top-full pt-4 w-56 animate-in fade-in slide-in-from-top-2 duration-200 hidden">
<div class="bg-surface-container-lowest border border-surface-variant/20 rounded-lg overflow-hidden py-2 shadow-lg">
<a class="block px-6 py-3 text-[#171e29] hover:bg-surface-container-low transition-colors" href="/shop/all-products.html">Kids</a>
<a class="block px-6 py-3 text-[#171e29] hover:bg-surface-container-low transition-colors" href="/shop/all-products.html">Mens</a>
<a class="block px-6 py-3 text-[#171e29] hover:bg-surface-container-low transition-colors" href="/shop/all-products.html">Womens</a>
<div class="h-px bg-surface-variant/20 my-1"></div>
<a class="block px-6 py-3 text-[#171e29] font-semibold hover:bg-surface-container-low transition-colors" href="/shop/all-products.html">View All Categories</a>
</div>
</div>
</div>
<a class="nav-link text-[#171e29] hover:text-[#885203] transition-colors" href="/admin/dashboard.html">Management</a>
<a class="nav-link text-[#171e29] hover:text-[#885203] transition-colors" href="/company/contact-us.html">Contact Us</a>
<a class="nav-link text-[#171e29] hover:text-[#885203] transition-colors" href="/company/news-and-events.html">News &amp; Events</a>
</div>
</div>
<div class="flex items-center gap-6">
<div class="relative hidden lg:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
<input class="pl-10 pr-4 py-2 bg-surface-container-low border-none focus:ring-1 focus:ring-secondary rounded-lg text-xs w-56 transition-all" placeholder="Search curated collections..." type="text"/>
</div>
<div class="flex items-center gap-4">
<a href="/account/sign-in.html" class="text-[#171e29] hover:text-[#885203] transition-colors">
<span class="material-symbols-outlined text-xl">person</span>
</a>
<button class="text-[#171e29] hover:text-[#885203] transition-colors relative">
<span class="material-symbols-outlined text-xl">shopping_cart</span>
<span class="absolute -top-1 -right-1 bg-secondary text-[10px] text-white w-4 h-4 flex items-center justify-center rounded-full">2</span>
</button>
</div>
</div>
</nav>
</header>
  `;

  const placeholder = document.getElementById('header-placeholder');
  if (placeholder) {
    placeholder.innerHTML = headerHtml;

    // Highlight active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = placeholder.querySelectorAll('.nav-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.endsWith(currentPath) || href === '/' + currentPath) && href !== '#') {
        link.classList.add('text-[#885203]');
        link.classList.remove('text-[#171e29]');
      }
    });

    // Dropdown Logic
    const prodBtn = document.getElementById('products-btn');
    const prodDropdown = document.getElementById('products-dropdown');
    
    if (prodBtn && prodDropdown) {
      // Toggle on click
      prodBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prodDropdown.classList.toggle('hidden');
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!prodBtn.contains(e.target) && !prodDropdown.contains(e.target)) {
          prodDropdown.classList.add('hidden');
        }
      });
      
      // Also close when a link inside is clicked
      const dropLinks = prodDropdown.querySelectorAll('a');
      dropLinks.forEach(l => {
        l.addEventListener('click', () => prodDropdown.classList.add('hidden'));
      });
    }
  }
}
