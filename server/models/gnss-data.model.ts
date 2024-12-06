import mongoose from 'mongoose';

const gnssDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['rinex', 'nmea'],
    required: true
  },
  accuracy: Number,
  rawData: Buffer
});

export const GNSSDataModel = mongoose.model('GNSSData', gnssDataSchema);