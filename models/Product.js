import mongoose, { Schema, model, models } from "mongoose";


const ProductSchema = new Schema({
  title: {type:String, required:true},
  description: String,
  price: {type: Number, required: true},
	measures: {type: Object}, 
  images: [{type:String}],
  category: {type:mongoose.Schema.Types.ObjectId, ref:'Category'},
  properties: {type:Object},
	available: {type:Boolean},
	active: {type:Boolean},

}, {
  timestamps: true,
});

export const Product = models?.Product || model('Product', ProductSchema);