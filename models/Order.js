import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products:[
            {
                prodid:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                    index: true
                },        
                quantity:{
                    type: Number,
                    required: true
                },
                price:{
                    type: mongoose.Schema.Types.Decimal128, //Unit price
                    min:[0, "Price cannot be negative"]
                },
                total:{
                    type: mongoose.Schema.Types.Decimal128, //price based on quantity
                    min:[0, "Price cannot be negative"]
                },
                tax:{
                    type:mongoose.Schema.Types.Decimal128, //tax based on quantity
                    min:[0, "Tax cannot be negative"]
                }
            }
        ],
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        totalAmount:{
            type: mongoose.Schema.Types.Decimal128,     //total amount of all products 
            min: [0, "Total amount cannot be negative"]
        },
        totalTax:{
            type: mongoose.Schema.Types.Decimal128,     //total tax of all products
            min:[0, "Total tax cannot be negative"]
        }
    },
    {timestamps: true}
);

//This part of calculation may be need for shopping cart
//calculation for total amount, total tax
//Pre-save hook to calculate the total
// orderSchema.pre('save', async function(next){
//     if(this.products && this.products.length > 0){
//         for(const product of this.products){            
//             if(product.quantity && product.price){            
//                 const productData = await mongoose.model("Product").findById(product.prodid);
//                 if(productData && productData.tax != undefined){
//                     const priceValue = parsefloat(product.price.toString()); //unit price
//                     const productTotal = priceValue * product.quantity;
//                     product.total = new mongoose.Types.Decimal128(productTotal.toString()); //total price

//                     const productTaxRate = parseFloat(productData.tax.toString());
//                     const productTax = (productTotal * productTaxRate/100); //totaltax
//                     product.tax = new mongoose.Types.Decimal128(productTax.toString());

//                     totalAmount += productTotal;
//                     totalTax += productTax;
//                 }
//                 else{
//                     console.error('Tax rate is missing with ID: ${product.prodid');
//                 }
//             }

//         }
//     }

//     this.totalAmount = new mongoose.Types.Decimal128(this.totalAmount.toString());
//     this.totalTax = new mongoose.Types.Decimal128(this.totalTax.toString());
    
//     next();
// });


export default mongoose.default.model("Order", orderSchema);