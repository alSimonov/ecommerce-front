import {mongooseConnect} from "@/lib/mongoose";
import { Order } from "@/models/Order";


export default async function handle(req, res) {
	const {method} = req;
  await mongooseConnect();


  
  if(method === 'GET'){
 
   
    // if (req.query?.title && req.query?.sort) {
        
    //     let sortSel =  "";
       
    //     if(req.query?.sort === "date"){
    //         sortSel =  {sort: { "createdAt" : req.query?.sortVect}};
    //     } else if (req.query?.sort === "paid"){
    //         sortSel =  {sort: { "paid" : req.query?.sortVect}};
    //     }  else if (req.query?.sort === "clientInfo"){
    //       sortSel =  {sort: { "name" : req.query?.sortVect}};
    //     } else if (req.query?.sort === "statusOrder"){
    //       sortSel =  {sort: { "statusOrder" : req.query?.sortVect}};
    //     }

    //     const queryDB = { "name": { "$regex": req.query?.title, "$options": "i" } };

    //   res.json(await Order.find(queryDB, null, sortSel));	
    // }
    if (  req.query?.sort ) {    
        let sortSel =  "";

        if(req.query?.sort === "date"){
          sortSel =  {sort: { "createdAt" : req.query?.sortVect}};
        } else if (req.query?.sort === "paid"){
            sortSel =  {sort: { "paid" : req.query?.sortVect}};
        }  else if (req.query?.sort === "clientInfo"){
          sortSel =  {sort: { "name" : req.query?.sortVect}};
        } else if (req.query?.sort === "statusOrder"){
          sortSel =  {sort: { "statusOrder" : req.query?.sortVect}};
        }

        res.json(await Order.find({email:req.query.email}, null, sortSel));	
      }
      else {
        res.json(await Order.find({email:req.query.email}, null, { sort: {'createdAt': -1}}));
      }
    
  }



  
  console.log(req.query.email);
}