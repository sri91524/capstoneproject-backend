import express from "express";
import Product from "../models/Product.js";


export const prodRouter = express.Router();

/**
 * POST - Create a Product
 */
prodRouter.post("/", async(req, res) => {
    try{
        const prod = new Product(req.body);
        await prod.save();
        res.json(prod).status(201);
    }catch(e){
        console.error(e);
        res.json({message: e.message}).status(400);

    }
})

/**
 * GET - get all products
 */
prodRouter.get('/', async(req,res) =>{
    try{

        const {category, search} = req.query;
        let filter = {};
        
        if(category){
            filter.category = category;
        }
        if(search){
            filter.prodname = {$regex: search, $options: 'i'};
        }

        const prod = await Product.find(filter);
        res.json(prod).status(201);
    }catch(e){
        console.error(e);
        res.json({message: e.message}).status(400);
    }
})

/**
 * GET Product by id 
 */
 prodRouter.get("/:id", async(req,res) =>{
    try{
        const prod = await Product.findById(req.params.id);
        res.json(prod).status(201);
    }catch(e){
        console.error(e);
        res.json({message: e.message}).status(400);
    }
    })

/**
 * PATCH -- update products
 */
prodRouter.patch("/:id", async(req, res) =>{
    try{
        const updatedProd = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {new: true} 
        );

        if(!updatedProd) res.send("Product not found").status(401);
        else res.send(updatedProd).status(200);        
    }catch(e){
        console.error(e);
        res.json({message: e.message}).status(400);
    }
})

/**
 * DELETE user by id
 */
prodRouter.delete("/:id", async(req,res) =>{
    try{
        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id,
            req.body,
            {new: true}
        )
        if(!deletedProduct) res.send("Product not found").status(401);
        else res.send(deletedProduct).status(200);        

    }catch(e){
        console.error(e);
        res.send(e.message).status(500);
    }
})