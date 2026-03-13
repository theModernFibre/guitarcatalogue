# Guitar Catalogue

A minimalistic React + Express CRUD app: browse guitar products, view details, and manage inventory from an admin dashboard.

## Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router
- **Backend:** Node.js, Express
- **Data:** JSON file store (no database required)

## Run the app

From the project root:

```bash
# Install all dependencies (once)
npm run install:all

# Start API server and React dev server together
npm run dev
```

- **Catalogue (frontend):** http://localhost:5173  
- **API:** http://localhost:3001  

To run only the server or only the client:

```bash
npm run server   # API on port 3001
npm run client   # Vite on port 5173
```

## Features

- **Catalogue:** Grid of guitar products with hover animation; responsive.
- **Product page:** Dedicated page per product with description, price, category, SKU, and stock.
- **Admin dashboard:** Add, edit, and delete products; set name, brand, category, description, price, image URL, SKU, and stock (inventory).

## Project structure

```
catalogue/
├── client/          # React app (Vite + Tailwind)
│   └── src/
│       ├── api/     # API helpers
│       ├── components/
│       └── pages/   # Catalogue, ProductDetail, Admin
├── server/          # Express API
│   ├── data/        # products.json (created on first run)
│   └── routes/
├── package.json     # Root scripts (dev, server, client)
└── README.md
```
