# SchoolBooks - Online Book Store

A modern, customer-facing e-commerce website for school books and educational materials. Students, parents, and schools can browse, search, and order books online. Built with Next.js 15, TypeScript, Tailwind CSS, and integrates with a Spring Boot backend.

## Features

### ✅ Implemented
- **Customer Homepage**: Beautiful hero section with featured books and educational board navigation
- **Book Catalog**: Complete shop page with advanced filtering and search
  - Filter by board (CBSE, ICSE, State Board, etc.)
  - Filter by grade (1-12)
  - Filter by subject and price range
  - Search by title, author, or subject
  - Grid and list view modes
  - Sort by name, price, and grade
- **Categories Page**: Browse books by categories with visual cards
  - Quick subject navigation with icons
  - Browse by grade levels
  - Category-wise book organization
- **About Page**: Company information and mission
- **Contact Page**: Contact form and business information
- **Modern UI**: Beautiful, responsive e-commerce design
- **Real-time Search**: Instant filtering and search results
- **Mobile Responsive**: Optimized for all device sizes
- **Fast Performance**: Optimized loading and caching

### 🚧 Coming Soon
- **Shopping Cart**: Add books to cart and manage quantities
- **Checkout Process**: Complete order placement system
- **User Accounts**: Customer registration and login
- **Order Tracking**: Track order status and delivery
- **Wishlist**: Save books for later purchase
- **Reviews & Ratings**: Customer reviews and ratings system

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Custom components with Lucide React icons
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 18+ installed
- Spring Boot server running on `http://localhost:8080`
- MySQL database configured and running

## Installation & Setup

1. **Clone and navigate to the client directory**:
   ```bash
   cd d:/jay/client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── books/             # Books management page
│   ├── categories/        # Categories management page
│   ├── customers/         # Customers management page
│   ├── orders/            # Orders page (placeholder)
│   ├── users/             # Users page (placeholder)
│   ├── analytics/         # Analytics page (placeholder)
│   └── settings/          # Settings page (placeholder)
├── components/            # Reusable React components
│   ├── layout/           # Layout components (Sidebar, Header)
│   ├── books/            # Book-related components
│   ├── categories/       # Category-related components
│   └── customers/        # Customer-related components
├── hooks/                # Custom React hooks
│   ├── useBooks.ts       # Book management hooks
│   ├── useCategories.ts  # Category management hooks
│   └── useCustomers.ts   # Customer management hooks
├── lib/                  # Utility libraries
│   ├── api.ts           # API client configuration
│   ├── utils.ts         # Helper utilities
│   └── react-query.tsx  # React Query configuration
└── types/               # TypeScript type definitions
    └── index.ts         # All type definitions
```

## API Integration

The application integrates with a Spring Boot backend running on `http://localhost:8080`. The API client is configured in `src/lib/api.ts` with the following endpoints:

- **Books API**: `/api/books`
- **Categories API**: `/api/categories`
- **Customers API**: `/api/customers`
- **Orders API**: `/api/orders`
- **Users API**: `/api/users`

## Key Features Walkthrough

### Homepage
1. Beautiful hero section with call-to-action buttons
2. Featured books section with "Add to Cart" functionality
3. Educational board quick links (CBSE, ICSE, etc.)
4. Company features and statistics

### Shop Page
1. Advanced search bar for finding books
2. Multiple filters: Board, Grade, Subject, Price Range
3. Sort options: Name, Price (Low/High), Grade
4. Grid and List view modes
5. Book cards with ratings and "Add to Cart" buttons

### Categories Page
1. Browse by subject with colorful icons
2. Category cards grouped by type (Subject, Grade Level, Board)
3. Quick grade navigation (Grade 1-12)
4. Book count for each category

### About & Contact Pages
1. Company story and mission
2. Contact form with multiple subjects
3. Business information and FAQ section

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Backend Requirements

Ensure your Spring Boot server is running with the following endpoints available:

- `GET /api/books` - Get all books
- `POST /api/books` - Create new book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book
- Similar endpoints for categories and customers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.

---

**Note**: This is a development version. Make sure your Spring Boot backend is running before starting the client application.