const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const availabilityRouter = require('../routes/availability'); // <-- NEW
const contactsRouter = require('../routes/contacts');       // <-- NEW
const appointmentsRouter = require('../routes/appointments'); // <-- NEW
const serviceRouter = require('../routes/services');

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
// --------------------
app.use('/', appointmentsRouter);                   // Homepage
// NEW: Availability route (Admin page + API)
app.use('/availability', availabilityRouter);

// NEW: Contacts route (Admin page + API)
app.use('/contacts', contactsRouter);

// NEW: Appointments route (Admin page + API)
app.use('/appointments', appointmentsRouter);
// GET  -> http://localhost:3000/appointments
// POST -> http://localhost:3000/appointments
// PUT  -> http://localhost:3000/appointments/:id
// DELETE -> http://localhost:3000/appointments/:id

app.use('/services', serviceRouter);
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
