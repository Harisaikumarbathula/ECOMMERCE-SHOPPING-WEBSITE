// DOM Elements
const orderStatusLinks = document.querySelectorAll('.orders-menu a');
const ordersList = document.querySelector('.orders-list');

// Sample order data (in a real application, this would come from a backend)
const orders = [
    {
        id: 'SM12345',
        date: '15-08-2023',
        status: 'delivered',
        items: [
            {
                name: 'Classic White T-Shirt',
                size: 'M',
                quantity: 2,
                price: 999.00,
                image: 'images/WHITE-TSHIRT.jpg'
            },
            {
                name: 'Slim Fit Blue Jeans',
                size: '32',
                quantity: 1,
                price: 2499.00,
                image: 'images/SLIM-FIT.jpg'
            }
        ],
        subtotal: 4497.00,
        shipping: 0,
        tax: 809.46,
        total: 5306.46
    },
    {
        id: 'SM12346',
        date: '28-08-2023',
        status: 'shipped',
        items: [
            {
                name: 'Casual Oxford Shirt',
                size: 'L',
                quantity: 1,
                price: 1499.00,
                image: 'images/OXFORD.jpg'
            }
        ],
        subtotal: 1499.00,
        shipping: 0,
        tax: 269.82,
        total: 1768.82
    }
];

// Function to create order card HTML
function createOrderCard(order) {
    const statusClass = `status-${order.status}`;
    const statusIcon = order.status === 'delivered' ? 'fa-check-circle' : 'fa-truck';
    
    return `
        <div class="order-card">
            <div class="order-header">
                <div class="order-info">
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-date">Placed on ${order.date}</span>
                </div>
                <div class="order-status ${statusClass}">
                    <i class="fas ${statusIcon}"></i> ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>Size: ${item.size}</p>
                            <p>Quantity: ${item.quantity}</p>
                            <p>₹${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="order-summary">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>₹${order.subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>${order.shipping === 0 ? 'Free' : `₹${order.shipping.toFixed(2)}`}</span>
                </div>
                <div class="summary-row">
                    <span>Tax</span>
                    <span>₹${order.tax.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>₹${order.total.toFixed(2)}</span>
                </div>
            </div>
            <div class="order-actions">
                ${order.status === 'delivered' ? `
                    <button class="btn secondary-btn"><i class="fas fa-redo"></i> Reorder</button>
                    <button class="btn secondary-btn"><i class="fas fa-file-invoice"></i> Invoice</button>
                    <button class="btn secondary-btn"><i class="fas fa-star"></i> Review</button>
                ` : `
                    <button class="btn secondary-btn"><i class="fas fa-truck"></i> Track Order</button>
                    <button class="btn secondary-btn"><i class="fas fa-file-invoice"></i> Invoice</button>
                `}
            </div>
        </div>
    `;
}

// Function to filter orders by status
function filterOrders(status) {
    if (status === 'all') {
        return orders;
    }
    return orders.filter(order => order.status === status);
}

// Function to render orders
function renderOrders(status = 'all') {
    const filteredOrders = filterOrders(status);
    ordersList.innerHTML = filteredOrders.map(order => createOrderCard(order)).join('');
}

// Event Listeners
orderStatusLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        orderStatusLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get status from link text
        const status = link.textContent.toLowerCase();
        
        // Render filtered orders
        renderOrders(status === 'all orders' ? 'all' : status);
    });
});

// Handle order action buttons
ordersList.addEventListener('click', (e) => {
    const button = e.target.closest('.btn');
    if (!button) return;

    const orderCard = button.closest('.order-card');
    const orderId = orderCard.querySelector('.order-id').textContent.replace('Order #', '');
    
    if (button.querySelector('.fa-redo')) {
        // Handle reorder
        console.log('Reordering:', orderId);
        // Here you would typically add the items to cart
    } else if (button.querySelector('.fa-file-invoice')) {
        // Handle invoice download
        console.log('Downloading invoice for:', orderId);
        // Here you would typically generate and download the invoice
    } else if (button.querySelector('.fa-star')) {
        // Handle review
        console.log('Opening review form for:', orderId);
        // Here you would typically show a review form
    } else if (button.querySelector('.fa-truck')) {
        // Handle order tracking
        console.log('Tracking order:', orderId);
        // Here you would typically show tracking information
    }
});

// Initial render
renderOrders(); 