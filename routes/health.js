//Either of this method is used for creating router

// import { Router } from "express";
//export const healthRouter = new Router();

import express from "express";
export const healthRouter = express.Router();

healthRouter.get('/',(req, res) =>{
    res.status(200).json({
        "status": "ok"
    })
});