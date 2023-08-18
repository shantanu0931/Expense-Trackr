const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
    },
    category: {
      type: String,
      requires: [true, "Category is required"],
    },
    refrence: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;
