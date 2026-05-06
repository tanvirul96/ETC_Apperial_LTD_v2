function loadFooter() {
  const footerHtml = `
<footer class="w-full mt-24 bg-[#171e29] text-slate-100 border-t border-[#171e29]/5">
<div class="flex flex-col md:flex-row justify-between items-start w-full px-8 md:px-16 py-20 gap-16 mx-auto container">
<div class="max-w-xs">
<a class="font-headline text-3xl font-bold text-white mb-8 block tracking-tighter" href="/frontend/index.html">ETC Apparel</a>
<p class="font-body text-sm tracking-wide text-slate-400 leading-relaxed mb-8">
                    Handcrafted for the modern curator. We bridge the gap between architectural precision and artisanal warmth.
                </p>
<div class="flex gap-4">
<a class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary transition-all" href="#">
<span class="material-symbols-outlined text-sm">public</span>
</a>
<a class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary transition-all" href="#">
<span class="material-symbols-outlined text-sm">share</span>
</a>
<a class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary transition-all" href="#">
<span class="material-symbols-outlined text-sm">mail</span>
</a>
</div>
</div>
<div class="grid grid-cols-2 md:grid-cols-3 gap-12 flex-grow">
<div>
<h4 class="font-label text-xs tracking-[0.2em] uppercase text-slate-500 mb-6">Collections</h4>
<ul class="space-y-4">
<li><a class="font-body text-sm tracking-wide text-slate-400 hover:text-white transition-all underline-offset-4 hover:underline decoration-secondary" href="/frontend/shop/all-products.html">Menswear</a></li>
<li><a class="font-body text-sm tracking-wide text-slate-400 hover:text-white transition-all underline-offset-4 hover:underline decoration-secondary" href="/frontend/shop/all-products.html">Womenswear</a></li>
<li><a class="font-body text-sm tracking-wide text-slate-400 hover:text-white transition-all underline-offset-4 hover:underline decoration-secondary" href="/frontend/shop/all-products.html">Accessories</a></li>
<li><a class="font-body text-sm tracking-wide text-slate-400 hover:text-white transition-all underline-offset-4 hover:underline decoration-secondary" href="/frontend/company/about-us.html">Sustainability</a></li>
</ul>
</div>
<div>
<h4 class="font-label text-xs tracking-[0.2em] uppercase text-slate-500 mb-6">Support</h4>
<ul class="space-y-4 font-body text-sm tracking-wide">
<li><a class="text-slate-400 hover:text-white transition-all underline-offset-4 hover:underline decoration-secondary" href="#">Shipping</a></li>
<li><a class="text-slate-400 hover:text-white transition-all underline-offset-4 hover:underline decoration-secondary" href="#">Returns</a></li>
<li><a class="text-slate-400 hover:text-white transition-all underline-offset-4 hover:underline decoration-secondary" href="#">Privacy Policy</a></li>
<li><a class="text-slate-400 hover:text-white transition-all underline-offset-4 hover:underline decoration-secondary" href="#">Store Locator</a></li>
</ul>
</div>
<div class="col-span-2 md:col-span-1">
<h4 class="font-label text-xs tracking-[0.2em] uppercase text-slate-500 mb-6">Offices</h4>
<div class="space-y-6">
<div>
<p class="text-white font-bold text-sm mb-1">UK Studio</p>
<p class="text-slate-400 text-xs leading-relaxed">24 Savile Row, Mayfair<br/>London, W1S 3PR</p>
</div>
<div>
<p class="text-white font-bold text-sm mb-1">Bangladesh Atelier</p>
<p class="text-slate-400 text-xs leading-relaxed">Gulshan 2, Road 90<br/>Dhaka, 1212</p>
</div>
</div>
</div>
</div>
</div>
<div class="w-full px-8 md:px-16 py-8 border-t border-white/5 bg-slate-950/50">
<div class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-slate-600 font-label">
<p>© 2024 ETC Apparel. Handcrafted for the modern curator.</p>
<div class="flex gap-8">
<a class="hover:text-white transition-colors" href="#">Terms of Service</a>
<a class="hover:text-white transition-colors" href="#">Accessibility</a>
<a class="hover:text-white transition-colors" href="#">Cookie Settings</a>
</div>
</div>
</div>
</footer>
  `;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.innerHTML = footerHtml;
  }
}
