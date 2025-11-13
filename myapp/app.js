// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('../routes/index');
const availabilityRouter = require('../routes/availability'); // <-- NEW
const contactsRouter = require('../routes/contacts'); // <-- NEW

const app = express();

// ---------------------
// View Engine
// ---------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ---------------------
// Middleware
// ---------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files
app.use(express.static(path.join(__dirname, "public")));


// ---------------------
// Routes
// ---------------------
app.use('/', indexRouter);

// NEW: Availability route (Admin page + API)
app.use('/availability', availabilityRouter);
// When you hit: http://localhost:3000/availability
app.use('/contacts', contactsRouter);
// GET  -> http://localhost:3000/contacts
// POST -> http://localhost:3000/contacts


// ---------------------
// 404 Handler
// ---------------------
app.use((req, res, next) => {
  next(createError(404));
});

// ---------------------
// Error Handler
// ---------------------
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// ---------------------
// Start Server
// ---------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

module.exports = app;
