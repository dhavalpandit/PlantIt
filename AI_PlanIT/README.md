
# 🌍 PlanIT – AI-Powered Travel Planner

**PlanIT** is an AI-powered travel planning web application built with **Vite**, **React**, and **Firebase**. It allows users to generate personalized travel itineraries using **Gemini 1.5 AI**, manage trips, and explore destinations with integrated images and Google Maps support.

**Team Members**
Dhaval Atul Pandit (1002189635)
Adarsh Rao (1002213038)
Sai Sashikant Reddy Yadamakanti (1002267161)

---

## 🚀 Getting Started

### 2. Install Dependencies
Make sure Node.js and npm are installed on your system. Then run:
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
The app will now be running at:  
👉 http://localhost:5173/

---

## 🔑 User Flow & Features

### 🏠 Homepage
Users land on the homepage at http://localhost:5173/

### 🔐 Google Authentication
After logging in with Google:
- Users can view their existing trips
- Or create a new trip

### ✈️ Creating a New Trip
User inputs:
- Country Name
- State Name
- Date Range
- Budget
- Number of People
- Type of Trip (e.g., Adventure, Fun)

Click **"Generate Trip"** and:
- **Gemini 1.5 AI** generates a personalized itinerary
- The trip is stored as JSON in **Firebase Firestore**

### 🗺 Viewing the Trip
Once generated:
- Trip details are displayed in the UI
- Image names are extracted from the JSON
- **Google Places API** fetches destination images
- Clicking an image redirects to Google Maps

---

## 🛠 Tech Stack
- **Frontend:** React + Vite  
- **Authentication:** Firebase Authentication (Google Sign-In)  
- **Database:** Firebase Firestore  
- **AI Integration:** Gemini 1.5  
- **External APIs:** Google Places API  

---

## 📦 Production Build
To build the app for production:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 📌 Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GOOGLE_PLACES_API_KEY=your_google_places_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

---

## ✅ Running Tests

Navigate to the test directory:
```bash
cd tests
```

Run the test file:
```bash
node src/tests/test.js
```
This will execute the basic tests and show results in the terminal.

---

## 🔄 Future Improvements
- Increase trip duration limit beyond 6 days
- Add real-time weather predictions using a more accurate API
- Integrate a chatbot for quick user support
- Include language translation for communication in different regions

---

