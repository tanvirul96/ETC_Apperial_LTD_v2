function loadFooter() {
    const footerHtml = `
<footer class="bg-[#171e29] text-white py-24 px-8 md:px-16 overflow-hidden relative">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
        <div class="md:col-span-4">
            <h2 class="font-headline text-4xl font-bold mb-8 tracking-tighter">ETC.</h2>
            <p class="text-on-primary-container/60 font-body leading-relaxed mb-12 max-w-sm">
                Curating the silent evolution of modern heritage. A collective dedicated to the pursuit of architectural precision and tactile warmth.
            </p>
            <div class="flex gap-6">
                <a href="mailto:london@etcapparel.com" title="Email" class="text-on-primary-container/40 hover:text-secondary transition-colors"><span class="material-symbols-outlined">alternate_email</span></a>
                <a href="/frontend/company/about-us.html" title="About" class="text-on-primary-container/40 hover:text-secondary transition-colors"><span class="material-symbols-outlined">public</span></a>
                <a href="/frontend/company/news-and-events.html" title="News" class="text-on-primary-container/40 hover:text-secondary transition-colors"><span class="material-symbols-outlined">camera_indoor</span></a>
            </div>
        </div>
        <div class="md:col-span-2 space-y-6">
            <h4 class="font-label text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">Atelier</h4>
            <ul class="space-y-4 font-label text-xs uppercase tracking-widest text-on-primary-container/60">
                <li><a href="/frontend/shop/all-products.html" class="hover:text-white transition-colors">Collections</a></li>
                <li><a href="/frontend/company/news-and-events.html" class="hover:text-white transition-colors">Journal</a></li>
                <li><a href="/frontend/company/about-us.html" class="hover:text-white transition-colors">Archive</a></li>
                <li><a href="/frontend/company/contact-us.html" class="hover:text-white transition-colors">Stockists</a></li>
            </ul>
        </div>
        <div class="md:col-span-2 space-y-6">
            <h4 class="font-label text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">Curator</h4>
            <ul class="space-y-4 font-label text-xs uppercase tracking-widest text-on-primary-container/60">
                <li><a href="/frontend/company/about-us.html" class="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="/frontend/company/management.html" class="hover:text-white transition-colors">Management</a></li>
                <li><a href="/frontend/company/news-and-events.html" class="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="/frontend/company/contact-us.html" class="hover:text-white transition-colors">Contact</a></li>
            </ul>
        </div>
        <div class="md:col-span-4 space-y-8">
            <h4 class="font-label text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">Journal Subscription</h4>
            <p class="text-xs text-on-primary-container/60 leading-relaxed font-body">Receive curated updates on collection cycles and editorial insights.</p>
            <div class="flex border-b border-white/10 pb-2">
                <input id="footer-newsletter-email" type="email" placeholder="email@address.com" class="bg-transparent border-none focus:ring-0 text-sm font-label flex-grow outline-none">
                <button id="footer-newsletter-btn" class="text-secondary font-label text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors">Subscribe</button>
            </div>
            <p id="footer-newsletter-msg" class="text-[10px] font-label text-secondary hidden">Thank you! You're now subscribed to our journal.</p>
        </div>
    </div>
    <div class="container mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p class="text-[10px] font-label text-on-primary-container/30 uppercase tracking-widest">© ${new Date().getFullYear()} ETC Apparel Ltd. All rights reserved.</p>
        <div class="flex gap-6 font-label text-[10px] uppercase tracking-widest text-on-primary-container/30">
            <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-white transition-colors">Terms</a>
        </div>
    </div>
    <div class="absolute bottom-[-10%] right-[-10%] opacity-5 select-none pointer-events-none">
        <span class="font-headline text-[300px] font-black tracking-tighter italic">Apparel</span>
    </div>
</footer>
    `;

    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.innerHTML = footerHtml;

        // Footer newsletter handler
        const btn = document.getElementById('footer-newsletter-btn');
        const emailInput = document.getElementById('footer-newsletter-email');
        const msg = document.getElementById('footer-newsletter-msg');
        if (btn && emailInput) {
            btn.addEventListener('click', () => {
                const email = emailInput.value.trim();
                if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    if (typeof showToast === 'function') showToast('Please enter a valid email address.', 'warning');
                    return;
                }
                emailInput.value = '';
                if (msg) msg.classList.remove('hidden');
                if (typeof showToast === 'function') showToast('You\'re subscribed to the ETC Journal!', 'success');
            });
        }
    }
}

// Auto-load
if (document.getElementById('footer-placeholder')) {
    loadFooter();
}
