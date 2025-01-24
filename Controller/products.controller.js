import Cart from "../Model/cart.model.js";
import Product from "../Model/product.model.js";
import User from "../Model/user.model.js";
import jwt from "jsonwebtoken"

// add products
export function addProduct(req,res){
 const{name, price, description,stock_quantity} = req.body;
 if(!name || !price || !description || !stock_quantity){
 return  res.status(400).json({msg:"All field required"})
 }
 const prod = new Product({
  name:name,
  price:price,
  description:description,
  stock_quantity:stock_quantity
 })
 prod.save().then((data)=>{
 if(!data){
  return res.send("Data not added to db")
 }
 res.status(200).json({msg:"Product add scussfuly",product:data})
 })
}
// get all the products
export function getllproducts(req,res){
   try {
    Product.find({}).then((data)=>{
    if(!data){
      res.send("No products in the databse");
    }
    res.send(data);
    })
    
   } catch (error) {
    console.log(error)
   }
}

// get product by id
export async function getproductByid(req,res){

 try {
  const{id} = req.params;
  const data = await Product.findById(id)
  if(!data){
   return res.send("No user found")
  }
  res.send(data)
 } catch (error) {
  res.status(400).json({msg:"Something went wrong"})
 }
 
}

//add product to cart.
export async function addtocart(req,res){
  try {
    const {id,quantity} = req.body;
    const data = await Product.findById(id);
    if(!data){
      return res.send("That product doesnt exist")
    }
    const checkproduct = await Cart.findOne({productid:id});
    if(checkproduct){
      return res.send("This product already exists in cart")
    }
    const crt =  new Cart({
      productid:id,
       quantity
    })
    await crt.save()
    res.status(200).send({
      message: "Product added to cart successfully.",
      cart: crt,
    });
  
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the product to the cart.");
  }

}

//update the cart by id

export async function updateCart(req,res){
  try {
    const {id} = req.params;
   const data = await Cart.findById(id);
   if(!data){
    return res.json({msg:"That product doesnot exsits"})
   }
   const prd = await Cart.findByIdAndUpdate(
    id,
    {
      $set:req.body
    }
   )
   res.status(200).json({ msg: "Quantity updated successfully", user: prd });

  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
}

//delete item form cart
export async function deletefromCart(req,res) {
  try {
    const {id} = req.params;
    const data = await Cart.findByIdAndDelete(id);
    res.status(200).json({ msg: "Item delete successfully", product: data });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
}

//register the user
export async function registerUsr(req,res) {
  try {
    const {username,password} = req.body;
    const user = new User({
      username,
      password
    })
   user.save().then((data)=>{
     if(!data){
      return res.status(400).json({msg:"USer is not registered"})
     }
     res.send({msg:"User add successfuly"})
   })
  } catch (error) {
    console.log(error);
    res.send(error)
  }
}
//loging the user
export async function loginuser(req,res) {
try {
  const {username,password} = req.body;
  const user = await User.findOne({
    username:username
  })
 if(!user){
  return res.status(404).json({msg:"User dont exists"})
 }
 if(username!==user.username || password !== user.password){
  return res.status(400).json({msg:"password or username is not matching"})
 }
 const token =  jwt.sign(username,"privatekey");
 res.send(token)
} catch (error) {
  console.log(error);
  res.send(error)
}
  
}

//verify the token as middleware
export function verifyUser(req,res,next){
  try {
    const header = req.headers["authorization"];
   
      const bearer = header.split(" ");
      const token = bearer[1];
      jwt.verify(token,"privatekey",(err,user)=>{
        if(err){
          return res.status(403).json({'msg':'Invlaid JWT token'})
        }
        req.username = user.username;
        next()
      })
   
    
  } catch (error) {
     res.status(403).json({'msg':'Invlaid JWT token'})
  }
}