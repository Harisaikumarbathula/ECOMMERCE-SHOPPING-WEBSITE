document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mainNav = document.querySelector(".main-nav")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active")
      if (mainNav.classList.contains("active")) {
        mainNav.style.display = "block"
      } else {
        mainNav.style.display = ""
      }
    })
  }

  // Search Overlay Toggle
  const searchIcon = document.getElementById("search-icon")
  const searchOverlay = document.querySelector(".search-overlay")
  const closeSearch = document.querySelector(".close-search")

  if (searchIcon && searchOverlay && closeSearch) {
    searchIcon.addEventListener("click", (e) => {
      e.preventDefault()
      searchOverlay.classList.add("active")
    })

    closeSearch.addEventListener("click", () => {
      searchOverlay.classList.remove("active")
    })
  }

  // Featured Tab Switching
  const featuredTabs = document.querySelectorAll(".featured-tab")

  if (featuredTabs.length > 0) {
    featuredTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        featuredTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        this.classList.add("active")

        // Load products based on the selected category
        const category = this.getAttribute("data-category")
        loadFeaturedProducts(category)
      })
    })

    // Load default category (trending)
    loadFeaturedProducts("trending")
  }

  // Wishlist Toggle
  document.addEventListener("click", (e) => {
    if (e.target.closest(".product-wishlist")) {
      e.preventDefault()
      const wishlistBtn = e.target.closest(".product-wishlist")
      const productCard = wishlistBtn.closest(".product-card")
      const productId = parseInt(productCard.dataset.id)
      
      wishlistBtn.classList.toggle("active")
      toggleFavorite(productId)
    }
  })

  // Initialize Cart Count
  updateCartCount()

  // Add to Cart functionality
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      e.preventDefault()

      const productCard = e.target.closest(".product-card")
      if (productCard) {
        const productId = productCard.getAttribute("data-id")
        const productTitle = productCard.querySelector(".product-title").textContent
        const productPrice = productCard.querySelector(".product-price").textContent.trim()
        const productImage = productCard.querySelector(".product-image img").getAttribute("src")

        addToCart(productId, productTitle, productPrice, productImage)
        updateCartCount()

        // Show success notification
        showNotification(`${productTitle} added to cart`)
      }
    }
  })

  // Newsletter form submission
  const newsletterForm = document.getElementById("newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')
      if (emailInput && emailInput.value) {
        showNotification("Thank you for subscribing to our newsletter!")
        emailInput.value = ""
      }
    })
  }

  // Price range slider on category pages
  const priceSlider = document.querySelector(".price-slider")

  if (priceSlider) {
    priceSlider.addEventListener("input", function () {
      const priceDisplay = document.querySelector(".price-display")
      if (priceDisplay) {
        priceDisplay.textContent = `₹0 - ₹${this.value}`
      }
    })
  }

  // Clear filters button
  const clearFiltersBtn = document.querySelector(".clear-filters")

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      const filterOptions = document.querySelectorAll('.filter-option input[type="checkbox"]')
      filterOptions.forEach((option) => {
        option.checked = false
      })

      if (priceSlider) {
        priceSlider.value = priceSlider.max
        const priceDisplay = document.querySelector(".price-display")
        if (priceDisplay) {
          priceDisplay.textContent = `₹0 - ₹${priceSlider.max}`
        }
      }
    })
  }

  // Quantity buttons in cart
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("quantity-btn")) {
      const input = e.target.parentElement.querySelector(".quantity-input")
      let value = Number.parseInt(input.value)

      if (e.target.textContent === "+") {
        value = value + 1
      } else if (e.target.textContent === "-" && value > 1) {
        value = value - 1
      }

      input.value = value

      // Update cart item total
      const cartItem = e.target.closest(".cart-item")
      if (cartItem) {
        updateCartItemTotal(cartItem, value)
        updateCartSummary()
      }
    }
  })

  // Remove item from cart
  document.addEventListener("click", (e) => {
    if (e.target.closest(".remove-item")) {
      const cartItem = e.target.closest(".cart-item")
      if (cartItem) {
        cartItem.remove()
        updateCartSummary()
        updateCartCount()

        // Show empty cart message if no items left
        const cartItems = document.querySelectorAll(".cart-item")
        if (cartItems.length === 0) {
          const cartItemsContainer = document.querySelector(".cart-items")
          if (cartItemsContainer) {
            cartItemsContainer.innerHTML = `
                            <div class="cart-empty">
                                <i class="fas fa-shopping-cart"></i>
                                <h2>Your cart is empty</h2>
                                <p>Looks like you haven't added anything to your cart yet.</p>
                                <a href="index.html" class="btn primary-btn">Continue Shopping</a>
                            </div>
                        `

            const cartContent = document.querySelector(".cart-content")
            if (cartContent) {
              cartContent.style.display = "block"
            }
          }
        }
      }
    }
  })

  // Aside Bar Functionality
  const asideBar = document.querySelector('.aside-bar');
  const asideOverlay = document.querySelector('.aside-overlay');
  const closeAsideBtn = document.querySelector('.close-aside');

  // Function to open aside bar
  function openAside() {
    asideBar.classList.add('active');
    asideOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Function to close aside bar
  function closeAside() {
    asideBar.classList.remove('active');
    asideOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event listeners
  mobileMenuBtn.addEventListener('click', openAside);
  closeAsideBtn.addEventListener('click', closeAside);
  asideOverlay.addEventListener('click', closeAside);

  // Close aside bar on window resize if open
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeAside();
    }
  });

  // Initialize wishlist count
  updateWishlistCount();
})

// Dummy function to simulate fetching random products (replace with your actual data source)
function getRandomProducts(count, type = "normal") {
  const products = []
  for (let i = 0; i < count; i++) {
    const id = Math.random().toString(36).substring(2, 15)
    const title = `Product ${i + 1}`
    const price = Math.floor(Math.random() * 1000) + 100
    const category = "Generic"
    const image = `https://via.placeholder.com/150` // Replace with actual image URLs

    products.push({ id, title, price, category, image })
  }
  return products
}

// Function to load featured products based on category
function loadFeaturedProducts(category) {
  const productsContainer = document.getElementById("featured-products")

  if (productsContainer) {
    // Simulate loading state
    productsContainer.innerHTML = '<div class="loading">Loading products...</div>'

    // Simulate API call delay
    setTimeout(() => {
      let products

      // Get products based on category (this would normally be from an API)
      if (category === "trending") {
        products = getRandomProducts(8)
      } else if (category === "new-arrivals") {
        products = getRandomProducts(8, "new-arrivals")
      } else if (category === "best-sellers") {
        products = getRandomProducts(8, "new-arrivals")
      }

      // Render products
      renderProducts(productsContainer, products)
    }, 500)
  }
}

// Function to render products to a container
function renderProducts(container, products) {
  let html = ""

  products.forEach((product) => {
    html += `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-wishlist">
                        <i class="far fa-heart"></i>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">₹${product.price.toFixed(2)}</div>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `
  })

  container.innerHTML = html
}

// Function to get cart from localStorage with error handling
function getCart() {
  try {
    const cart = localStorage.getItem("shopmart-cart")
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error("Error reading cart from localStorage:", error)
    return []
  }
}

// Function to save cart to localStorage with error handling
function saveCart(cart) {
  try {
    localStorage.setItem("shopmart-cart", JSON.stringify(cart))
  } catch (error) {
    console.error("Error saving cart to localStorage:", error)
    showNotification("Error saving cart. Please try again.")
  }
}

// Function to add product to cart with validation and optimization
function addToCart(id, title, price, image) {
  const cart = getCart()
  
  // Validate input parameters
  if (!id || !title || !price || !image) {
    showNotification("Invalid product data. Please try again.")
    return
  }

  // Extract numeric price value with validation
  const priceValue = Number.parseFloat(price.replace("₹", ""))
  if (isNaN(priceValue) || priceValue <= 0) {
    showNotification("Invalid price. Please try again.")
    return
  }

  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex((item) => item.id === id)

  if (existingItemIndex !== -1) {
    // Increment quantity if product already in cart (with max limit)
    if (cart[existingItemIndex].quantity < 10) {
      cart[existingItemIndex].quantity += 1
    } else {
      showNotification("Maximum quantity limit reached for this item.")
      return
    }
  } else {
    // Add new product to cart
    cart.push({
      id,
      title,
      price: priceValue,
      image,
      quantity: 1,
    })
  }

  saveCart(cart)
  updateCartCount()
  showNotification(`${title} added to cart`)
}

// Function to remove item from cart with validation
function removeFromCart(id) {
  const cart = getCart()
  const itemIndex = cart.findIndex((item) => item.id === id)
  
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1)
    saveCart(cart)
    updateCartCount()
    return true
  }
  return false
}

// Function to update cart item quantity with validation
function updateCartItemQuantity(id, newQuantity) {
  const cart = getCart()
  const itemIndex = cart.findIndex((item) => item.id === id)
  
  if (itemIndex !== -1 && newQuantity >= 1 && newQuantity <= 10) {
    cart[itemIndex].quantity = newQuantity
    saveCart(cart)
    updateCartCount()
    return true
  }
  return false
}

// Function to update cart count display
function updateCartCount() {
  const cart = getCart()
  const cartCount = document.querySelector(".cart-count")

  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = totalItems
  }
}

// Function to update cart item total price
function updateCartItemTotal(cartItem, quantity) {
  const priceElement = cartItem.querySelector(".cart-item-price")
  const totalElement = cartItem.querySelector(".cart-item-total")

  if (priceElement && totalElement) {
    const price = Number.parseFloat(priceElement.textContent.replace("₹", ""))
    const total = price * quantity
    totalElement.textContent = `₹${total.toFixed(2)}`
  }
}

// Function to update cart summary with optimized calculations
function updateCartSummary() {
    const subtotalElement = document.getElementById("summary-subtotal");
    const taxElement = document.getElementById("summary-tax");
    const shippingElement = document.getElementById("summary-shipping");
    const totalElement = document.getElementById("summary-total");

    if (!subtotalElement || !taxElement || !shippingElement || !totalElement) {
        return;
    }

    // Get cart items from localStorage instead of DOM
    const cart = getCart();
    
    // Calculate subtotal using reduce for better performance
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate tax and shipping
    const tax = subtotal * 0.18; // 18% tax
    const shipping = subtotal > 1000 ? 0 : 100; // Free shipping over ₹1000
    const total = subtotal + tax + shipping;

    // Update summary values with formatted numbers
    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    taxElement.textContent = `₹${tax.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;

    // Update cart count in header
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Function to show notification
function showNotification(message) {
  // Create notification element if it doesn't exist
  let notification = document.querySelector(".notification")

  if (!notification) {
    notification = document.createElement("div")
    notification.className = "notification"
    document.body.appendChild(notification)

    // Add styles
    notification.style.position = "fixed"
    notification.style.bottom = "20px"
    notification.style.right = "20px"
    notification.style.backgroundColor = "var(--accent-color)"
    notification.style.color = "white"
    notification.style.padding = "12px 20px"
    notification.style.borderRadius = "4px"
    notification.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)"
    notification.style.zIndex = "1000"
    notification.style.transition = "transform 0.3s ease, opacity 0.3s ease"
    notification.style.transform = "translateY(100px)"
    notification.style.opacity = "0"
  }

  // Set message and show notification
  notification.textContent = message
  notification.style.transform = "translateY(0)"
  notification.style.opacity = "1"

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateY(100px)"
    notification.style.opacity = "0"
  }, 3000)
}

// Wishlist Functions
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function toggleFavorite(productId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(productId);
    
    if (index === -1) {
        favorites.push(productId);
        showNotification('Added to favorites');
    } else {
        favorites.splice(index, 1);
        showNotification('Removed from favorites');
    }
    
    saveFavorites(favorites);
    updateWishlistCount();
}

function updateWishlistCount() {
    const favorites = getFavorites();
    const wishlistIcon = document.getElementById('wishlist-icon');
    if (wishlistIcon) {
        const count = favorites.length;
        if (count > 0) {
            wishlistIcon.setAttribute('data-count', count);
        } else {
            wishlistIcon.removeAttribute('data-count');
        }
    }
}

