import mongoose from "mongoose";
import Contact from "../models/Contact.js";
import validateContact from "../models/Contact.js";

//create contact
export const contact = async(req, res) => {
    const {error} = validateContact(req.body);
    if(error){
        return res.status(400).json({error: error.details[0].message})
    }
    
    try{  
    const newContact= new Contact(req.body);
    await newContact.save();
        return res.status(201).json(newContact);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

//fetch contact
export const getContact = async(req,res) =>{
    try{
        const myContacts = await Contact.find({postedBy: req.user}).populate(
            "postedBy",
            "-password"
        );
        return res.status(200).json({contacts: myContacts}) 
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:"Server error"});
    }
}

//update
export const updateContact= async(req,res) =>{
    const {id} = req.body;
    if(!id) return res.status(400).json({error:"no id specified"});
    if(!mongoose.isValidObjectId(id))
        return res.status(400).json({error: "please enter a valid id"})
    try{
        const contact = await Contact.findOne({ _id:id });
        if(req.user._id.toString() !== contact.postedBy._id.toString())
        return res.status(401).json({error:"you can't edit other people contacts"});
        const updatedData ={...req.body, id:undefined}
        const result = await Contact.findByIdAndUpdate(id, updatedData, {new:true});
        return res.status(200).json({...result._doc});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Server error"})
    }
}

//delete
export const deleteContact = async(req,res) =>{
    const {id} =req.params;
    if(!id) return res.status(400).json({error:"no id specified"});
    if(!mongoose.isValidObjectId(id))
        return res.status(400).json({error: "please enter a valid id"})
        try{
            const contact = new Contact.findOne({ _id: id});
            if(!contact) return res.status(400).json({error: "No Contact found"})
            if(req.user._id.toString() !== contact.postedBy._id.toString())
            return res.status(401).json({error: "you can't delete other people contact"})
            const result = await Contact.deleteOne({_id: id})
            const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
                "postedBy",
                "-password"
              );
          
              return res
                .status(200)
                .json({ ...contact._doc, myContacts: myContacts.reverse() });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({error: "Server error"})
        }
}


  
  
  