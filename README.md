<div align="center">
  <img height="400" src="https://github.com/shahbaz-kamal/gather-grid/blob/main/client/src/assets/git_banner.png"  />
</div>

###

<h1 align="left">🗓️ Gather Grid - Event Management</h1>

###

<p align="left">Gather Grid is a dynamic and secure event management platform developed using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to seamlessly create, view, update, and join events. The application uses a custom-built authentication system with hashed passwords and JWT tokens to ensure secure access. With a modern UI, real-time feedback, and responsive layout, Gather Grid offers a smooth and intuitive experience for users organizing or attending events.</p>

###

## 🔗 Live Link

###

<p align="left">Frontend :https://gather-grid-by-shahbaz.netlify.app/</p>
<p align="left">Backened :https://gather-grid-server.vercel.app/</p>

###

## ✨ Features:

###

1. **🔐 Custom Authentication:**

   - Secure login and registration using bcrypt-hashed passwords and JWT-based session handling.

2. **📅 Event Creation & Management**

   - Users can create events with title, image, time, location, and description.

3. **✏️ Event Update Functionality**

   - Authenticated users can update their posted events from the dashboard.

4. **👀 Event Details Page**

   - Each event has a detailed view showing host info, date & time, location, and attendees.

5. **✅ Join Event Logic**

   - Logged-in users can join an event; attendee count updates in real-time.

6. **🌗 Dark/Light Theme Toggle**

   - Fully integrated theme switching for better accessibility and UX.

7. **🔄 React Query Integration**

   - Efficient server-state management and data caching using `@tanstack/react-query`.

8. **📅 Date & Time Picker**

   - User-friendly date and time selection powered by `react-datepicker`.

9. **📸 Responsive Design**

   - Fully responsive layout that works across desktops, tablets, and mobile devices.

10. **📡 RESTful API with Express.js**
    - Robust backend API with secure endpoints for event and user operations.

###

## 🛠 Technology Used

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" height="40" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=express" height="40" alt="express logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=mongodb" height="40" alt="mongodb logo"  />
</div>

###

## 💥 Dependencies:

<!-- <h3 align="left"></h3> -->

###

<p align="left">"@tailwindcss/vite": "^4.1.11",<br>    "axios": "^1.10.0",<br>    "react": "^19.1.0",<br>    "react-dom": "^19.1.0",<br>    "react-icons": "^5.5.0",<br>    "react-router": "^7.6.3",<br>    "sweetalert2": "^11.22.2",<br>    "tailwindcss": "^4.1.11"<br> "bcryptjs": "^3.0.2",<br>    "cors": "^2.8.5",<br>    "dotenv": "^17.0.0",<br>    "express": "^5.1.0",<br>    "jsonwebtoken": "^9.0.2",<br>    "mongodb": "^6.17.0",<br>    "ts-node-dev": "^2.0.0"</p>

###

###

###

## 🔧 Installation Guidline:

<p align="center" style="display: flex; align-items: center; justify-content: center;">
  <span style="font-size: 20px; font-weight: bold;">Front End</span>
  <img src="https://cdn-icons-png.flaticon.com/128/1055/1055666.png" alt="Front End Icon" width="15" height="15" style="margin-left: 8px;" />
</p>

1. First clone the project by running

```bash
  git clone https://github.com/shahbaz-kamal/gather-grid.git
```

2. Change your directory to the cloned folder by

```bash
  cd gather-grid/client
```

3. Run the following to install dependencies:

```bash
npm install
```

4. Run the following command and open the website locally on port 5173:

```bash
npm run dev
```

<p align="center" style="display: flex; align-items: center; justify-content: center;">
  <span style="font-size: 20px; font-weight: bold;">Backend</span>
  <img src="https://cdn-icons-png.flaticon.com/128/16318/16318927.png" alt="Front End Icon" width="15" height="15" style="margin-left: 8px;" />
</p>

###

1. Open a new terminal inside the folder `gather-grid`. And run this command.

```bash
  cd server
```

2. Run the following to install dependencies:

```bash
npm install
```

3. Create a MongoDB user by keeping username and password collected & create a .env file in the root directory and put the following code:

```bash
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_Password
JWT_SECRET=token_secret_for_jwt_token
```

4. If required then change the mongodb uri in the file `/src/utils/connectDb.ts`

5. Run the following command and open the website locally on port 5000:

```bash
npm start
```

###
