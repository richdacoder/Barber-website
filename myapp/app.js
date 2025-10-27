// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('../routes/index');

const app = express();

// ---------------------
// View engine setup
// ---------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public", 'stylesheets')));
app.use(express.static(path.join(__dirname, "public", 'javascripts')));



// ---------------------
// Middleware
// ---------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------
// Routes
// ---------------------
app.use('/', indexRouter);  // Mount all routes from routes/index.js
// app.use('/contacts', indexRouter);


// ---------------------
// Catch 404 and forward to error handler
// ---------------------
app.use((req, res, next) => {
  next(createError(404));
});

// ---------------------
// Error handler
// ---------------------
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page
  res.status(err.status || 500);
  res.render('error'); // make sure views/error.ejs exists
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

module.exports = app;
