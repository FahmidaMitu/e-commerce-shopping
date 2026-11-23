# E-Commerce Shopping

## Project Description
E-Commerce Shopping is a responsive web application built with React.js, Redux Toolkit, and React Router. Users can browse products fetched from the FakeStore API, search by product name, filter by category, sort by price, view product details, and manage their shopping cart using Redux state management.

## Technologies Used
- **Frontend:** React.js (Vite), JavaScript (ES6+), CSS3
- **State Management:** Redux Toolkit (`configureStore`, `createSlice`), React-Redux (`useSelector`, `useDispatch`)
- **Routing:** React Router DOM (`BrowserRouter`, `Routes`, `Route`, `Link`, `useParams`)
- **API:** FakeStore API (`https://fakestoreapi.com/products` and `https://fakestoreapi.com/products/categories`)

## Main Features
- **Home Page:** Displays a responsive product grid with image, name, price, category, Add to Cart button, loading indicator, and error handling.
- **Product Details Page:** Displays full product image, title, price, category, description, and Add to Cart button via React Router.
- **Search, Filter & Sort:** Search products by name, filter by category, and sort price from Low to High or High to Low.
- **Shopping Cart:** Add/remove items, increase/decrease quantity, view item price & quantity, calculate subtotal and total price, handle empty cart state, and clear cart.
- **Navigation Bar:** Includes application name, Home link, Cart link, and live cart item count.

## Installation Instructions
Follow these steps to run the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/FahmidaMitu/e-commerce-shopping.git](https://github.com/FahmidaMitu/e-commerce-shopping.git)
   ```

2. **Navigate to the project directory:**
   ```bash
   cd e-commerce-shopping
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`.

## 🔗 Live Demo & Repository

- **Live Website:** [https://e-commerce-shopping-jade.vercel.app/]
- **GitHub Repository:** [https://github.com/FahmidaMitu/e-commerce-shopping.git]
