// ── Font pairs ──

const FONT_PAIRS = {
    fraunces: {
        label: 'Fraunces + DM Sans',
        desc:  'Elegant italic serif — the current default',
        display: "'Fraunces', Georgia, serif",
        body:    "'DM Sans', system-ui, sans-serif",
        google:  'Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500',
    },
    playfair: {
        label: 'Playfair + Source Sans',
        desc:  'Classic editorial, great for luxury brands',
        display: "'Playfair Display', Georgia, serif",
        body:    "'Source Sans 3', system-ui, sans-serif",
        google:  'Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Source+Sans+3:wght@300;400;500',
    },
    cormorant: {
        label: 'Cormorant + Inter',
        desc:  'Refined and light — very high-fashion',
        display: "'Cormorant Garamond', Georgia, serif",
        body:    "'Inter', system-ui, sans-serif",
        google:  'Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500',
    },
    lora: {
        label: 'Lora + Nunito',
        desc:  'Warm and approachable, great for small business',
        display: "'Lora', Georgia, serif",
        body:    "'Nunito', system-ui, sans-serif",
        google:  'Lora:ital,wght@0,400;0,500;1,400;1,500&family=Nunito:wght@300;400;500',
    },
    libre: {
        label: 'Libre Baskerville + Open Sans',
        desc:  'Traditional and sturdy — highly readable',
        display: "'Libre Baskerville', Georgia, serif",
        body:    "'Open Sans', system-ui, sans-serif",
        google:  'Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Open+Sans:wght@300;400;500',
    },
};

function applyFonts() {
    const key  = localStorage.getItem('font_pair') || 'fraunces';
    const pair = FONT_PAIRS[key] || FONT_PAIRS.fraunces;
    if (key === 'fraunces') return; // default fonts already in <head>
    const link = document.createElement('link');
    link.rel   = 'stylesheet';
    link.href  = `https://fonts.googleapis.com/css2?family=${pair.google}&display=swap`;
    document.head.appendChild(link);
    document.documentElement.style.setProperty('--font-display', pair.display);
    document.documentElement.style.setProperty('--font-body',    pair.body);
}

applyFonts();

// ── Content defaults ──

const DEFAULT_CONTENT = {
    about_p1:        "I'm Emmalee, a designer from Frankfort, MI. I started with business cards and flyers because I love how good print design can make something feel real — a brand you'd actually hold onto, an invitation worth keeping.",
    about_p2:        "Every project is built from scratch — no templates, no shortcuts. I listen first, ask questions, and don't deliver until it feels right.",
    contact_email:   'emmaleealexander527@gmail.com',
    contact_handle:  '@yourhandle',
    contact_handle_url: '#',
    process_1_title: 'Reach out',
    process_1_desc:  "Tell me about your business, the vibe you're after, and any ideas you have. No design experience needed on your end.",
    process_2_title: 'I design it',
    process_2_desc:  "I'll share a few concepts and we'll refine together until it feels exactly right — back and forth until you love it.",
    process_3_title: 'Files delivered',
    process_3_desc:  'High-res, print-ready files straight to your inbox, ready to hand off to any printer. Social sizes included if you need them.',
    pricing_bc_price: '$65',
    pricing_bc_li_0:  'Custom from-scratch design',
    pricing_bc_li_1:  '2 revisions included',
    pricing_bc_li_2:  'Print-ready files delivered',
    pricing_bc_li_3:  'Social sizes on request',
    pricing_fl_price: '$75',
    pricing_fl_li_0:  'Custom from-scratch design',
    pricing_fl_li_1:  '2 revisions included',
    pricing_fl_li_2:  'Print-ready files delivered',
    pricing_fl_li_3:  'Digital sizes on request',
    pricing_inv_price: '$85',
    pricing_inv_li_0:  'Custom from-scratch design',
    pricing_inv_li_1:  'Print-ready & digital files',
    pricing_inv_li_2:  '2 revisions included',
    pricing_inv_li_3:  'Full suite pricing on request',
    pricing_note:     "Every project is different — reach out for a custom quote.",
};

const DEFAULT_WORK_ITEMS = [
    { title: 'Graduation Party Invite', desc: 'Gold botanical graduation party invitation with personal photo, elegant script type, and a floral illustration border — designed for print and ready to mail.',                                      category: 'Flyer',         image: 'emmalee-grad-invite.webp',          imageBack: 'emmalee-grad-invite.webp',          imgRatio: 0.71, imgPos: 'top', noDrag: true },
    { title: 'White Bear Harmonics',    desc: 'Two-sided business card for a holistic health practice in Northern Michigan. Logo and card designed from scratch — branded navy palette, clean typography, and a services QR code on the back.',  category: 'Business Card', image: 'whitebear-harmonics-front.PNG', imageBack: 'whitebear-harmoincs-back.webp', link: 'https://whitebearharmonics.com',    imgRatio: 1.75 },
    { title: 'George Clinkscales',      desc: 'High-contrast black and white card for an iOS and full stack engineer. Clean split-panel layout with contact info on the left and services on the right, QR code on the back.',                      category: 'Business Card', image: 'george-card-front.PNG',           imageBack: 'george-card-back.PNG',         link: 'https://georgeclinkscalesdev.com', imgRatio: 1.75 },
    { title: 'Graduation Thank You Card', desc: 'Matching thank you card to close the graduation suite — bold pink script, personal photo, and a handwritten-style signature.',                                                                       category: 'Flyer',         image: 'emmalee-grad-thank-you.webp',       imageBack: 'emmalee-grad-thank-you.webp',       bgPos: 'top',  imgRatio: 1.50, noDrag: true },
    { title: 'Wedding Invitation',        desc: 'Vintage modern minimal wedding invitation — editorial serif type over a candid photo, warm and timeless. A spec piece showing what a custom wedding suite could look like.',                              category: 'Invitation',    image: 'wedding-invitation.webp',      imageBack: 'wedding-invitation.webp',      imgRatio: 0.71, imgPos: 'top', noDrag: true, spec: true },
    { title: 'Baby Shower Invitation',    desc: 'Pink and brown illustrative baby shower invitation — whimsical goose illustration, soft palette, handwritten-style type. A spec piece showing a full event invitation package.',                         category: 'Invitation',    image: 'baby-shower-invitation.webp',  imageBack: 'baby-shower-invitation.webp',  imgRatio: 0.75, imgPos: 'top', noDrag: true, spec: true },
];

// Bump this string whenever default data changes in a meaningful way
const DATA_VERSION = '11';
(function() {
    if (localStorage.getItem('data_v') !== DATA_VERSION) {
        localStorage.removeItem('work_items');
        localStorage.removeItem('reviews');
        localStorage.setItem('data_v', DATA_VERSION);
    }
})();

const workItems = JSON.parse(localStorage.getItem('work_items') || 'null') || DEFAULT_WORK_ITEMS;

const DEFAULT_REVIEWS = [
    { name: 'George Clinkscales',  business: 'Personal Web Developer', quote: "I made a business card for myself at first. Emmalee told me she could make one better. So I let her. I love my business card and have a lot of confidence when I give it out to potential clients." },
    { name: 'Dr. Karen Alexander', business: 'White Bear Harmonics',    quote: "I'm so impressed with Emmalee's design work. She took my vision and added style and beauty to create a business card that I know will attract customers and help to grow my wellness company. I highly recommend her work!" },
    { name: '', business: '', quote: '' },
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

    // Reviews — marquee
    const reviews = JSON.parse(localStorage.getItem('reviews') || 'null') || DEFAULT_REVIEWS;
    const track = document.getElementById('reviews-track');
    if (track) {
        const real = reviews.filter(r => r.quote && r.quote.trim());
        if (real.length > 0) {
            const isFew = real.length < 3;
            if (isFew) track.classList.add('reviews-static');

            // Few reviews: show once, static. Enough reviews: repeat + scroll.
            const toRender = isFew ? real : (() => {
                const minCount = 8;
                const repeated = [];
                while (repeated.length < minCount) repeated.push(...real);
                return [...repeated, ...repeated];
            })();

            toRender.forEach(review => {
                const card = document.createElement('figure');
                card.className = 'review-card';

                const quote = document.createElement('blockquote');
                quote.className = 'review-quote';
                quote.textContent = review.quote;

                const caption = document.createElement('figcaption');
                caption.className = 'review-byline';

                const name = document.createElement('span');
                name.className = 'review-name';
                name.textContent = review.name;

                const business = document.createElement('span');
                business.className = 'review-business';
                business.textContent = review.business;

                caption.appendChild(name);
                caption.appendChild(business);
                card.appendChild(quote);
                card.appendChild(caption);
                track.appendChild(card);
            });

            if (!isFew) {
                // Scale scroll speed to number of cards (340px per card at ~80px/s)
                const duration = toRender.length / 2 * 340 / 80;
                track.style.animationDuration = `${Math.round(duration)}s`;
            }
        }
    }

    // Pricing
    const pricingIds = [
        'pricing-bc-price', 'pricing-bc-li-0', 'pricing-bc-li-1', 'pricing-bc-li-2', 'pricing-bc-li-3',
        'pricing-fl-price', 'pricing-fl-li-0', 'pricing-fl-li-1', 'pricing-fl-li-2', 'pricing-fl-li-3',
        'pricing-inv-price', 'pricing-inv-li-0', 'pricing-inv-li-1', 'pricing-inv-li-2', 'pricing-inv-li-3',
        'pricing-note',
    ];
    pricingIds.forEach(id => {
        const el  = document.getElementById(id);
        const key = id.replace(/-/g, '_');
        if (el && content[key] !== undefined) el.textContent = content[key];
    });

    // Work items — populate card titles, images, and wire click handlers
    document.querySelectorAll('.bento-item[data-index]').forEach(item => {
        const idx  = parseInt(item.getAttribute('data-index'), 10);
        const work = workItems[idx];
        if (!work) return;

        const titleEl = item.querySelector('.card-title');
        if (titleEl) titleEl.textContent = work.title;

        if (work.image) {
            const visual = item.querySelector('.card-visual');
            if (visual) {
                visual.style.backgroundImage    = `url(images/${work.image})`;
                visual.style.backgroundSize     = work.bgSize || 'cover';
                visual.style.backgroundPosition = work.bgPos || 'center';
                visual.style.backgroundRepeat   = 'no-repeat';
            }
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

// ── 3D card rotation ──

let spinAnimFrame   = null;
let spinAngle       = 0;
let isDragging3D    = false;
let dragEnabled3D   = true;
let drag3DStartX    = 0;
let drag3DBaseAngle = 0;

const card3dEl    = document.getElementById('modal-card-3d');
const card3dScene = document.getElementById('card-3d-scene');

function applyCardAngle(deg) {
    card3dEl.style.transform = `rotateY(${deg}deg)`;
}

function start3DSpin() {
    stop3DSpin();
    function tick() {
        if (!isDragging3D) {
            spinAngle += 0.45;
            applyCardAngle(spinAngle);
        }
        spinAnimFrame = requestAnimationFrame(tick);
    }
    spinAnimFrame = requestAnimationFrame(tick);
}

function stop3DSpin() {
    if (spinAnimFrame) { cancelAnimationFrame(spinAnimFrame); spinAnimFrame = null; }
}

card3dEl.addEventListener('mousedown', e => {
    if (!dragEnabled3D) return;
    isDragging3D    = true;
    drag3DStartX    = e.clientX;
    drag3DBaseAngle = spinAngle;
    card3dEl.style.transition = 'none';
});

document.addEventListener('mousemove', e => {
    if (!isDragging3D) return;
    spinAngle = drag3DBaseAngle + (e.clientX - drag3DStartX) * 0.55;
    applyCardAngle(spinAngle);
});

document.addEventListener('mouseup', () => { isDragging3D = false; });

card3dEl.addEventListener('touchstart', e => {
    if (!dragEnabled3D) return;
    isDragging3D    = true;
    drag3DStartX    = e.touches[0].clientX;
    drag3DBaseAngle = spinAngle;
}, { passive: true });

document.addEventListener('touchmove', e => {
    if (!isDragging3D) return;
    spinAngle = drag3DBaseAngle + (e.touches[0].clientX - drag3DStartX) * 0.55;
    applyCardAngle(spinAngle);
    e.preventDefault();
}, { passive: false });

document.addEventListener('touchend', () => { isDragging3D = false; });

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
    const modalSpecBadge = document.getElementById('modal-spec-badge');
    if (modalSpecBadge) modalSpecBadge.hidden = !work.spec;
    modalTitle.textContent    = work.title;
    modalDesc.textContent     = work.desc;

    const websiteEl = document.getElementById('modal-website');
    if (websiteEl) {
        if (work.link && work.category === 'Business Card') {
            websiteEl.href   = work.link;
            websiteEl.hidden = false;
        } else {
            websiteEl.hidden = true;
        }
    }

    stop3DSpin();
    isDragging3D = false;

    if (work.image) {
        const frontImg = document.getElementById('modal-image-front');
        frontImg.src            = `images/${work.image}`;
        frontImg.alt            = work.title;
        frontImg.style.objectPosition = work.imgPos || 'center';

        const backImg = document.getElementById('modal-image-back');
        if (work.imageBack) {
            backImg.src          = `images/${work.imageBack}`;
            backImg.alt          = work.title + ' back';
            backImg.hidden       = false;
            backImg.style.display = '';
        } else {
            backImg.removeAttribute('src');
            backImg.alt          = '';
            backImg.hidden       = true;
            backImg.style.display = 'none';
        }

        // Portrait flyers: side-by-side layout. Everything else: stacked.
        const isMobile   = window.innerWidth < 700;
        const isPortrait = work.imgRatio && work.imgRatio < 1;

        if (isPortrait && !isMobile) {
            modalPanel.classList.add('modal-panel--portrait');
            const flyerW = 260;
            modalImageWrap.style.width  = flyerW + 'px';
            modalImageWrap.style.height = Math.round(flyerW / work.imgRatio) + 'px';
        } else {
            modalPanel.classList.remove('modal-panel--portrait');
            modalImageWrap.style.width = '';
            if (work.imgRatio) {
                const wrapWidth = modalImageWrap.clientWidth || (isMobile ? 320 : 540);
                const idealH    = Math.round(wrapWidth / work.imgRatio);
                const maxH      = isMobile && isPortrait ? 520 : (isMobile ? 200 : 360);
                const minH      = isMobile ? 120 : 160;
                modalImageWrap.style.height = Math.min(maxH, Math.max(minH, idealH)) + 'px';
            } else {
                modalImageWrap.style.height = '';
            }
        }

        dragEnabled3D = !work.noDrag;
        card3dEl.style.cursor = dragEnabled3D ? '' : 'default';

        const hint = document.querySelector('.card-3d-hint');
        if (hint) hint.hidden = !!work.noDrag;

        modalImageWrap.classList.add('has-back');
        modalImageWrap.hidden = false;
        modalPanel.classList.add('has-image');
        spinAngle = 0;
        applyCardAngle(0);
        start3DSpin();
    } else {
        modalImageWrap.classList.remove('has-back');
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
    stop3DSpin();
    isDragging3D = false;
    modalPanel.classList.remove('modal-panel--portrait');
    modalImageWrap.style.width  = '';
    modalImageWrap.style.height = '';
    dragEnabled3D = true;
    card3dEl.style.cursor = '';
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

// ── Active nav highlight ──

const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
            link.classList.toggle('nav-active', link.getAttribute('href') === `#${id}`);
        });
    });
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('section[id]').forEach(sec => sectionObserver.observe(sec));

// ── Contact form — submit without navigating away ──
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' },
        });

        if (response.ok) {
            contactForm.hidden = true;
            formSuccess.hidden = false;
        } else {
            alert('Something went wrong — please try emailing me directly.');
        }
    });
}
