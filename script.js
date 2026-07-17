// ---------- Theme toggle (dark / light) ----------
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    // Restore saved preference on load
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// ---------- Search box toggle ----------
const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');

if (searchToggle && searchBox) {
    searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBox.classList.toggle('open');
        if (searchBox.classList.contains('open')) {
            searchInput.focus();
        }
    });

    // Close the search box when clicking anywhere outside it
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target) && e.target !== searchToggle) {
            searchBox.classList.remove('open');
        }
    });

    // Basic submit-on-enter behaviour
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim() !== '') {
            window.location.href = `product.html?q=${encodeURIComponent(searchInput.value.trim())}`;
        }
    });
}

// ---------- Compare tabs ----------
const compareTabs = document.getElementById('compareTabs');
if (compareTabs) {
    compareTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab');
        if (!btn) return;

        const target = btn.dataset.tab;

        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.compare-panel').forEach(panel => {
            panel.classList.toggle('active', panel.dataset.panel === target);
        });
    });
}

// ---------- Newsletter form ----------
const subForm = document.getElementById('subForm');
if (subForm) {
    subForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('subEmail').value;
        const note = document.getElementById('subNote');
        note.textContent = `Subscribed with ${email}. Check your inbox to confirm.`;
        subForm.reset();
    });
}

// ---------- Highlight active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ---------- Shop page: filter pills + search ----------
const filterPills = document.getElementById('filterPills');
const productGridEl = document.getElementById('productGrid');
const productSearch = document.getElementById('productSearch');
const noResults = document.getElementById('noResults');

function applyShopFilters() {
    if (!productGridEl) return;

    const activePill = filterPills ? filterPills.querySelector('.filter-pill.active') : null;
    const activeFilter = activePill ? activePill.dataset.filter : 'all';
    const query = productSearch ? productSearch.value.trim().toLowerCase() : '';

    const cards = productGridEl.querySelectorAll('.shop-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
        const matchesSearch = query === '' || card.dataset.name.includes(query);
        const show = matchesFilter && matchesSearch;

        card.classList.toggle('is-hidden', !show);
        if (show) visibleCount++;
    });

    if (noResults) {
        noResults.classList.toggle('show', visibleCount === 0);
    }
}

if (filterPills) {
    filterPills.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-pill');
        if (!btn) return;

        filterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        applyShopFilters();
    });
}

if (productSearch) {
    productSearch.addEventListener('input', applyShopFilters);
}

// ---------- Compare Now button ----------
const compareNowBtn = document.getElementById('compareNowBtn');
if (compareNowBtn) {
    compareNowBtn.addEventListener('click', () => {
        compareNowBtn.textContent = 'Comparing…';
        setTimeout(() => {
            compareNowBtn.textContent = 'Compare Now';
        }, 1200);
    });
}

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all other FAQ items (single-open accordion)
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
            if (openItem !== item) {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-answer').style.maxHeight = null;
            }
        });

        if (isOpen) {
            item.classList.remove('open');
            answer.style.maxHeight = null;
        } else {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ---------- Contact form ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('cName').value;
        const note = document.getElementById('contactNote');
        note.textContent = `Thanks, ${name}! Your message has been sent — we'll reply soon.`;
        contactForm.reset();
    });
}

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


menuToggle.onclick = function(){

    navMenu.classList.toggle("show");

};

