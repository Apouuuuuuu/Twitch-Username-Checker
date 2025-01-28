# 🎮 Twitch Username Checker

This project is a **Twitch Username Availability Checker** built with **Next.js**, **TailwindCSS**, and **React Icons**.  
It allows users to check if a Twitch username is available using the **Twitch API**.

### You can try it at <a href="https://twitch-checker-username.vercel.app/" target="_blank" rel="noopener noreferrer">Twitch Checker</a>

---

## ✨ Features

- ✅ **Validates Twitch usernames** (4-25 characters, letters, numbers, and dashes only)
- ✅ **Checks username availability in real-time**
- ✅ **Handles errors for invalid usernames, server issues, and token expiration**
- ✅ **Fully responsive design with a sleek dark theme**
- ✅ **Displays Twitch's username policy link for reference**
- ✅ **Uses Next.js API routes for backend requests**

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Apouuuuuuu/Twitch-Username-Checker.git
cd Twitch-Username-Checker
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment variables

Create a .env file in the root directory and add your Twitch API credentials:
```bash
TWITCH_CLIENT_ID=your_client_id_here
TWITCH_ACCESS_TOKEN=your_access_token_here
```

Go on https://dev.twitch.tv/console. <br/>
Create a new "application integration" on http://localhost and get the TWITCH_CLIENT_ID (identifiant) <br/>
For the TWITCH_ACCESS_TOKEN you have to execute this command with your TWITCH_CLIENT_ID and your Secret client key.
```ps1
curl -X POST "https://id.twitch.tv/oauth2/token?client_id=YOUR_CLIENT_ID&client_secret=YOUR_SECRET_KEY&grant_type=client_credentials"
```
You will get a TWITCH_ACCESS_TOKEN.
You also can run this command to check if your access token is working
```ps1
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -H "Client-Id: TWITCH_CLIENT_ID" https://id.twitch.tv/oauth2/validate
```
⚠️ Your Twitch token will expire periodically. You may need to refresh it via Twitch Developer Console.

## 🛠️ Deployment

For a production build:
```bash
npm run dev
```
Your app will be available at: http://localhost:3000 🎉


Vercel deployment:
```bash
vercel
``` 


## ⚙️ API Setup (Backend)

This project uses a Next.js API route (/api/check-twitch) to fetch Twitch username availability.
If you need to modify API behavior, edit:


```bash
📂 src/api/check-twitch.js
```
The API makes requests to Twitch's Helix API using the provided OAuth token.

## 🖥️ Project Structure

```bash
📂 Twitch-Username-Checker
│── 📂 node_modules/         # Installed dependencies
│── 📂 public/               # Static assets (favicons, images, etc.)
│── 📂 src/
│   ├── 📂 api/              # Backend API route for username checking
│   │   ├── check-twitch.js  # Handles Twitch API requests
│   ├── 📂 app/              # Next.js frontend pages and layout
│   │   ├── page.js          # Home page displaying username checker
│   │   ├── layout.js        # Global layout wrapper
│   ├── 📂 components/       # UI components
│   │   ├── TwitchChecker.js # Main username checker component
│   ├── 📂 styles/           # Global styles (Tailwind)
│── .env                     # Environment variables (Twitch API credentials)
│── package.json             # Project metadata & dependencies
│── README.md                # Documentation (this file)
```

## 💡 Notes

- If you get a 401 error, your Twitch token might be invalid or expired.
- The UI is built with TailwindCSS for easy customization.
- Ensure your CORS settings allow API requests from your frontend.

## 🤝 Contributing
Pull requests are welcome! Feel free to improve the project or report issues.

📩 Contact: gagelintheo2@gmail.com
🔗 Twitch API Documentation: https://dev.twitch.tv/docs/api
