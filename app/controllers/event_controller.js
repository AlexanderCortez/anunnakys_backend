const router = require('express').Router();

const Event = require('../models/event_model');

const showEvents = (req, res) => {
  Event
    .fetchAll()
    .then((events) => {
      res.send({
        events,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || 'Error retrieving events',
      });
    });
};

const createEvent = (req, res) => {
  const {
    name, place, npc, start, finish,
  } = req.body;
  Event
    .forge({
      event_name: name,
      event_place: place,
      event_npc: npc,
      event_start: start,
      event_finish: finish,
    })
    .save(null, { method: 'insert' })
    .then((event) => {
      res.send({
        message: 'Event creared successfully',
        event,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || 'Error adding event',
      });
    });
};

router.get('/', showEvents);
router.post('/', createEvent);

module.exports = router;
