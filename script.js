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
    { title: 'Minimalist Luxe',   desc: 'A sleek, minimal business card with gold accent type and matte black stock — built for professionals who let the design do the talking.', category: 'Business Card' },
    { title: 'Summer Music Fest', desc: 'Vibrant, high-energy event flyer built for print and social — designed to stop the scroll and sell tickets.',                           category: 'Flyer'         },
    { title: 'Grand Opening',     desc: 'Bold promotional flyer with large type and high-contrast color blocking. Built to bring foot traffic in the door.',                     category: 'Flyer'         },
    { title: 'Eco Botanicals',    desc: 'Organic typography and earthy tones designed for a sustainable plant boutique. Printed on recycled kraft stock.',                      category: 'Business Card' },
    { title: 'Community Cookout', desc: 'Friendly, community-focused event flyer with a clean layout that holds up in print and online.',                                      category: 'Flyer'         },
    { title: 'Bold & Warm',       desc: 'High-contrast warm tones with a chunky serif wordmark. Made for food, lifestyle, and hospitality brands.',                            category: 'Business Card' },
];

// ── Load & apply editable content from localStorage ──

function loadContent() {
    const saved    = JSON.parse(localStorage.getItem('site_content') || 'null');
    const content  = Object.assign({}, DEFAULT_CONTENT, saved);
    const workItems = JSON.parse(localStorage.getItem('work_items') || 'null') || DEFAULT_WORK_ITEMS;

    // About
    const p1 = document.getElementById('about-p1');
    const p2 = document.getElementById('about-p2');
    if (p1) p1.textContent = content.about_p1;
    if (p2) p2.textContent = content.about_p2;

    // Contact
    const emailEl  = document.getElementById('contact-email');
    const handleEl = document.getElementById('contact-handle');
    if (emailEl)  { emailEl.textContent  = content.contact_email;  emailEl.href  = 'mailto:' + content.contact_email; }
    if (handleEl) { handleEl.textContent = content.contact_handle; handleEl.href = content.contact_handle_url; }

    // Process steps
    [1, 2, 3].forEach(n => {
        const titleEl = document.getElementById('process-' + n + '-title');
        const descEl  = document.getElementById('process-' + n + '-desc');
        if (titleEl) titleEl.textContent = content['process_' + n + '_title'];
        if (descEl)  descEl.textContent  = content['process_' + n + '_desc'];
    });

    // Work items — populate card titles and wire click handlers
    document.querySelectorAll('.bento-item[data-index]').forEach(item => {
        const idx  = parseInt(item.getAttribute('data-index'), 10);
        const work = workItems[idx];
        if (!work) return;
        const titleEl = item.querySelector('.card-title');
        if (titleEl) titleEl.textContent = work.title;
        item.addEventListener('click', () => openModal(work.title, work.desc, work.category));
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

function openModal(title, desc, category) {
    modalCategory.textContent = category;
    modalTitle.textContent    = title;
    modalDesc.textContent     = desc;
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

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});
