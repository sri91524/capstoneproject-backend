import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        prodname:{
            type: String,
            required: [true, "Product is required"],
            Unique: true,
            minlength:[3, "Product name must be atleast 3 characters long"],
            maxlength:[250, "Product name cannot be more than 250 characters long"]
        },
        proddesc:{
            type: String,
            maxlength: [1000, "Provide product desc. max. 1000 characters long"]
        },
        category:{
            type: String,
            enum:["men", "women", "kids"],
            required: [true, "Category is required"]           
        },
        size: {
            type: String,
            enum:["S","M","L","XL","XXL"],
            required:[true, "Size is required"]
        },
        price:{
            type: mongoose.Schema.Types.Decimal128,
            required: [true, "Please enter price for the product"],
            min: [0, "Price cannot be negative"],
            validate: {
                validator: function(value) {
                    // Check if the price has more than 2 decimal places
                    return /^\d+(\.\d{1,2})?$/.test(value.toString());
                },
                message: "Price must have at most two decimal places"
            }
        },
        image:{
            type: String
        }
    },
    {timestamps: true}
);

productSchema.index({prodname: 1});
productSchema.index({category: 1});
productSchema.index({price:1});

export default mongoose.default.model("Product", productSchema);
