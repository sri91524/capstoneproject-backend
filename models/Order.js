import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        prodid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        quantity:{
            type: Number,
            required: true
        },
        price:{
            type: mongoose.Schema.Types.Decimal128,
            min:[0, "Price cannot be negative"]
        },
        total:{
            type: mongoose.Schema.Types.Decimal128,
            min:[0, "Price cannot be negative"]
        },
        tax:{
            type:mongoose.Schema.Types.Decimal128,
            min:[0, "Tax cannot be negative"]
        }
    },
    {timestamps: true}
);
