const express = require('express');
const router = express.Router();
const CylinderLog = require('../models/CylinderLog');

// PATCH /api/inventory/:cylinderId
router.patch('/:cylinderId', async (req, res) => {
  try {
    const { cylinderId } = req.params;
    const { actualReturnDate } = req.body;

    const log = await CylinderLog.findOne({ cylinderId });
    if (!log) return res.status(404).json({ message: 'Cylinder not found' });

    const dueDate = new Date(log.expectedReturnDate);
    const returnedDate = new Date(actualReturnDate);
    const lateDays = Math.max(0, Math.ceil((returnedDate - dueDate) / (1000 * 60 * 60 * 24)));
    const lateFeePerDay = 100;
    const lateFeeCharged = lateDays * lateFeePerDay;

    log.actualReturnDate = returnedDate;
    log.lateDays = lateDays;
    log.lateFeeCharged = lateFeeCharged;
    log.isReturned = true;

    await log.save();
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
