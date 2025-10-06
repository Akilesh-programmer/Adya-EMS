# Adya-EMS — Client

This repo is the front-end for Adya-EMS (Event Management Software for SECE). It is a React application built with Vite and uses Tailwind/CSS, React Router, Redux Toolkit and a number of UI/analytics libraries. The client talks to the backend server in the sibling `server/` folder via REST endpoints (listed below).

## Project summary in this project 

- Front-end: React 18 + Vite
- State management: Redux Toolkit / react-redux
- UI/UX: Tailwind CSS, Framer Motion, various React UI libraries
- Charts & calendars: chart.js, react-chartjs-2, react-big-calendar, react-calendar
- Build tool: Vite

This README documents how to run the client and the corresponding server found in `../server`.

## Quick setup (Windows PowerShell)

1. Clone the repository and open a PowerShell session in the workspace root (where `client/` and `server/` live).

2. Install dependencies for both client and server.

    ```powershell
    cd client; npm install; cd ..\server; npm install
    ```

3. Prepare environment variables for the server. At minimum the server expects a MongoDB connection string in `MONGODB_URI` (see "Environment variables" below).

4. Start the development servers (run client and server in two terminals, or use separate tabs):

    Client (dev):
    ```powershell
    cd client
    npm run dev
    ```

    Server (dev, requires .env and MongoDB):
    ```powershell
    cd server
    npm run dev
    ```

    Note:
    - `npm run dev` in `client` starts Vite's dev server (HMR) and hosts the React app (default port 5173 unless configured otherwise).
    - `npm run dev` in `server` runs `nodemon index.js` per the server package.json and listens on port 8000 by default.

## Build & preview : 

To build the client for production:

```powershell
cd client
npm run build

# preview the built client locally
npm run preview
```

If you deploy the client and server together you can serve the built client with any static web server (or integrate it with the Express server). The current Express server does not automatically serve the client build in `server/index.js`; you can add that integration if needed.

## Environment variables (server)

The server code expects at least the following environment variable:

- MONGODB_URI — MongoDB connection string (required)

The server's code references many features (file uploads, cloudinary, email, twilio/whatsapp, JWTs). The exact variable names and usage may be declared elsewhere in server code. Common additional environment variables you may need (inferred — please confirm in server files):

- PORT — optional override for server port (default 8000)
- JWT_SECRET — JSON Web Token secret used for authentication
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET — for Cloudinary uploads
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS — for sending emails
- TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN — Twilio credentials (if used)

Create a `.env` file in the `server/` folder (not committed) with the required variables, for example:

```powershell
# server/.env (example)
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/adya-ems
PORT=8000
JWT_SECRET=your_jwt_secret_here
# add cloudinary / email / twilio creds if your deployment uses them
```

## Discovered server endpoints

The server `index.js` registers the following route prefixes (see `server/index.js`):

- GET / — simple root health route (returns JSON message)
- /uploads — static folder served from `server/uploads`
- /api/auth — signup/authentication routes (router: `Router/Signups.js`)
- /api/sece — (duplicate registration in index.js — also uses signupRouter)
- /api/event — event routes (`Router/eventHandeler.js`)
- /api/messages — WhatsApp / messaging routes (`Router/Whatsapp.js`)
- /api/guestroom — guest room booking routes (`Router/GuestRoom.js`)
- /api/food — food form routes (`Router/Food.js`)
- /api/transportform — transport form routes (`Router/Transport.js`)
- /api/endform — end form routes (`Router/endform.js`)
- /api/common — common routes (`Router/Common.js`)
- /api/media — media upload/requirements routes (`Router/Media.js`)

Server default listen port (in `server/index.js`): 8000

Note: Some routers may contain further nested endpoints; check the files under `server/Router/` for specific request paths and example payloads.

## Scripts (from package.json)

Client (`client/package.json`):
- start / dev — vite (development server)
- build — vite build (production bundle)
- preview — vite preview
- lint — eslint .

Server (`server/package.json`):
- start — node index.js
- dev — nodemon index.js

## Project layout (high level)

- client/ — React + Vite front-end
  - src/ — application source
  - public/ — static assets
- server/ — Express + Node backend
  - Router/ — express route handlers
  - Controller/ — controllers and business logic
  - Schema/ — Mongoose schemas
  - uploads/ — uploaded files (served statically)
  - other/ — utilities (PDF, Excel, cron jobs, etc.)

## Troubleshooting

- If the client fails to load API data, ensure the server is running and `MONGODB_URI` is correct.
- Watch the server logs for MongoDB connection errors (the server prints the `MONGODB_URI` during startup).
- If you encounter package version incompatibilities, remove `node_modules` and reinstall (`npm ci` or `npm install`).

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork/branch
2. Modify or add feature
3. Test in both `client` and `server` as appropriate
4. Create a PR with description and testing notes

## License & author

Author (from `server/package.json`): Akilesh Saravanan

This project does not include a license file in the repository; add one if you plan to open-source the code.

## Next steps / notes for maintainers

- Add a top-level README that documents how client and server are deployed together.
- Add a sample `.env.example` in `server/` listing required environment variables and descriptions.
- Consider serving the client build from the Express server for simpler single-host deployments.

---

If you'd like, I can also:
- add a `server/.env.example` file based on the values inferred above,
- create a top-level README.md that documents both client and server together,
- or update the server to serve the client production build.
