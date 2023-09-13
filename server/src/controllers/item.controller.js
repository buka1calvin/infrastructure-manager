import ItemRegister from "../models/ItemRegister";

export const createUserItem = async (req, res) => {
    try {
      const user= req.user;
  
      if (!user || (user.role !== "student" && user.role !== "visitor")) return res.status(401).json("Unauthorized user!");
  
      const { itemName,serialNumber } = req.body;
      const itemPictures = req.files.map((img) => img.path);
  
      const newItem = new ItemRegister({
        itemName,
        serialNumber,
        itemPictures,
        createdBy:{
          id:user._id,
          firstname:user.firstname,
          lastname:user.lastname,
          role:user.role,
          telephone:user.phoneNumber
        }
      });
  
      await newItem.save();
  
      return res.status(201).json({
        item: newItem,
        message: 'Item created successfully!',
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  export const itemStatusUpdate = async (req, res) => {
    try {
      const user = req.user;
      if (user.role !== "admin") {
        return res.status(401).json({ error: "only admin is allowed!" });
      }
      const itemId = req.params._id; // Assuming you get the item ID from the request params
      const { itemStatus } = req.body; // Get the itemStatus from the request body
  
      const item = await ItemRegister.findById(itemId);
  
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      // Set the itemStatus to the provided value
      item.itemStatus = itemStatus;
  
      await item.save();
  
      return res.status(200).json({
        item: item,
        message: `Item status updated to ${item.itemStatus}`,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }; 

  export const getAllItems=async(req,res)=>{
    try{
    const user=req.user;
    if(user.role!=="admin"){
      return res.status(401).json({error:"only admin is allowed!"})
    }
    console.log("user",user)
    const userItems=await ItemRegister.find();
    return res.status(200).json(userItems)
  }
  catch(error){
    console.log("error hello world!")
    return res.status(500).json({error:error.message})
  }
  }