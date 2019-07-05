import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FileSchema = new Schema({
    name: { type: String, required: 'Name is required' },
    description: String
},
{ _id: false});

