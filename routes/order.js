import express from 'express'
import Order from '../models/Order.js';

export const orderRouter = express.Router();

/**
 * POST - Create a Order
 */
orderRouter.post("/", async(req,res) =>{
    try{
        const order = new Order(req.body);
        await order.save();

        // incase if you need to get product details and user details, you can use below populate method
        // Populate the prodid and userid fields with data from the Product and User models
        // const populatedOrder = await Order.findById(order._id)
        //                                  .populate('prodid')//populate product ref prodid
        //                                  .populate('userid') //populate user ref userid
        
        res.json(order).status(201);
    }catch(e){
        console.error(e);
        res.json({message: e.message}).status(400);
    }
})

/**
 * GET - get all Orders
 */
orderRouter.get('/', async(req, res) => {
    try{
        const order = await Order.find()
                                 .populate('products.prodid')
                                 .populate('userid');

         // Map through the orders and add the `name` fields from the populated data
         //product name and username are displayed by populating the products.prodid
        const result = order.map(order => ({
            orderId:order._id,
            userName: order.userid.username,
            products: order.products.map(product => ({
                productName: product.prodid.prodname, 
                price: product.price,           
                quantity: product.quantity,
                total: product.total,
                tax: product.tax
            })),
            totalAmount: order.totalAmount,
            totalTax: order.totalTax        
        }));

        res.json(result).status(201);

    }catch(e){
        console.error(e);
        res.json({message: e.message}).status(400);
    }
})

/**
 * GET Order by Id
 */
orderRouter.get('/:id', async(req,res) => {
    try{
        const order = await Order.findById(req.params.id)
                                 .populate('products.prodid')
                                 .populate('userid');

// Map through the orders and add the `name` fields from the populated data
//product name and username are displayed by populating the products.prodid
const result = {
                    orderId:order._id,
                    userName: order.userid.username,
                    products: order.products.map(product => ({
                    productName: product.prodid.prodname, 
                    price: product.price,           
                    quantity: product.quantity,
                    total: product.total,
                    tax: product.tax
                })),
                totalAmount: order.totalAmount,
                totalTax: order.totalTax        
};
        res.json(result).status(201);
    }catch(e){
        console.error(e);
        res.json({message: e.message}).status(400);
    }
})

/**
 * PATCH - update Order
 */
orderRouter.patch('/:id', async(req, res) =>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        if(!updatedOrder) res.send("Order not found").status(401);
        else res.send(updatedOrder).status(200);

    }catch(e){
        console.error(e);
        res.json({message: e.message}).status(499);
    }
})

/**
 * DELETE -- order by id
 */
orderRouter.delete("/:id", async(req, res) =>{
    try{
        const deletedOrder = await Order.findByIdAndDelete(
            req.params.id,
            req.body,
            {new: true}
        )

        if(!deletedOrder) res.send("Order not found").status(401);
        else res.send(deletedOrder).status(200);

    }catch(e){
        console.error(e);
        res.send({message: e.message}).status(500);
    }
})