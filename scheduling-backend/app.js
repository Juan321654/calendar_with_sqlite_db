const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware
const { Event } = require('./models');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors()); // This will allow requests from any origin

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CREATE: Add a new event
app.post('/events', async (req, res) => {
  try {
    const { title, start, end } = req.body;
    const newEvent = await Event.create({ title, start, end });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: 'Error creating event' });
  }
});

// READ: Get all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching events' });
  }
});

// UPDATE: Update an event by ID
app.put('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, start, end } = req.body;
    const event = await Event.findByPk(id);
    if (event) {
      event.title = title;
      event.start = start;
      event.end = end;
      await event.save();
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating event' });
  }
});

// DELETE: Delete an event by ID
app.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (event) {
      await event.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting event' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
