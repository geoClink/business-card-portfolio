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
