const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

<<<<<<< HEAD
require('dotenv').config();
=======
>>>>>>> 59238fdc82ef989216e5fc8b6ab369138d6cf95b
// const serviceAccount = require('./config/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   projectId: 'rsapmna-de966',
// });

<<<<<<< HEAD
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
}

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log('this is service account',serviceAccount)
=======
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
>>>>>>> 59238fdc82ef989216e5fc8b6ab369138d6cf95b

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'rsapmna-de966',
});


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: '*' }));

app.post("/send-notification", async (req, res) => {
  const registrationToken = req.body.token;
  const message = {
    token: registrationToken,
    notification: {
      title: req.body.title,
      body: req.body.body,
    },
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).send("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send("Notification failed");
  }
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
