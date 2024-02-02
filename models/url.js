// const express = require('express');
const mongoose = require('mongoose');

const utlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  redirectURL: {
    type: String,
    required: true,
  },
  vistitHistory: [{ timestamp: { type: Number } }]
},
  { timestamps: true }
);
const URL = mongoose.model("url", utlSchema);
module.exports = URL;