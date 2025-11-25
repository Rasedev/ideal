
const merchantSchema = require("../models/merchantSchema");
const userList = require("../models/userSchema");


async function merchantController(req,res){
    
    const { storename, officialemail, officialphone, address, owner, products } = req.body;
    //console.log(storename, officialemail, officialphone, address, owner, products);


     const merchant = new merchantSchema({
         storename,
         officialemail, 
         officialphone, 
         address, 
         owner,  
         products,
     });
 
     merchant.save();
   await userList.findByIdAndUpdate(
        {_id: owner},
        { role: "merchant" },
        { new: true}
    ); 
     res.json({ success : "congratulation. You are a Merchant" });

}  


async function getAllStoreController(req,res){
    // console.log("store")
    const data = await merchantSchema.find({})
    res.send(data)
}



module.exports = {merchantController,getAllStoreController};