# E-Commerce Shopping

## Project Description
E-Commerce Shopping is a responsive web application built with React.js, Redux Toolkit, and React Router[cite: 1, 2]. Users can browse products fetched from the FakeStore API, search by product name, filter by category, sort by price, view product details, and manage their shopping cart using Redux state management[cite: 1, 2].

## Technologies Used
- **Frontend:** React.js (Vite), JavaScript (ES6+), CSS3[cite: 1]
- **State Management:** Redux Toolkit (`configureStore`, `createSlice`), React-Redux (`useSelector`, `useDispatch`)[cite: 2]
- **Routing:** React Router DOM (`BrowserRouter`, `Routes`, `Route`, `Link`, `useParams`)[cite: 1]
- **API:** FakeStore API (`https://fakestoreapi.com/products` and `https://fakestoreapi.com/products/categories`)[cite: 2]

## Main Features
- **Home Page:** Displays a responsive product grid with image, name, price, category, Add to Cart button, loading indicator, and error handling[cite: 1].
- **Product Details Page:** Displays full product image, title, price, category, description, and Add to Cart button via React Router[cite: 1].
- **Search, Filter & Sort:** Search products by name, filter by category, and sort price from Low to High or High to Low[cite: 1].
- **Shopping Cart:** Add/remove items, increase/decrease quantity, view item price & quantity, calculate subtotal and total price, handle empty cart state, and clear cart[cite: 1, 2].
- **Navigation Bar:** Includes application name, Home link, Cart link, and live cart item count[cite: 2].

## Installation Instructions
1. Clone the repository[cite: 3]:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/e-commerce-shopping.git](https://github.com/YOUR_USERNAME/e-commerce-shopping.git)