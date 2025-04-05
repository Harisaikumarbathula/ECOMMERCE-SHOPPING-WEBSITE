// DOM Elements
const addAddressBtn = document.getElementById('add-address-btn');
const addressModal = document.getElementById('address-modal');
const closeModalBtn = document.querySelector('.close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const addressForm = document.getElementById('address-form');
const editButtons = document.querySelectorAll('.address-card .btn:first-child');
const deleteButtons = document.querySelectorAll('.address-card .btn:last-child');

// Show Modal
function showModal() {
    addressModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Hide Modal
function hideModal() {
    addressModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    addressForm.reset();
}

// Event Listeners
addAddressBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', hideModal);
cancelBtn.addEventListener('click', hideModal);

// Close modal when clicking outside
addressModal.addEventListener('click', (e) => {
    if (e.target === addressModal) {
        hideModal();
    }
});

// Handle form submission
addressForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        type: document.getElementById('address-type').value,
        name: document.getElementById('full-name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value,
        isDefault: document.getElementById('set-default').checked
    };

    // Here you would typically send this data to your backend
    console.log('New address data:', formData);

    // For demo purposes, we'll just hide the modal
    hideModal();
});

// Handle edit button clicks
editButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const addressCard = e.target.closest('.address-card');
        const addressDetails = addressCard.querySelector('.address-details');
        
        // Get current address data
        const currentData = {
            type: addressCard.querySelector('.address-header h3').textContent,
            name: addressDetails.querySelector('.name').textContent,
            phone: addressDetails.querySelector('.phone').textContent,
            address: addressDetails.querySelector('.address').textContent,
            city: addressDetails.querySelector('.city').textContent
        };

        // Populate form with current data
        document.getElementById('address-type').value = currentData.type.toLowerCase();
        document.getElementById('full-name').value = currentData.name;
        document.getElementById('phone').value = currentData.phone;
        document.getElementById('address').value = currentData.address;
        document.getElementById('city').value = currentData.city.split(',')[0];
        document.getElementById('state').value = currentData.city.split(',')[1].trim();
        document.getElementById('pincode').value = currentData.city.split(' ').pop();
        document.getElementById('set-default').checked = addressCard.classList.contains('default');

        // Show modal
        showModal();
    });
});

// Handle delete button clicks
deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const addressCard = e.target.closest('.address-card');
        
        // Don't allow deletion of default address
        if (addressCard.classList.contains('default')) {
            alert('Cannot delete default address');
            return;
        }

        // Here you would typically send a delete request to your backend
        console.log('Deleting address:', addressCard.querySelector('.address-header h3').textContent);
        
        // For demo purposes, we'll just remove the card
        addressCard.remove();
    });
});

// Handle setting default address
document.getElementById('set-default').addEventListener('change', (e) => {
    if (e.target.checked) {
        // Remove default class from all address cards
        document.querySelectorAll('.address-card').forEach(card => {
            card.classList.remove('default');
        });
        
        // Remove default badge from all cards
        document.querySelectorAll('.default-badge').forEach(badge => {
            badge.remove();
        });
    }
}); 