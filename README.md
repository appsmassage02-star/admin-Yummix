# 🛡️ Yummix Super Admin Panel (Extracted UI)

This repository contains exclusively the **Super Admin Panel** extracted from the multi-restaurant platform **Talabaty-Yummix-UI**. It has been isolated and prepared for modular migration into the Talabaty ecosystem.

## 📋 Features Included
- **Admin Authentication**: Super Admin Login with session management and offline preview mode.
- **Dashboard**: Platform overview metrics (Revenue, Orders, Foods, Users) and monthly revenue chart (`recharts`).
- **Restaurants Management**: Review pending restaurants, approve/reject partners, filter by status.
- **Riders Management**: Review pending delivery partner registrations, document verification links (Aadhaar, License), approve/reject riders.
- **Orders Oversight**: View platform-wide orders, track live status, force-cancel with refund, retry rider search.
- **Refund Alerts**: Unresolved refund failure monitoring and resolution action.
- **Feedback & Partner Requests**: Inbox for customer feedback and prospective restaurant partner submissions.

## 🛠️ Technology Stack
- **Framework**: React, Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Charts**: Recharts
- **HTTP Client**: Axios

## 🚀 Running Locally
```bash
npm install
npm run dev
```
The application runs on `http://localhost:3000`.

## ⚙️ Configuration
Configure `VITE_API_URL` in `.env` if connecting to a compatible API server. If left unset, the admin UI runs in isolated offline mode.

## 📄 License
MIT License. Original Copyright (c) 2026 Soumitra Sahoo.