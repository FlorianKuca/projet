import express from 'express';
import cors from 'cors';
import { router } from './routers/router.js';

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: ['http://localhost:5173']
};
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
// Configure view engine
//app.set('view engine', 'ejs');
//app.set('views', './views');

// Configure assets routes (static folder)
//app.use(express.static('./public'));

// Favicon static route
//app.use('/favicon.ico', express.static('./public/images/logo.svg'));

// Use router
app.use(router);

// Start server
app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});