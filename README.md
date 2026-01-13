# 🎨 Public Trivia App

A React-based trivia web application powered by the **Open Trivia Database (OpenTDB)** API.

This project focuses on **clean state separation**, **predictable data flow**, and **robust API error handling**, rather than UI complexity.

## 🔗 Demo

Live Demo:\
👉 https://public-trivia.netlify.app/

## 🔧 Technologies Used

- **React + TypeScript**
- **Tanstack Query** - Server state, caching, and async flow
- **Zustand** - Client-side quiz state (progress, answers, score)
- **Axios** - HTTP client
- **Open Trivia DB API**
- **Netlify** - Deployment

## 🧠 Architectural Overview

This app deliberately separates responsibilities:

### Server State

Handled by **TanStack Query**

- Fetching categories, tokens, and questions
- Caching API responses
- Mapping API errors to domain-level errors

### Client State

Handled by **Zustand**

- Quiz configuration
- Current question index
- User answers
- Score tracking
- Screen navigation

### UI

- Fully declarative
- No side-effects during render
- No direct API or token awareness

## 🔐 Token Handling (OpenTDB)

OpenTDB uses **session tokens** to avoid duplicate questions.

This app handles tokens with the following rules:

- Token lifecycle is abstracted away from UI
- Token exhaustion automatically redirects users back to configuration
- Invalid or expired tokens are recovered transparently
- UI never deals with API response codes directly

## ❗ Error Handling Strategy

Errors are treated as **first-class state**, not edge cases.

| Error Type                | Behavior                         |
| ------------------------- | -------------------------------- |
| Token Invalid / Exhausted | Redirect to configuration screen |
| Network Error             | Show retry UI                    |
| Invalid State             | Safely short-circuit rendering   |

This prevents infinite loops, silent failures, and UI-driven recovery hacks.

## 🚀 Installation & Setup

Follow these steps to run the project locally:

1️⃣ Clone the repository

```
https://github.com/iamstarck/public-trivia-app.git
```

2️⃣ Navigate into the project folder

```
cd public-trivia-app
```

3️⃣ Install NPM packages

```
npm install
```

4️⃣ Start the development server

```
npm run dev
```

5️⃣ Open the app\
Vite will give you a local URL, usually:

```

http://localhost:5173
```

Access it in your browser and start using the Public Trivia App.
