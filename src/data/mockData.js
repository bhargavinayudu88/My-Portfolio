export const mockProducts = [
  {
    id: '1',
    name: 'Organic Bananas',
    description: 'Fresh organic bananas, perfect for smoothies and snacks',
    price: 2.99,
    originalPrice: 3.49,
    category: 'Groceries',
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    stock: 50
  },
  {
    id: '2',
    name: 'Premium Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt in various colors',
    price: 24.99,
    originalPrice: 29.99,
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.3,
    reviews: 89,
    inStock: true,
    stock: 25
  },
  {
    id: '3',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    stock: 15
  },
  {
    id: '4',
    name: 'Modern Office Chair',
    description: 'Ergonomic office chair with lumbar support',
    price: 199.99,
    originalPrice: 249.99,
    category: 'Furniture',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    reviews: 67,
    inStock: true,
    stock: 8
  },
  {
    id: '5',
    name: 'Natural Face Moisturizer',
    description: 'Hydrating face moisturizer with natural ingredients',
    price: 34.99,
    originalPrice: 39.99,
    category: 'Cosmetics',
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 156,
    inStock: true,
    stock: 30
  },
  {
    id: '6',
    name: 'Fresh Avocados',
    description: 'Ripe avocados perfect for guacamole and toast',
    price: 4.99,
    category: 'Groceries',
    image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.2,
    reviews: 93,
    inStock: true,
    stock: 40
  },
  {
    id: '7',
    name: 'Denim Jacket',
    description: 'Classic denim jacket for casual wear',
    price: 59.99,
    originalPrice: 69.99,
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.1,
    reviews: 45,
    inStock: true,
    stock: 12
  },
  {
    id: '8',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking',
    price: 149.99,
    originalPrice: 199.99,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviews: 178,
    inStock: true,
    stock: 20
  },
  {
    id: '9',
    name: 'Wooden Coffee Table',
    description: 'Rustic wooden coffee table for living room',
    price: 299.99,
    category: 'Furniture',
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.3,
    reviews: 34,
    inStock: true,
    stock: 5
  },
  {
    id: '10',
    name: 'Vitamin C Serum',
    description: 'Anti-aging vitamin C serum for glowing skin',
    price: 29.99,
    category: 'Cosmetics',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 267,
    inStock: true,
    stock: 45
  },
  {
    id: '11',
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt high in protein',
    price: 5.99,
    category: 'Groceries',
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    reviews: 112,
    inStock: true,
    stock: 35
  },
  {
    id: '12',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for daily workouts',
    price: 89.99,
    originalPrice: 109.99,
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 203,
    inStock: true,
    stock: 18
  }
]

export const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 156.97,
    items: [
      { id: '1', name: 'Organic Bananas', quantity: 2, price: 2.99 },
      { id: '3', name: 'Wireless Bluetooth Headphones', quantity: 1, price: 79.99 }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'shipped',
    total: 89.98,
    items: [
      { id: '2', name: 'Premium Cotton T-Shirt', quantity: 2, price: 24.99 },
      { id: '5', name: 'Natural Face Moisturizer', quantity: 1, price: 34.99 }
    ]
  }
]