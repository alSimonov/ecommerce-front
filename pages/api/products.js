import { Category } from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";
import { Product } from "@/models/Product";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    
    if(method === 'GET'){

        
        
        if (req.query?.id) {
            const queryDB = { $and: [ {active: true}, {category: req.query.id, }]} ;
			// res.json(await Product.find({category:req.query.id}));
			res.json(await Product.find(queryDB));
		} 
       
        else if (req.query?.title && req.query?.sort) {
            console.log("wwwwwww222222222222222222");
            let sortSel =  "";
            // let sortSel =  {sort: { "price" : req.query?.sortVect}};
            if(req.query?.sort === "price"){
                sortSel =  {sort: { "price" : req.query?.sortVect}};
            }
            // else if (req.query?.sort === "rate"){
            //     sortSel =  {sort: { "rate" : req.query?.sortVect}};
            // }
             else if (req.query?.sort === "title"){
                sortSel =  {sort: { "title" : req.query?.sortVect}};
            } 
            
            const queryDB = { $and: [ {active: true}, { "title": { "$regex": req.query?.title, "$options": "i" } } ]};
            
            // const queryDB = { "title": { "$regex": req.query?.title, "$options": "i" } };

			res.json(await Product.find(queryDB, null, sortSel));	
		}
        else if (  req.query?.sort ) {
            console.log("wwwwwwwwww333333333333333333333333");
            console.log(req.query?.sortVect);
            console.log(req.query?.sort);
           
            let sortSel =  "";

            if(req.query?.sort === "price"){
                sortSel =  {sort: { "price" : req.query?.sortVect}};
            }
            // else if (req.query?.sort === "rate"){
            //     sortSel =  {sort: { "rate" : req.query?.sortVect}};
            // } 
            else {
                sortSel =  {sort: { "title" : req.query?.sortVect}};
            } 

            const queryDB = {active: true};


			res.json(await Product.find(queryDB, null, sortSel));	
        }
        else {
            console.log("wwwwwwwwww444444444444444");
            const queryDB = {active: true};


			res.json(await Product.find(queryDB, null, {sort: {'title': -1}}));
		}
        
    }
     
}