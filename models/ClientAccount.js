import mongoose, { Schema, model, models } from "mongoose";


const ClientAccountSchema = new Schema({
  email: {type:String, required:true},
  surname: {type:String, required:true},
  name: {type:String, required:true},
  password: {type:String, required:true},
}, {
  timestamps: true,
});

export const ClientAccount = models?.ClientAccount || model('ClientAccount', ClientAccountSchema);