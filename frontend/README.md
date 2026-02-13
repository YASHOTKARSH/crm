# CRM System - React Frontend

A modern, production-ready React frontend application for the CRM (Customer Relationship Management) system built with JavaScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Authentication**: Login/Register with JWT token management
- **Role-Based Access Control**: Admin, Manager, Team Lead, and Employee roles
- **Dashboard**: Role-specific dashboards with statistics
- **Lead Management**: Create, view, edit, delete, and convert leads
- **User Management**: Admin can create and manage users with role hierarchy
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modern UI**: Built with Tailwind CSS and Lucide React icons

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Routing
- **Axios** - HTTP client with interceptors
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 📦 Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

The application is configured to connect to the backend API at `http://localhost:8080`. The Vite proxy is configured in `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
```

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── api/            # API configuration (Axios)
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   │   ├── Leads/     # Lead management pages
│   │   └── Users/     # User management pages
│   ├── store/         # State management (Zustand)
│   ├── utils/         # Utilities and constants
│   ├── App.jsx        # Main app component with routing
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json       # Dependencies and scripts
```

## 🔐 Authentication

The app uses JWT tokens for authentication:

1. Login/Register stores token in localStorage
2. Axios interceptor adds token to all requests
3. 401 responses trigger automatic logout
4. Protected routes require authentication
5. Role-based routes check user permissions

## 👥 User Roles & Permissions

- **Admin**: Full access to all features
- **Manager**: Access to team management and leads
- **Team Lead**: Access to team leads and employee routes
- **Employee**: Access to lead management only

## 🎨 Key Components

### Layout & Navigation
- `Layout.jsx` - Main layout with sidebar
- `Sidebar.jsx` - Navigation sidebar with role-based menu
- `ProtectedRoute.jsx` - Authentication guard
- `RoleBasedRoute.jsx` - Role-based access control

### Pages
- `Login.jsx` / `Register.jsx` - Authentication pages
- `Dashboard.jsx` - Role-specific dashboard
- `LeadsList.jsx` - View and manage leads
- `CreateLead.jsx` / `EditLead.jsx` - Lead forms
- `UsersList.jsx` / `CreateUser.jsx` - User management (Admin only)

### Utilities
- `axios.js` - Axios instance with JWT interceptor
- `authStore.js` - Zustand store for authentication state
- `constants.js` - Application constants (roles, statuses)
- `helpers.js` - Helper functions (formatting, colors)

## 🌐 API Integration

All API endpoints are integrated:

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### User
- `GET /api/me`
- `GET /api/admin/users`
- `POST /api/admin/users`

### Leads
- `GET /api/employee/leads`
- `POST /api/employee/leads`
- `PUT /api/employee/leads/{id}`
- `DELETE /api/employee/leads/{id}`
- `PUT /api/employee/leads/{id}/convert`

### Dashboard
- `GET /api/admin/dashboard`
- `GET /api/manager/dashboard`
- `GET /api/teamlead/dashboard`
- `GET /api/employee/dashboard`

## 🎯 Usage

1. **Start the backend** (Spring Boot on port 8080)
2. **Start the frontend** (Vite dev server on port 5173)
3. **Register** a new account or **login** with existing credentials
4. Navigate through the application based on your role

## 📝 Development

```bash
# Run development server with hot reload
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

## 🐛 Troubleshooting

### CORS Issues
The Vite proxy is configured to handle CORS. Ensure the backend is running on port 8080.

### Authentication Issues
Check that:
- Token is stored in localStorage
- Backend JWT secret matches
- Token is not expired

### Build Issues
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

ISC
