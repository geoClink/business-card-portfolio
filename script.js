const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalCategory = document.getElementById('modalCategory');

function openModal(title, desc, category) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalCategory.textContent = category;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
