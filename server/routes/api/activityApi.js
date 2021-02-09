const Schemas = require('../../models/Schemas');
const mongoose = require('mongoose');
var moment = require('moment');


module.exports = (app) => {
  app.get('/api/records', (req, res, next) => {
    var older_than = moment().subtract(1, 'hours').toDate();
    Schemas.activities.find({ timestamp: { $gte: older_than } , active: true})
      .exec()
      .then((records) => res.json(records))
      .catch((err) => next(err));
  });

  app.get('/api/activities', (req, res, next) => {
    Schemas.activities.find()
      .exec()
      .then((records) => res.json(records))
      .catch((err) => next(err));
  });


  app.post('/api/activity', function (req, res, next) {
    const activity = new Schemas.activities({
        name: 'test',
        active_score: 10,
        anti_sobriety_score: 9,
        hunger_satisfaction_score: 8,
        thirst_satisfaction_score: 7,
        min_temp: 50,
        max_temp: 90,
        weather: "rain",
        popularity: 10
    });

    activity.save()
      .then(() => res.json(activity))
      .catch((err) => next(err));
  });

  app.put('/api/inactive', function (req, res, next) {
    const record = new Schemas({url: req.body.url, active: false});

    Schemas.updateMany({ url: req.body.url },{active: false})
        .exec()
        .then((counter) => res.json())
        .catch((err) => next(err));
  });

  app.delete('/api/records', function (req, res, next) {
    var older_than = moment().subtract(2, 'hours').toDate();
    Schemas.deleteMany({ timestamp: { $gte: older_than } })
      .exec()
      .then((records) => res.json())
      .catch((err) => next(err));
  });
};
