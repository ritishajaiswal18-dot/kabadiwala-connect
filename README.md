# ♻️ Kabadiwala Connect
### Smart Scrap Management & Digital Recycling Platform

Kabadiwala Connect is a web-based scrap management platform designed to make scrap collection, sales tracking, and payment management easier and more organized.

The platform provides a digital workspace for scrap collectors and administrators to manage scrap transactions, monitor earnings, track pending payments, and view material-wise business insights through a simple dashboard.

Instead of maintaining handwritten records, collectors can use Kabadiwala Connect to record transactions and manage their daily operations digitally.

---

## ✨ Key Features

### 1. Dashboard
A centralized overview of scrap collection and business activity.

- View total revenue.
- Monitor total scrap quantity collected.
- Track average price per kilogram.
- View pending payments.
- Review recent transactions.
- Visualize monthly revenue and collection trends.

### 2. Sell Scrap
A dedicated interface for recording scrap sales.

- Enter customer and transaction details.
- Select scrap material.
- Record scrap quantity and selling price.
- Calculate transaction amounts.
- Record payment status.
- Maintain a digital transaction history.

### 3. Digital Ledger
Keep track of recorded transactions and payments.

- View transaction records.
- Monitor paid and pending amounts.
- Track partially paid transactions.
- Filter records by date or month.
- Export transaction data as CSV.

### 4. Material Price Management
View reference prices for different scrap materials.

Supported material categories include:

- Paper
- Plastic
- Iron
- Aluminium
- Copper
- Other scrap categories supported by the application

*Note: Material prices are illustrative reference values and are not connected to a live market-price API.*

### 5. Analytics & Reports
Understand business performance through visual insights.

- Monthly revenue trends.
- Scrap collection quantity trends.
- Material-wise collection distribution.
- Month-over-month growth.
- Year-over-year comparisons.

Analytics are based on the transaction data available in the application.

### 6. Collector and Admin Views
The interface includes different views for collectors and administrators.

- Collector dashboard for day-to-day scrap management.
- Admin analytics view for reviewing business performance.

*The current role selector is a frontend interface feature, not a secure authentication or authorization system.*

### 7. User Profile
A profile section for managing basic user and location information, including city and state.

### 8. English and Hindi Interface
The project is intended to support both English and Hindi, making it more accessible to users who prefer regional-language interfaces.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| JavaScript | Application logic |
| Vite | Development server and build tool |
| CSS | Styling and responsive layout |
| Browser LocalStorage | Local transaction data persistence |
| Git & GitHub | Version control and source code |
| Vercel | Deployment and hosting |

---

## 🚀 Getting Started

Follow these steps to run Kabadiwala Connect locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/ritishajaiswal18-dot/kabadiwala-connect.git
```

### 2. Navigate to the Project Directory

```bash
cd kabadiwala-connect
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Vite will display a local development URL in your terminal. Open that URL in your browser to access the application.

### 5. Create a Production Build

```bash
npm run build
```

The production-ready files will be generated inside the `dist` directory.

---

## 📁 Project Structure

```text
kabadiwala-connect/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   └── ...
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── vercel.json
└── README.md
```

*The structure above represents the main project files. Additional source files may be present depending on the current implementation.*

---

## 💾 Data Storage

The current application uses the browser's LocalStorage to store transaction information.

This means:

- Data can remain available after refreshing the same browser.
- Data is stored locally in the browser.
- Data is not automatically synchronized across different devices.
- Clearing browser storage may remove locally saved application data.

The current version does not use a centralized database or cloud-based transaction storage.

---

## 🌐 Live Demo

**Live Application:**  
https://kabadiwala-connect-livid.vercel.app/

**GitHub Repository:**  
https://github.com/ritishajaiswal18-dot/kabadiwala-connect

---

## 🔮 Future Improvements

The project can be expanded with the following capabilities:

- Secure user registration and authentication.
- Dedicated collector and administrator permissions.
- Cloud database integration.
- Real-time data synchronization.
- Live scrap market-price integration.
- Customer management and transaction history.
- GPS-based scrap collection requests.
- Pickup scheduling and collector assignment.
- Digital payment integration.
- Downloadable PDF invoices and reports.
- Improved multilingual support.
- Mobile-friendly experience and progressive web app support.

---

## 🎯 Project Objective

The goal of Kabadiwala Connect is to bring simple digital tools to the traditional scrap collection and recycling ecosystem.

By organizing transactions, payment records, and business insights in one place, the platform aims to make scrap management more transparent, accessible, and efficient.

**A small step towards smarter scrap management and a more organized recycling ecosystem.**

---

## 👩‍💻 Contributing

Contributions,
