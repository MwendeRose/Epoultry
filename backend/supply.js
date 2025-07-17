const mongoose = require('mongoose');

const customerRequestSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  deliveryDate: Date,
  deliveredBy: String
});

const supplySchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  available: Number,
  sold: Number,
  newIn: Number,
  orders: Number,
  customers: [customerRequestSchema]
});

module.exports = mongoose.model('Supply', supplySchema);
