const passwordGenerator = require("generate-password");
import TokenAuthenticator from "../helpers/TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import ProductService from "../services/ProductService";

class ProductController {
  
    static async getAllProducts (req, res){
        try {
            const products = await ProductService.getAllProducts(req, res);

            Response.successMessage(res, "All availble products retrived successfully",)
        } catch (error) {
            
        }
    }

}
export default ProductController;
