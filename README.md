# MERN Stack Online Store

## Description
This is a fully functional MERN (MongoDB, Express, React, Node.js) stack e-commerce application. The app enables users to browse products, add them to a cart, and toggle between light and dark themes. It uses modern libraries such as Material-UI and Framer Motion for styling and animations.

---

## Features
- **Dynamic Product List**: Fetch products from the backend and display them dynamically.
- **Cart Functionality**: Add, remove, increment, and decrement product quantities in the cart.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for various screen sizes using Material-UI.
- **Smooth Animations**: Utilizes Framer Motion for user-friendly animations.
- **Snackbar Alerts**: Feedback notifications for user interactions.
- **Image Placeholder**: Fallback image support for missing product images.

---

## Tech Stack
- **Frontend**:
  - React
  - Material-UI
  - Framer Motion
  - React Router
- **Backend**:
  - Node.js
  - Express
- **Database**:
  - MongoDB

---

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v14+)
- MongoDB
- Yarn or npm

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Nyamori2024/GO2COD_FD_02.git
   cd GO2COD_FD_02

   2. Install dependencies for both client and server:
   - **Frontend**:
     ```bash
     cd frontend
     npm install
     ```
   - **Backend**:
     ```bash
     cd ../backend
     npm install
     ```
3. Set up environment variables:
   Create a `.env` file in the `backend` folder and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000

4. Start the development servers:

**Backend:**
```bash
cd backend
npm start

**Frontend:**
cd ../frontend
npm start

## Usage

### Add Products
- Navigate to the product list on the home page.
- Click on "Add to Cart" for desired products.

### Manage Cart
- Navigate to the Cart page.
- Adjust product quantities or remove items as needed.
- View the total cost at the bottom of the page.

### Toggle Theme
- Click the 🌙/☀️ button in the navbar to switch between dark and light modes.

## Folder Structure

```plaintext
project/
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProductList.js
│   │   │   └── Cart.js
│   │   ├── theme.js
│   │   └── App.js
├── README.md

## Key Components

- **Navbar**: Displays navigation links for products and cart. Includes a theme toggle and a cart count badge.
- **Product List**: Fetches and displays products from the backend. Features animated cards and snackbar notifications.
- **Cart**: Lists products added to the cart. Includes options to increment, decrement, or remove items. Calculates the total dynamically.

## Future Enhancements
- Add user authentication.
- Implement a checkout process.
- Enhance error handling and user feedback.

## Contributing
Contributions are welcome!

