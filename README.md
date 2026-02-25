# ShopEZ-One-Stop-Shop-for-Online-Purchases

📘 Overview


ShopEZ is a full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a seamless and personalized online shopping experience for users and a powerful admin dashboard for sellers.

The platform allows users to browse products, filter items, add to cart, place orders securely, and track order history. Admins can manage products, monitor users, and oversee orders efficiently.

ShopEZ is designed to simplify product discovery, streamline checkout, and provide efficient order management for both customers and sellers.

_________________________________________________________________________________________________________________________________________________________________________________________________________________

🔍 Features

    👤 User Features


        🛍️ Browse and filter products.

        🔐 Secure user authentication (Register/Login).

        🛒 Add products to cart.

        💳 Secure checkout with address & payment details.

        📦 View order history in profile.

        📧 Order confirmation system.


👨‍💼 Admin Features

        📊 Admin dashboard.

        ➕ Add new products.

        📦 Manage all orders.

        👥 View registered users.

        🖼️ Manage banners and categories.

_________________________________________________________________________________________________________________________________________________________________________________________________________________


🧠 Technologies Used

    🌐 Frontend

        * React.js
        
        * React Router DOM
        
        * Axios
        
        * HTML5

        * CSS3

🖥️ Backend

    * Node.js

    * Express.js

    * JWT Authentication

    * bcrypt.js (Password Encryption)

🗄️ Database

    * MongoDB

    * Mongoose ODM

🛠️ Tools

    * VS Code

    * MongoDB Atlas / Compass

    * Postman (API Testing)

    * Git & GitHub
  _________________________________________________________________________________________________________________________________________________________________________________________________________________


  🏗️ Technical Architecture

       The application follows a 3-tier architecture:

           Frontend – React-based UI (User & Admin interface)

           Backend – REST APIs built using Express.js

           Database – MongoDB storing Users, Products, Cart, Orders, and Admin collections 

  _________________________________________________________________________________________________________________________________________________________________________________________________________________

📦 Project Structure

        ShopEZ-ecommerce-MERN/
              │
              ├── client/                     # React frontend
              │   ├── src/
              │   │   ├── components/
              │   │   ├── pages/
              │   │   ├── context/
              │   │   └── App.js
              │   └── package.json
              │
              ├── server/                     # Node + Express backend
              │   ├── models/
              │   ├── routes/
              │   ├── index.js
              │   └── package.json
              │
              └── README.md
    _________________________________________________________________________________________________________________________________________________________________________________________________________________

🚀 Getting Started

   ✅ Prerequisites

      * Node.js (v14+)

      * MongoDB (Atlas or Local)

      * Git

      * Internet connection
_________________________________________________________________________________________________________________________________________________________________________________________________________________

💻 Run the Project Locally

  1️⃣ Clone the Repository
  
                    git clone https://github.com/your-username/shopez-ecommerce-mern.git
                    cd shopez-ecommerce-mern

_________________________________________________________________________________________________________________________________________________________________________________________________________________

2️⃣ Setup Backend

       cd server
       npm install

_________________________________________________________________________________________________________________________________________________________________________________________________________________

Create .env file:


     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     PORT=5000

_________________________________________________________________________________________________________________________________________________________________________________________________________________

Run backend:

    node index.js


_________________________________________________________________________________________________________________________________________________________________________________________________________________

3️⃣ Setup Frontend

    Open new terminal:

          cd client
          npm install
          npm start

_________________________________________________________________________________________________________________________________________________________________________________________________________________


App will run at:

     http://localhost:3000


_________________________________________________________________________________________________________________________________________________________________________________________________________________

🔄 Application Flow

👤 User Flow


    1.Register / Login
 

    2.Browse products
 

    3.Filter products
 

    4.Add to cart


    5.Place order
 

    6.View order history
 

👨‍💼 Admin Flow


    1.Login as Admin
 

    2.Access dashboard
    

    3.Add new products
    

    4.View all orders
      

    5.Manage users


_________________________________________________________________________________________________________________________________________________________________________________________________________________

🗃️ Database Schemas


    User – Stores user details (username, email, password)
    

    Product – Stores product information
    

    Cart – Stores cart items per user
    

    Orders – Stores user orders
    

    Admin – Stores admin data like banner & categories
    


_________________________________________________________________________________________________________________________________________________________________________________________________________________


💡 Example Use Cases


    “Browse fashion accessories under ₹2000”
     

    “Add electronics item to cart”
    

    “Place order with cash on delivery”
    

    “Admin adds new product to inventory”
    
_________________________________________________________________________________________________________________________________________________________________________________________________________________


  🔐 Security Features

     Password encryption using bcrypt
     

     JWT-based authentication
     

     Protected admin routes
     

     CORS configuration
     

_________________________________________________________________________________________________________________________________________________________________________________________________________________


📸 Demo Screens

    Landing Page
    

    Product Listing Page
    

    Authentication Page
    

    Cart Page
    

    User Profile Page
    

    Admin Dashboard
    


_________________________________________________________________________________________________________________________________________________________________________________________________________________


🤝 Contribution


If you'd like to contribute:


    1.Fork the repository
    

    2.Create a new branch
    

    3.Commit your changes
    

    4.Submit a Pull Request
  


_________________________________________________________________________________________________________________________________________________________________________________________________________________


📄 License

  This project is licensed under the MIT License.  


_________________________________________________________________________________________________________________________________________________________________________________________________________________



🧩 Acknowledgments


  * MongoDB for database services


  * React.js & Node.js communities


  * Express.js framework


  * MERN stack open-source ecosystem

  _________________________________________________________________________________________________________________________________________________________________________________________________________________
