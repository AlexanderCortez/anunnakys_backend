const router = require('express').Router();

const Event = require('../models/mongo_mappers/event');

const showEvents = (req, res) => {
  Event
    .find()
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
    name, type, place, npc, time, day, sound,
  } = req.body;
  const newEvent = new Event({
    name,
    type,
    place,
    npc,
    time,
    day,
    sound,
  });
  newEvent
    .save()
    .then((event) => {
      res.send({
        message: 'Event created successfully',
        event,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || 'Error adding event',
      });
    });
};

const updaEvent = (req, res) => {
  const { id } = req.params;
  const {
    name, type, place, npc, time, day, sound,
  } = req.body;
  const data = {
    name,
    type,
    place,
    npc,
    time,
    day,
    sound,
  };
  Event
    .findById(id)
    .then((event) => {
      if (event) {
        event.set(data);
        return event
          .save();
      }
      return Promise.reject(new Error('User not found'));
    })
    .then((event) => {
      res.send({
        message: 'Event updated successfully',
        event,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.messsage || 'Error updating event',
      });
    });
};

const removeEvent = (req, res) => {
  const { id } = req.params;
  Event
    .findById(id)
    .then((event) => {
      if (event) {
        return event
          .remove();
      }
      return Promise.reject(new Error('Event not found'));
    })
    .then(() => {
      res.send({
        message: 'Event removed successfully',
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.messsage || 'Error removing event',
      });
    });
};

router.get('/', showEvents);
router.post('/', createEvent);
router.put('/:id', updaEvent);
router.delete('/:id', removeEvent);

module.exports = router;
