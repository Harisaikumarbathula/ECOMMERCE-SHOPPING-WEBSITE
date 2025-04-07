// Local product data for offline use
const localProducts = {
    trending: [
        {
            id: "1",
            title: "Classic Blue Denim Jacket",
      price: 1299,
            category: "Men's Fashion",
            image: "images/products/denim-jacket.jpg"
        },
        {
            id: "2",
      title: "Floral Summer Dress",
      price: 1999,
            category: "Women's Fashion",
            image: "images/products/summer-dress.jpg"
        },
        {
            id: "3",
            title: "Kids Sports Shoes",
            price: 899,
            category: "Kids Fashion",
            image: "images/products/kids-shoes.jpg"
        },
        {
            id: "4",
            title: "Natural Face Cream",
            price: 499,
            category: "Skincare",
            image: "images/products/face-cream.jpg"
        }
    ],
    "new-arrivals": [
        {
            id: "5",
            title: "Designer Leather Bag",
            price: 2499,
            category: "Women's Fashion",
            image: "images/products/leather-bag.jpg"
        },
        {
            id: "6",
            title: "Men's Casual Shirt",
      price: 799,
            category: "Men's Fashion",
            image: "images/products/casual-shirt.jpg"
        }
    ],
    "best-sellers": [
        {
            id: "7",
            title: "Premium Watch",
            price: 3999,
            category: "Men's Fashion",
            image: "images/products/watch.jpg"
        },
        {
            id: "8",
            title: "Kids School Bag",
            price: 599,
            category: "Kids Fashion",
            image: "images/products/school-bag.jpg"
        }
    ]
};

// Function to get products by category
function getProductsByCategory(category) {
    return localProducts[category] || [];
}

// Function to get all products
function getAllProducts() {
    return Object.values(localProducts).flat();
}

// Function to get product by ID
function getProductById(id) {
    return getAllProducts().find(product => product.id === id);
}

