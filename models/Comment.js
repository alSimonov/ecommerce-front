import mongoose, {  model, models, Schema} from "mongoose";

const CommentSchema = new Schema({  
  productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
  commentText: {type: String, } ,
  ratingValue: {type: Number, min: 0, max: 50},
  clientAccountId: {type: mongoose.Schema.Types.ObjectId, ref: 'ClientAccount'},
}, {
  timestamps: true,
});

export const Comment = models?.Comment || model('Comment', CommentSchema);  