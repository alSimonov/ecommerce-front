import { Category } from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";
import { Product } from "@/models/Product";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    
    const limitNum = 12;


    if(method === 'GET'){

        var skipNum = 0;
        if(req.query?.page){
            skipNum = ( req.query.page - 1 ) * limitNum;
        }
        var objQuery = {};
        
        if(req.query?.filters){
            
            var filtersObj = JSON.parse( req.query?.filters );
            var index;
            var arrTemp = [];
            var bigArrTemp = [ {active: true}, {category: req.query.id, }];
            var nameTemp;
            
            for (const [key, value] of Object.entries(filtersObj)) {
                arrTemp = [];
                for (index = 0; index < value.length; ++index) {
                    nameTemp = "properties."+key;
                    arrTemp.push({ [nameTemp]:  value[index] });
                    // console.log(key, value[index]);
                }
                bigArrTemp.push({"$or" : arrTemp});
            }
    
            objQuery["$and"] = bigArrTemp;

        }



      
        if(req.query?.count){

            if(req.query?.id){
                const queryDB = { 
                    $and: [ {active: true}, {category: req.query.id, }],

                } ;
	
                res.json( Math.ceil( (await Product.find(objQuery, null, {})).length / limitNum ) );

            }else{
                res.json( Math.ceil( (await Product.find({}, null, {})).length / limitNum ) );
            }
        }
        else if (req.query?.id) {
            

            var sortSel =  { skip: skipNum, limit: limitNum};

            const queryDB = { 
                $and: [ {active: true}, {category: req.query.id, }],
                // $or: [{ status: 'active' }, { status: 'pending' }]

            } ;
	
			res.json(await Product.find(objQuery, null, sortSel));
			// res.json(await Product.find(queryDB, null, sortSel));
		} 
        else if (req.query?.title && req.query?.sort) {
      
            let sortSel =  "";
            
            sortSel =  {sort: { [req.query?.sort] : req.query?.sortVect}, skip: skipNum, limit: limitNum};


            // if(req.query?.sort === "price")
            //     sortSel =  {sort: { "price" : req.query?.sortVect}, skip: skipNum, limit: limitNum};
            
            // else if (req.query?.sort === "title")
            //     sortSel =  {sort: { "title" : req.query?.sortVect}, skip: skipNum, limit: limitNum};
             
            
            const queryDB = { $and: [ {active: true}, { "title": { "$regex": req.query?.title, "$options": "i" } } ]};
            
            // const queryDB = { "title": { "$regex": req.query?.title, "$options": "i" } };

			res.json(await Product.find(queryDB, null, sortSel));	
		}
        else if (  req.query?.sort ) {
         
           
            let sortSel =  "";
            sortSel =  {sort: { [req.query?.sort] : req.query?.sortVect}, skip: skipNum, limit: limitNum};


            // if(req.query?.sort === "price")
            //     sortSel =  {sort: { "price" : req.query?.sortVect}, skip: skipNum, limit: limitNum};
            
            // else 
            //     sortSel =  {sort: { "title" : req.query?.sortVect}, skip: skipNum, limit: limitNum};
             

            const queryDB = {active: true};


			res.json(await Product.find(queryDB, null, sortSel));	
        }
        else {

            const queryDB = {active: true};


			res.json(await Product.find(queryDB, null, {sort: {'title': -1}, skip: skipNum, limit: limitNum}));
		}
        
    }
     
}