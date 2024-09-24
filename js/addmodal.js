
// Tool Modal
document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('open-modal');
    const closeModalButton = document.getElementById('close-modal');
    const modal = document.getElementById('modal');

    openModalButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
});

// Borrow Modal
document.addEventListener('DOMContentLoaded', () => {
    const openBorrowButton = document.getElementById('BorrowOpen');
    const closeBorrowButton = document.getElementById('BorrowClose');
    const modal = document.getElementById('borrow');

    openBorrowButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeBorrowButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
});

// Return Modal
document.addEventListener('DOMContentLoaded', () => {
    const openReturnButton = document.getElementById('ReturnOpen');
    const closeReturnButton = document.getElementById('ReturnClose');
    const modal = document.getElementById('return');

    openReturnButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeReturnButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
});
