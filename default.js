import Product from './Model/product-schema.js';
import {products} from './constants/product.js'
const DefaultData = async() => {
  try{
  
   
    await Product.insertMany(products);
         console.log('Data imported successfully');
  }catch(error)
  {
    console.log('error while inserting default data',error.message);
  }
}

export default DefaultData;