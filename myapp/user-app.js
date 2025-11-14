const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // ✅ Add CORS support

const app = express();

// ✅ Allow only your React frontend to access this API
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow REST methods
    credentials: true,
  })
);

// Import routers
const indexRouter = require('../routes/user-availability'); // Main route for /calendar
const contactRouter = require('../routes/user-contacts')
// View engine setup (if you use EJS for admin or error pages)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ API route used by React (e.g. GET /calendar?date=YYYY-MM-DD)
app.use('/calendar', indexRouter);
app.use('/clients', contactRouter)
// Catch 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

module.exports = app;
