import express, { Request, Response } from "express";
import { body } from "express-validator";

import { validateRequest , requireAuth} from "../../../common/src";
import { User } from "../models/user";
import { DoctorType } from "../models/doctor";
const router = express.Router();

router.get(
    '/', 
    requireAuth,
    [
        body("id").withMessage("id is required").notEmpty()
    ],
    validateRequest,
    async (req :Request, res :Response) => {
        
       const doctor =  await User.findOne({id:req.body.id}).populate("doctor")
       res.send(doctor)


})

router.post(
    '/', 
    [
        body("address").withMessage("address is required").notEmpty(),
        body("type").trim().isIn(Object.values(DoctorType)).withMessage("specialization is required").notEmpty(),
        body("fees").trim().withMessage("consulting fees is required").notEmpty(),
        body("city").trim().withMessage("city is required").notEmpty(),
        body("pincode").trim().withMessage("pincode is required").notEmpty(),
        body("defaultTiming").withMessage("defaultTiming is required").notEmpty(),
        body("timePerAppointment").withMessage("Time per appointment is required").notEmpty()
        
    ],
    validateRequest,
    async (req :Request, res :Response) => {

        const {address,type,fees,city,pincode,defaultTiming,timePerAppointment} = req.body
        
        
       const doctor =  await User.findOne({id:req.body.id}).populate("doctor")
       res.send(doctor)


})

export default router
