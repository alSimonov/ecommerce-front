import mongoose, {  model, models, Schema} from "mongoose";

const AddressDestinationSchema = new Schema({
    city: {type: String, required:true} ,
    postalCode: {type: String, required:true} ,
    street: {type: String, required:true} ,
    country: {type: String, required:true} ,
    houseNumber: {type: String, required:true} ,
    clientAccountId: {type: mongoose.Schema.Types.ObjectId, ref: 'clientaccounts'},
});

export const AddressDestination = models?.AddressDestination || model('AddressDestination', AddressDestinationSchema);  