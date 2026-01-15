# Digital E-Gram Panchayat

A full-stack web application to computerize Gram Panchayat services, allowing citizens to apply for services online and staff/officers to manage them.

## 🚀 Technology Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB (via Mongoose)
- **Authentication**: NextAuth.js
- **Logging**: Winston

## 🛠️ Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd digital_E-GramPanchayat
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Copy `.env.example` to `.env.local` and update the values:
    ```bash
    cp .env.example .env.local
    ```
    Update `MONGODB_URI` with your MongoDB connection string.

4.  **Run the application**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions (DB connection, logger).
- `src/models`: Mongoose models (User, Service, Application, Log).

## 🧩 Modules

1.  **Authentication**: Register/Login for Citizens, Staff, and Officers.
2.  **Service Management**: Admin can create and manage services.
3.  **Application Module**: Citizens can apply for services.
4.  **Workflow**: Staff/Officers review and update application status.
5.  **Logging**: Critical actions are logged to MongoDB and console.

## 🧪 Testing

Run tests (if configured):
```bash
npm test
```

## 📜 API Documentation

### Authentication
- `POST /api/auth/register`: Register a new user.

### Services
- `GET /api/services`: List all services.
- `POST /api/services`: Create a new service (Admin/Officer).
- `GET /api/services/[id]`: Get service details.
- `PUT /api/services/[id]`: Update service.
- `DELETE /api/services/[id]`: Delete service.

### Applications
- `POST /api/applications`: Submit an application.
- `GET /api/applications`: List applications.
- `PUT /api/applications/[id]`: Update application status.

## 👥 Roles

- **Citizen**: Apply for services, view status.
- **Staff**: View assigned applications, update status to "In Review".
- **Officer/Admin**: Create services, approve/reject applications.
