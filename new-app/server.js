const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middleware
app.use(
  morgan("dev", {
    skip: (req) => req.url.startsWith("/socket.io"),
  })
);

app.use(cors());
app.use(express.json());

// Suppress /socket.io traffic completely (no logs or 404s)
app.use("/socket.io", (req, res) => {
  res.status(204).end();
});

// Serve Angular app from correct folder
app.use(express.static(path.join(__dirname, "dist/new-app/browser")));

// Routes
const appRoutes = require("./server/routes/app");
const documentRoutes = require("./server/routes/documents");
const messageRoutes = require("./server/routes/messages");
const contactRoutes = require("./server/routes/contacts");

app.use("/", appRoutes);
app.use("/documents", documentRoutes);
app.use("/messages", messageRoutes);
app.use("/contacts", contactRoutes);

// Fallback to index.html for Angular client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/new-app/browser/index.html"));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
