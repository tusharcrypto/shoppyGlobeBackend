import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:{
 type:String,
 require:true
  } ,price:{
    type:Number,
    required:true
  }, description:{
    type:String,
    required:true
  },stock_quantity:{
    type:Number,
    required:true
  }
})

const Product = mongoose.model("Product",productSchema)
export default Product;