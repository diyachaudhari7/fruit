export const MOCK_DATA = {
  categories: [
    { id: 'c1', name: 'Fresh Fruits', icon: 'Apple' },
    { id: 'c2', name: 'Vegetables', icon: 'Carrot' },
    { id: 'c3', name: 'Exotic', icon: 'Star' },
    { id: 'c4', name: 'Bundles', icon: 'Package' },
    { id: 'c5', name: 'Dairy & Eggs', icon: 'Egg' },
    { id: 'c6', name: 'Meat & Poultry', icon: 'Drumstick' },
    { id: 'c7', name: 'Bakery', icon: 'Croissant' },
    { id: 'c8', name: 'Beverages', icon: 'Coffee' },
  ],
  products: [
    { id: 'p1', categoryId: 'c1', name: 'Organic Apples', price: 4.99, unit: 'kg', rating: 4.8, image: 'https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Fresh, crisp, and sweet organic apples sourced locally.' },
    { id: 'p2', categoryId: 'c1', name: 'Bananas', price: 1.99, unit: 'kg', rating: 4.5, image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Perfectly ripe bananas, great for snacking and baking.' },
    { id: 'p3', categoryId: 'c2', name: 'Fresh Carrots', price: 2.49, unit: 'kg', rating: 4.7, image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Crunchy and sweet carrots, ideal for salads and cooking.' },
    { id: 'p4', categoryId: 'c2', name: 'Broccoli', price: 3.99, unit: 'head', rating: 4.6, image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Nutrient-rich broccoli crowns.' },
    { id: 'p5', categoryId: 'c3', name: 'Dragon Fruit', price: 6.99, unit: 'piece', rating: 4.9, image: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Vibrant and sweet exotic dragon fruit.' },
    { id: 'p6', categoryId: 'c1', name: 'Strawberries', price: 5.99, unit: 'box', rating: 4.8, image: 'https://images.pexels.com/photos/8243/food-berries-sweet-red.jpg?auto=compress&cs=tinysrgb&w=400', description: 'Juicy, sweet strawberries perfect for desserts.' },
    { id: 'p7', categoryId: 'c1', name: 'Oranges', price: 3.49, unit: 'kg', rating: 4.6, image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Citrusy, fresh oranges packed with Vitamin C.' },
    { id: 'p8', categoryId: 'c2', name: 'Spinach', price: 2.99, unit: 'bunch', rating: 4.7, image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Fresh leafy spinach leaves.' },
    { id: 'p9', categoryId: 'c4', name: 'Weekend Veggie Pack', price: 15.99, unit: 'bundle', rating: 4.9, image: 'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'A complete mix of essential vegetables for the weekend.' },
    { id: 'p10', categoryId: 'c5', name: 'Farm Fresh Eggs', price: 4.50, unit: 'dozen', rating: 4.8, image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Free range brown eggs.' },
    { id: 'p11', categoryId: 'c6', name: 'Free Range Chicken', price: 9.99, unit: 'kg', rating: 4.8, image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Fresh, organic free-range whole chicken.' },
    { id: 'p12', categoryId: 'c6', name: 'Premium Beef Steak', price: 18.50, unit: 'kg', rating: 4.9, image: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'High-quality tender beef steak cuts.' },
    { id: 'p13', categoryId: 'c7', name: 'Sourdough Bread', price: 5.49, unit: 'loaf', rating: 4.9, image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Artisan baked sourdough bread, crispy crust and soft inside.' },
    { id: 'p14', categoryId: 'c7', name: 'Butter Croissant', price: 2.99, unit: 'piece', rating: 4.7, image: 'https://images.pexels.com/photos/372886/pexels-photo-372886.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Flaky and buttery authentic French croissants.' },
    { id: 'p15', categoryId: 'c8', name: 'Fresh Orange Juice', price: 4.50, unit: 'bottle', rating: 4.8, image: 'https://images.pexels.com/photos/158053/fresh-orange-juice-squeezed-refreshing-citrus-158053.jpeg?auto=compress&cs=tinysrgb&w=400', description: '100% freshly squeezed orange juice, no added sugar.' },
    { id: 'p16', categoryId: 'c8', name: 'Almond Milk', price: 3.99, unit: 'carton', rating: 4.6, image: 'https://images.pexels.com/photos/3642537/pexels-photo-3642537.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Unsweetened original almond milk, dairy-free.' },
    { id: 'p17', categoryId: 'c1', name: 'Grapes', price: 4.99, unit: 'bunch', rating: 4.7, image: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Sweet and seedless green grapes.' },
    { id: 'p18', categoryId: 'c2', name: 'Tomatoes', price: 3.49, unit: 'kg', rating: 4.5, image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Vine-ripened red tomatoes perfect for salads.' },
    { id: 'p19', categoryId: 'c3', name: 'Mangoes', price: 5.99, unit: 'kg', rating: 4.9, image: 'https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Sweet and juicy tropical mangoes.' },
    { id: 'p20', categoryId: 'c5', name: 'Organic Milk', price: 3.50, unit: 'gallon', rating: 4.8, image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Whole organic milk from grass-fed cows.' }
  ],
  orders: [
    { id: 'ORD-1234', date: '2026-08-15', total: 14.46, status: 'Delivered', items: 3 },
    { id: 'ORD-1235', date: '2026-08-18', total: 8.98, status: 'Out for Delivery', items: 2 },
    { id: 'ORD-1236', date: '2026-08-10', total: 24.50, status: 'Delivered', items: 6 },
  ],
  farms: [
    { id: 'f1', name: 'Green Valley Farms', location: 'California, USA', rating: 4.8, image: 'https://images.pexels.com/photos/158148/nature-landscape-agriculture-farm-158148.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'f2', name: 'Sunny Harvest', location: 'Florida, USA', rating: 4.7, image: 'https://images.pexels.com/photos/259280/pexels-photo-259280.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'f3', name: 'Organic Gardens', location: 'Texas, USA', rating: 4.9, image: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'f4', name: 'Nature\'s Basket', location: 'Washington, USA', rating: 4.8, image: 'https://images.pexels.com/photos/347141/pexels-photo-347141.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  testimonials: [
    { id: 't1', quote: "The quality of fruits and vegetables from Freshly is outstanding! Everything is always fresh and delivery is super fast.", author: "Sarah Johnson" },
    { id: 't2', quote: "I love the Subscribe & Save feature. It makes my weekly grocery shopping so much easier and cheaper.", author: "Michael Chang" },
    { id: 't3', quote: "Best organic produce I have ever bought online. The packaging is eco-friendly and keeps everything intact.", author: "Emily Davis" }
  ]
};
