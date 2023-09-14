// itemName
// serialNumber
import mongoose from "mongoose";
// import passportLocalMongoose from 'passport-local-mongoose';
 
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
  },
  serialNumber: {
    type: String,
  },
  createdBy: {
    id:{
      type:String,
      ref: "User"
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    role: {
      type: String,
    },
    telephone:{
      type:String
    }
  },
  itemPictures: {
    type: [String],
    default: [],
  },
  itemStatus:{
    type:Boolean,
  }

}, { timestamps: true });



// userSchema.plugin(passportLocalMongoose)
const ItemRegister=mongoose.model('Item',itemSchema)

export default ItemRegister;
