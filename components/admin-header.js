function loadAdminHeader() {
    const headerHtml = `
<header class="sticky top-0 w-full z-40 bg-[#fef8f4]/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-12 py-6 ml-64 max-w-[calc(100%-16rem)]">
    <div class="flex items-center space-x-8">
        <span class="font-serif text-2xl font-black text-[#171e29] dark:text-white">Atelier</span>
        <div class="relative group">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input class="bg-surface-container-lowest border-none border-b border-primary/20 focus:ring-0 focus:border-primary text-sm pl-10 pr-4 py-2 w-64 transition-all" placeholder="Search dashboard..." type="text"/>
        </div>
    </div>
    <div class="flex items-center space-x-6">
        <button class="relative hover:opacity-80 transition-opacity">
            <span class="material-symbols-outlined text-primary">notifications</span>
            <span class="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
        </button>
        <div class="flex items-center space-x-3">
            <div class="text-right">
                <p class="text-xs font-bold text-primary">Julian Vane</p>
                <p class="text-[10px] text-outline uppercase tracking-tighter">Senior Administrator</p>
            </div>
            <img alt="Julian Vane" class="w-10 h-10 rounded-full object-cover border-2 border-surface-container-high" data-alt="professional portrait of a middle-aged man with short dark hair and a confident expression against a soft studio background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiMW4A22RLL_9vGiRe3-jMm1wgin_ZG0CzE9NT810xCdtrM3TipuFIIFeooa24lzPWtFoaXuvECL6qhSk3UIt1i2cd8QtuoP8djy9gmEJ6-izrr7gD4eM8_qMb2v6TdOIg6Yc0g8IXmLVG9WetgJ0Xy-nAC68ZTMCVxtEhdmQqivLfTWnuTzKyPGFivrQVXw5fIy8uuD3GPqRYXgBNU3TGVw49HPMcTW1tg7VgDBUY-6MsM6_PweJ-GsA_sugc2loSSGVNPF_TQ7Af"/>
        </div>
    </div>
</header>
    `;

    const placeholder = document.getElementById('admin-header-placeholder');
    if (placeholder) {
        placeholder.innerHTML = headerHtml;
    }
}
