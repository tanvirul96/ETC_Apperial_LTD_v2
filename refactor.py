import os
import re

files = [
    'index.html', 'about-us.html', 'all-products.html', 
    'create-account.html', 'sign-in.html', 'my-account.html', 'management.html',
    'news-and-events.html', 'contact-us.html'
]

for file in files:
    if not os.path.exists(file): continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace <header> that contains <nav> (like in index.html)
    content = re.sub(r'<!-- TopNavBar -->\s*<header[^>]*>\s*<nav.*?</nav>\s*</header>', '<div id="header-placeholder"></div>', content, flags=re.DOTALL)
    content = re.sub(r'<header[^>]*>\s*<nav.*?</nav>\s*</header>', '<div id="header-placeholder"></div>', content, flags=re.DOTALL)

    # Replace <nav>...</nav> (and any preceding <!-- TopNavBar --> comments)
    content = re.sub(r'<!-- TopNavBar -->\s*<nav.*?</nav>', '<div id="header-placeholder"></div>', content, flags=re.DOTALL)
    content = re.sub(r'<!-- Top Navigation Bar -->\s*<nav.*?</nav>', '<div id="header-placeholder"></div>', content, flags=re.DOTALL)
    # Some files might just have <nav>...</nav>
    content = re.sub(r'<nav\b[^>]*>.*?</nav>', '<div id="header-placeholder"></div>', content, flags=re.DOTALL)
    # Also index.html has a <header> wrapping the nav, let's just replace the header too if it's there
    content = re.sub(r'<header[^>]*>\s*<div id="header-placeholder"></div>\s*</header>', '<div id="header-placeholder"></div>', content, flags=re.DOTALL)
    
    # Replace <footer>...</footer>
    content = re.sub(r'<!-- Footer -->\s*<footer.*?</footer>', '<div id="footer-placeholder"></div>', content, flags=re.DOTALL)
    content = re.sub(r'<footer\b[^>]*>.*?</footer>', '<div id="footer-placeholder"></div>', content, flags=re.DOTALL)

    # Insert main.css before </head>
    if '<link rel="stylesheet" href="css/main.css">' not in content:
        content = content.replace('</head>', '    <link rel="stylesheet" href="css/main.css">\n</head>')
        
    # Insert scripts before </body>
    scripts = """
    <script src="components/header.js"></script>
    <script src="components/footer.js"></script>
    <script src="js/animations.js"></script>
</body>"""
    if 'components/header.js' not in content:
        content = content.replace('</body>', scripts)
        
    # Write back
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Refactoring completed.")
