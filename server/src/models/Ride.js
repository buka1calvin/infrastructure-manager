
import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  otherStations: {
    type: String
  },
  seats: {
    type: Number,
    required: true
  },
  driverId: {
    type: String,
    required: true,
    ref: "User"
  },
  status: {
    type: String,
    enum: ['Available', 'Booked'],
    default: 'Available'
  },
  departureDate: {
    type: Date,
    required: true,
    default () {
      return new Date().toISOString().split('T')[0];
    }
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Ride = mongoose.model('Ride', rideSchema);

export default Ride;
