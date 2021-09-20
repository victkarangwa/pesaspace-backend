import { v4 as uuid } from "uuid";
import { products } from "../db/models";
import QueryService from "./QueryService";


class ProductService {
 
    static async getAllProducts(){
      
        const allProducts = await QueryService.findAll(products);

        return allProducts;

    }

}
export default ProductService;
