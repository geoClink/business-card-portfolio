// ── Content defaults ──

const DEFAULT_CONTENT = {
    about_p1:        "I'm Emmalee, a 19-year-old designer from Frankfort, MI. I started making business cards and flyers because I love how good design can make something feel real — like a brand that actually means something.",
    about_p2:        "I'm still early in my journey, but I take every project seriously. I work from scratch, I listen, and I don't stop until it feels right.",
    contact_email:   'hello@yourname.com',
    contact_handle:  '@yourhandle',
    contact_handle_url: '#',
    process_1_title: 'Reach out',
    process_1_desc:  "Tell me about your business, the vibe you're after, and any ideas you have. No design experience needed on your end.",
    process_2_title: 'We design it',
    process_2_desc:  "I'll share a few concepts and we'll refine together until it feels exactly right — back and forth until you love it.",
    process_3_title: 'Files delivered',
    process_3_desc:  'High-res, print-ready files straight to your inbox, ready to hand off to any printer. Social sizes included if you need them.',
};

const DEFAULT_WORK_ITEMS = [
    { title: 'Minimalist Luxe',   desc: 'A sleek, minimal business card with gold accent type and matte black stock — built for professionals who let the design do the talking.', category: 'Business Card', image: '' },
    { title: 'Summer Music Fest', desc: 'Vibrant, high-energy event flyer built for print and social — designed to stop the scroll and sell tickets.',                           category: 'Flyer',         image: '' },
    { title: 'Grand Opening',     desc: 'Bold promotional flyer with large type and high-contrast color blocking. Built to bring foot traffic in the door.',                     category: 'Flyer',         image: '' },
    { title: 'Eco Botanicals',    desc: 'Organic typography and earthy tones designed for a sustainable plant boutique. Printed on recycled kraft stock.',                      category: 'Business Card', image: '' },
    { title: 'Community Cookout', desc: 'Friendly, community-focused event flyer with a clean layout that holds up in print and online.',                                      category: 'Flyer',         image: '' },
    { title: 'Bold & Warm',       desc: 'High-contrast warm tones with a chunky serif wordmark. Made for food, lifestyle, and hospitality brands.',                            category: 'Business Card', image: '' },
];

const workItems = JSON.parse(localStorage.getItem('work_items') || 'null') || DEFAULT_WORK_ITEMS;

const DEFAULT_REVIEWS = [
    { name: 'Sarah T.', business: 'Bloom Floral Co.', quote: "Emmalee nailed exactly what I had in my head on the first try. My business cards are the best marketing I've ever done." },
    { name: 'Marcus R.', business: 'Lakeside Roofing', quote: "Turned my boring idea into something I'm actually proud to hand out. Fast, easy, and the file was perfect for printing." },
    { name: 'Jenna K.', business: 'The Honey Table', quote: "I got so many compliments on my flyer at the farmers market. Would hire again without a second thought." },
];

// ── Load & apply editable content from localStorage ──

function loadContent() {
    const saved   = JSON.parse(localStorage.getItem('site_content') || 'null');
    const content = Object.assign({}, DEFAULT_CONTENT, saved);

    // About
    const p1 = document.getElementById('about-p1');
    const p2 = document.getElementById('about-p2');
    if (p1) p1.textContent = content.about_p1;
    if (p2) p2.textContent = content.about_p2;

    // Contact
    const emailEl    = document.getElementById('contact-email');
    const handleEl   = document.getElementById('contact-handle');
    const heroEmailEl = document.querySelector('.hc-email');
    if (emailEl)     { emailEl.textContent  = content.contact_email;  emailEl.href  = 'mailto:' + content.contact_email; }
    if (handleEl)    { handleEl.textContent = content.contact_handle; handleEl.href = content.contact_handle_url; }
    if (heroEmailEl) { heroEmailEl.textContent = content.contact_email; }

    // Process steps
    [1, 2, 3].forEach(n => {
        const titleEl = document.getElementById('process-' + n + '-title');
        const descEl  = document.getElementById('process-' + n + '-desc');
        if (titleEl) titleEl.textContent = content['process_' + n + '_title'];
        if (descEl)  descEl.textContent  = content['process_' + n + '_desc'];
    });

    // Reviews
    const reviews = JSON.parse(localStorage.getItem('reviews') || 'null') || DEFAULT_REVIEWS;
    reviews.forEach((review, i) => {
        const card       = document.getElementById('review-card-' + i);
        const quoteEl    = document.getElementById('review-' + i + '-quote');
        const nameEl     = document.getElementById('review-' + i + '-name');
        const businessEl = document.getElementById('review-' + i + '-business');
        if (!card) return;
        if (!review.quote.trim()) { card.hidden = true; return; }
        if (quoteEl)    quoteEl.textContent    = review.quote;
        if (nameEl)     nameEl.textContent     = review.name;
        if (businessEl) businessEl.textContent = review.business;
    });

    // Work items — populate card titles, images, and wire click handlers
    document.querySelectorAll('.bento-item[data-index]').forEach(item => {
        const idx  = parseInt(item.getAttribute('data-index'), 10);
        const work = workItems[idx];
        if (!work) return;

        const titleEl = item.querySelector('.card-title');
        if (titleEl) titleEl.textContent = work.title;

        if (work.image) {
            item.style.backgroundImage    = `url(images/${work.image})`;
            item.style.backgroundSize     = 'cover';
            item.style.backgroundPosition = 'center';
            item.classList.add('has-image');
        }

        item.addEventListener('click', () => openModal(idx));
    });
}

loadContent();

// ── Hero card mouse tilt ──

const heroCard = document.getElementById('heroCard');

if (heroCard && window.matchMedia('(pointer: fine)').matches) {
    const BASE = 'perspective(900px) rotate(-10deg)';

    document.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (window.innerWidth  / 2);
        const dy = (e.clientY - cy) / (window.innerHeight / 2);
        const ry =  dx * 14;
        const rx = -dy * 9;
        heroCard.style.transform = `perspective(900px) rotate(-10deg) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        heroCard.style.transform = BASE;
    });
}

// ── Selectors ──

const filterButtons = document.querySelectorAll('.filter-btn');
const bentoItems    = document.querySelectorAll('.bento-item');
const bentoGrid     = document.querySelector('.bento-grid');
const modal         = document.getElementById('modal');
const modalCategory = document.getElementById('modal-category');
const modalTitle    = document.getElementById('modal-title');
const modalDesc     = document.getElementById('modal-desc');

// ── Scroll reveal (IntersectionObserver) ──

// Tag each bento item with its stagger index
bentoItems.forEach((item, i) => item.style.setProperty('--i', i));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        if (el.classList.contains('bento-item')) {
            const idx = parseInt(el.style.getPropertyValue('--i')) || 0;
            el.style.transitionDelay = `${idx * 75}ms`;
            el.classList.add('visible');
            // Clear the stagger delay once revealed so hover transitions snap immediately
            el.addEventListener('transitionend', () => {
                el.style.transitionDelay = '';
            }, { once: true });
        } else {
            el.classList.add('visible');
        }

        revealObserver.unobserve(el);
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .bento-item').forEach(el => revealObserver.observe(el));

// ── Gallery filter ──

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        bentoGrid.classList.toggle('is-filtered', filter !== 'all');

        bentoItems.forEach(item => {
            const match = filter === 'all' || item.getAttribute('data-category') === filter;

            if (match) {
                // Show: make visible in DOM, then fade in
                item.style.display = '';
                item.classList.add('is-hiding'); // start hidden
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        item.classList.add('visible'); // ensure revealed even if IntersectionObserver hasn't fired
                        item.classList.remove('is-hiding');
                    });
                });
            } else {
                // Hide: fade out, then remove from flow
                item.classList.add('is-hiding');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 240);
            }
        });
    });
});

// ── Modal ──

let currentModalIndex = -1;

const modalImageWrap = document.getElementById('modal-image-wrap');
const modalImage     = document.getElementById('modal-image');
const modalPanel     = document.querySelector('.modal-panel');
const modalPrev      = document.getElementById('modal-prev');
const modalNext      = document.getElementById('modal-next');

function getVisibleIndices() {
    return Array.from(document.querySelectorAll('.bento-item[data-index]'))
        .filter(el => el.style.display !== 'none')
        .map(el => parseInt(el.getAttribute('data-index'), 10));
}

function openModal(index) {
    currentModalIndex = index;
    const work = workItems[index];

    modalCategory.textContent = work.category;
    modalTitle.textContent    = work.title;
    modalDesc.textContent     = work.desc;

    if (work.image) {
        modalImage.src     = `images/${work.image}`;
        modalImage.alt     = work.title;
        modalImageWrap.hidden = false;
        modalPanel.classList.add('has-image');
    } else {
        modalImageWrap.hidden = true;
        modalPanel.classList.remove('has-image');
    }

    const visible = getVisibleIndices();
    const pos = visible.indexOf(index);
    modalPrev.disabled = pos <= 0;
    modalNext.disabled = pos >= visible.length - 1;

    modal.classList.remove('is-closing');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
}

function closeModal() {
    modal.classList.remove('is-open');
    modal.classList.add('is-closing');
    setTimeout(() => {
        modal.classList.remove('is-closing');
        document.body.style.overflow = '';
    }, 280);
}

modalPrev.addEventListener('click', () => {
    const visible = getVisibleIndices();
    const pos = visible.indexOf(currentModalIndex);
    if (pos > 0) openModal(visible[pos - 1]);
});

modalNext.addEventListener('click', () => {
    const visible = getVisibleIndices();
    const pos = visible.indexOf(currentModalIndex);
    if (pos < visible.length - 1) openModal(visible[pos + 1]);
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowLeft')  modalPrev.click();
    if (e.key === 'ArrowRight') modalNext.click();
});

// ── Process card tap-to-flip ──

document.querySelectorAll('.process-card-scene').forEach(scene => {
    scene.addEventListener('click', () => {
        scene.classList.toggle('is-flipped');
    });
});

// ── Hamburger menu ──

const siteNav   = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');

function closeNav() {
    siteNav.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', isOpen);
        navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    document.querySelector('.nav-links').querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', (e) => {
        if (siteNav.classList.contains('nav-open') && !siteNav.contains(e.target)) {
            closeNav();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && siteNav.classList.contains('nav-open')) {
            closeNav();
            navToggle.focus();
        }
    });
}
