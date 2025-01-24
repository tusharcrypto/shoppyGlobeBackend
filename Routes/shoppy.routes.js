import { addProduct, addtocart, deletefromCart, getllproducts, getproductByid, loginuser, registerUsr, updateCart, verifyUser } from "../Controller/products.controller.js";

export function routes(app){
 app.post("/product",addProduct)
 app.get("/products",getllproducts);
 app.get("/product/:id",getproductByid);
 app.post("/cart",verifyUser,addtocart);
 app.put("/cart/:id",verifyUser,updateCart);
 app.delete("/cart/:id",verifyUser,deletefromCart);
 app.post("/register",registerUsr)
 app.post("/login",loginuser)
}