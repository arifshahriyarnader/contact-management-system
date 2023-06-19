import Contact from "../models/Contact.js";

export const contact = async(req, res) => {
    const {name, address, email, phone} = req.body;
    try{

    }
    catch(err){
        console.log(err);
    }
}