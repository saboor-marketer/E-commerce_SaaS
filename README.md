# 🛒 ShopHub - Premium E-Commerce SaaS Application

A modern, production-quality React.js e-commerce SaaS web application with exceptional UI/UX. ShopHub provides a complete shopping experience with product browsing, cart management, checkout flow, and user dashboard features.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=flat-square&logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=flat-square&logo=bootstrap)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

### 🏠 **Home Page**
- Modern hero section with compelling CTAs
- Featured products showcase
- Product categories with visual cards
- Benefits/features section
- Customer testimonials
- Promotional banners
- Newsletter subscription
- Professional footer

### 🛍️ **Shop Page**
- Responsive product grid
- Real-time search functionality
- Category filtering
- Price range filtering
- Multiple sorting options (Featured, Price, Rating, Newest)
- Loading skeletons
- Empty state handling
- Mobile-friendly filter sidebar

### 📦 **Product Details**
- Large product image gallery
- Product information and specifications
- Discount badges
- Star ratings with review counts
- Quantity selector
- Fully functional "Add to Cart" button
- Related products section
- Stock status indicators
- Product tabs (Description, Specifications, Reviews)

### 🛒 **Shopping Cart**
- Complete cart functionality
- Quantity management (increase/decrease)
- Individual item removal
- Clear entire cart option
- Automatic calculations:
  - Subtotal
  - Tax (8%)
  - Shipping (free over $100)
  - Grand total
- **localStorage persistence** (survives page refresh)
- Real-time cart badge updates
- Trust badges and security indicators

### 💳 **Checkout**
- Multi-step checkout form
- Customer information collection
- Shipping address form
- Multiple payment methods (Card, PayPal)
- Form validation
- Order summary with item preview
- Secure payment indicators
- Order confirmation screen
- Order ID generation

### 🔐 **Authentication**
- Login page with form validation
- Registration with password confirmation
- Forgot password flow
- Mock authentication system
- Remember me functionality
- Social login buttons (UI ready)

### 📊 **User Dashboard (SaaS Features)**
- Analytics cards (Total Orders, Total Spent, Pending Orders, Wishlist)
- Recent orders table
- Quick action buttons
- Account information display
- Order status tracking
- Professional dashboard layout

### 👤 **Profile Management**
- Personal information editing
- Address management
- Profile picture display
- Settings interface
- Form validation and saving

### 📋 **Order History**
- Complete order listing
- Search by order ID
- Status filtering (Processing, Shipped, Delivered)
- Order details preview
- Item thumbnails
- Status badges with icons

### 🎨 **UI/UX Excellence**
- Premium modern design
- Clean typography and spacing
- Consistent color scheme
- Smooth animations and transitions
- Hover effects and micro-interactions
- Loading skeletons for better perceived performance
- Empty states for user guidance
- Toast notifications for user feedback
- Responsive design (mobile-first)
- Accessible color contrast
- Professional card layouts
- Sticky navigation
- Mobile-friendly menu

## 🚀 Technology Stack

- **React.js 18.3.1** - Frontend framework
- **Vite 5.4.10** - Build tool and development server
- **React Router DOM 6.26.2** - Client-side routing
- **Context API** - State management
- **Bootstrap 5.3.3** - UI component library
- **React Icons 5.3.0** - Icon library
- **JavaScript (ES6+)** - Modern JavaScript features

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Toast.jsx          # Toast notifications
│   │   ├── Loading.jsx        # Loading skeletons
│   │   └── EmptyState.jsx     # Empty state component
│   ├── layout/
│   │   ├── Navbar.jsx         # Navigation bar
│   │   └── Footer.jsx         # Footer component
│   ├── product/
│   │   └── ProductCard.jsx    # Product card component
│   └── cart/
│       └── CartItem.jsx       # Cart item component
├── context/
│   ├── CartContext.jsx        # Cart state management
│   └── AuthContext.jsx        # Authentication state
├── pages/
│   ├── Home.jsx               # Home page
│   ├── Shop.jsx               # Shop page
│   ├── ProductDetails.jsx     # Product details page
│   ├── Cart.jsx               # Cart page
│   ├── Checkout.jsx           # Checkout page
│   ├── Login.jsx              # Login page
│   ├── Register.jsx           # Register page
│   ├── ForgotPassword.jsx     # Forgot password page
│   ├── Dashboard.jsx          # User dashboard
│   ├── Profile.jsx            # Profile management
│   ├── Orders.jsx             # Order history
│   └── NotFound.jsx           # 404 page
├── data/
│   └── products.js            # Product data, categories, testimonials
├── styles/
│   └── index.css              # Custom CSS styles
├── App.jsx                    # Main app with routing
└── main.jsx                   # Application entry point
```

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone or download the project**
   ```bash
   cd "E-commerce SaaS"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 Usage

### Browsing Products
- Navigate to the **Shop** page to browse all products
- Use the search bar to find specific products
- Filter by category, price range, or sort by various options
- Click on any product to view detailed information

### Shopping Cart
- Click the cart icon or "Add to Cart" button
- Adjust quantities using + and - buttons
- Remove items individually or clear the entire cart
- Cart data persists even after closing the browser

### Checkout
- Proceed to checkout from the cart page
- Fill in customer information and shipping address
- Select payment method (Card or PayPal)
- Review order summary
- Place order and receive confirmation

### User Account
- Register a new account or login with existing credentials
- Access the dashboard to view order history and analytics
- Manage profile information and addresses
- Track order status and view order details

## 🎯 Key Functionality

### Cart Features
- ✅ Add products to cart
- ✅ Update cart badge count in real-time
- ✅ Increase/decrease quantities
- ✅ Prevent quantity from going below 1
- ✅ Remove individual products
- ✅ Clear entire cart
- ✅ Automatic calculations (subtotal, tax, shipping, total)
- ✅ **localStorage persistence**
- ✅ Navigate correctly to cart page
- ✅ Duplicate product handling (increases quantity)

### State Management
- **CartContext**: Manages shopping cart state and operations
- **AuthContext**: Manages user authentication and profile data
- Both contexts use localStorage for data persistence

### Routing
All routes are handled by React Router:
- `/` - Home page
- `/shop` - Shop page
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/login` - User login
- `/register` - User registration
- `/forgot-password` - Password recovery
- `/dashboard` - User dashboard
- `/profile` - Profile management
- `/orders` - Order history
- `*` - 404 Not Found page

## 🎨 Customization

### Product Data
Edit `src/data/products.js` to add, modify, or remove products:

```javascript
{
  id: 1,
  name: "Product Name",
  price: 99.99,
  originalPrice: 129.99,
  category: "Electronics",
  rating: 4.5,
  reviews: 100,
  image: "image-url",
  description: "Product description",
  featured: true,
  stock: 50
}
```

### Styling
Custom styles are in `src/styles/index.css`. Key CSS variables are defined at the top for easy theming:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #0ea5e9;
  --accent-color: #f59e0b;
  /* ... more variables */
}
```

### Configuration
- `vite.config.js` - Vite configuration
- `package.json` - Dependencies and scripts

## 🔐 Authentication

The application uses mock authentication:
- User data is stored in localStorage
- No real backend is required
- Sessions persist across browser refreshes
- Demo credentials: any email/password combination works

## 📦 Product Data

The application includes:
- **24 realistic products** across 5 categories
- **5 category cards** with images
- **3 customer testimonials**
- Products include: Electronics, Fashion, Home & Living, Technology, Accessories

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

The application is fully responsive:
- **Mobile-first approach**
- Breakpoints: 576px, 768px, 992px, 1200px
- Touch-friendly interface
- Optimized for various screen sizes

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.).

### Dependencies Issues
If you encounter dependency issues:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### localStorage Not Persisting
Ensure cookies are enabled in your browser, as localStorage requires them to function properly.

## 🤝 Contributing

This is a demo project. For improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React.js and modern web technologies.

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- UI components from [Bootstrap](https://getbootstrap.com)

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the code comments
- Open an issue in the repository

---

**Note**: This is a frontend-only demo application. For production use, you would need to integrate with a real backend API, payment gateway, and database system.

Built with modern React practices and focused on providing an exceptional user experience. 🚀
