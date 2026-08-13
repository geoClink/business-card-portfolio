// ── Gallery filter ──

const filterButtons = document.querySelectorAll('.filter-btn');
const bentoItems = document.querySelectorAll('.bento-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        bentoItems.forEach(item => {
            const match = filter === 'all' || item.getAttribute('data-category') === filter;
            item.style.display = match ? '' : 'none';
        });
    });
});

// ── Modal ──

const modal = document.getElementById('modal');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

function openModal(title, desc, category) {
    modalCategory.textContent = category;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
});
