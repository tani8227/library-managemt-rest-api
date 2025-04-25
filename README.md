A RESTful API to manage books, users, borrowing/returning of books, and library inventories. The API supports multilingual features, role-based access control (RBAC), and JWT authentication.

Features
Book Management: Create, read, update, and delete books.

User Management: Register authors and borrowers, authenticate users, and issue JWT tokens.

Borrowing System: Borrow and return books.

Library Management: Create, read, update, and delete libraries.

Inventory Management: Add and remove books in the library's inventory.

Security: JWT-based authentication with role-based access control.

API Endpoints
Books
GET /api/books

Retrieve a list of all books.

GET /api/books/:id

Retrieve details of a specific book by its ID, including associated Library, Author, and Borrower information.

POST /api/books

Create a new book entry.

PUT /api/books/:id

Update details of a specific book by its ID.

DELETE /api/books/:id

Delete a book by its ID.

Users
POST /api/users/register

Register a new user (both authors and borrowers).

POST /api/users/login

Authenticate the user and generate a JWT token.

Borrowing
POST /api/borrow

Borrow a book against a charge.

PUT /api/return/:id

Return a borrowed book by its ID.

Libraries
GET /api/libraries

Retrieve a list of all libraries.

GET /api/libraries/:id

Retrieve details of a specific library by its ID, including details of all Books owned by the Library. Each Book object should include the Borrower details.

POST /api/libraries

Create a new library.

PUT /api/libraries/:id

Update details of a specific library by its ID.

DELETE /api/libraries/:id

Delete a library by its ID.

Library Inventory
GET /api/libraries/:id/inventory

Retrieve a list of books available in a specific library.

POST /api/libraries/:id/inventory

Add a book to the inventory of a specific library.

DELETE /api/libraries/:id/inventory/:bookId

Remove a book from the inventory of a specific library by its ID.

Setup and Installation
Clone the repository:

git clone <repository_url>
cd <project_folder>
Install dependencies:


npm install
Configure environment variables:

Create a .env file in the root of the project and set up the necessary environment variables:

DB_URI=<your_mongo_db_uri>
JWT_SECRET=<your_jwt_secret_key>
IMAGE_STORAGE_BUCKET=<your_firebase_storage_bucket>
Start the application:

npm start
Authentication
The API uses JWT authentication. To authenticate, send a POST request to /api/users/login with the following body:

json
{
  "username": "<your_username>",
  "password": "<your_password>"
}
Upon successful login, you'll receive a JWT token. Include this token in the Authorization header for protected endpoints:

makefile

Authorization: Bearer <your_token>
Role-based Access Control
Admin: Full access to manage libraries, books, and users.

Author: Can manage their own books.

Borrower: Can borrow and return books.

Languages
This API supports multilingual features. You can configure language preferences for different users in the settings of the application.

Tech Stack
Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT
