import {mongooseConnect} from "@/lib/mongoose";
import { Order } from "@/models/Order";


export default async function handle(req, res) {
	const {method} = req;
  await mongooseConnect();

  const limitNum = 5;

  
  if(method === 'GET'){
 
    var skipNum = 0;
    if(req.query?.page){
        skipNum = ( req.query.page - 1 ) * limitNum;
    }

    // if (req.query?.title && req.query?.sort) {
        
    //     let sortSel =  "";
       
    // sortSel =  {sort: { [req.query?.sort] : req.query?.sortVect}};
    
    //     const queryDB = { "name": { "$regex": req.query?.title, "$options": "i" } };

    //   res.json(await Order.find(queryDB, null, sortSel));	
    // }


    if(req.query?.count){

      res.json( Math.ceil( (await Order.find({email:req.query.email}, null, {})).length / limitNum ) );
        
    }
    else if (  req.query?.sort ) {    
        let sortSel =  "";

        sortSel =  {sort: { [req.query?.sort] : req.query?.sortVect}, skip: skipNum, limit: limitNum};
  
        res.json(await Order.find({email:req.query.email}, null, sortSel));	
    }
    else {
        res.json(await Order.find({email:req.query.email}, null, { sort: {'createdAt': -1}, skip: skipNum, limit: limitNum}));
    }
    
  }



  
  console.log(req.query.email);
}