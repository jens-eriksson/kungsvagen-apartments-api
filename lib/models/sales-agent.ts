import * as mongoose from 'mongoose';
import { FileSchema } from './file';

const Schema = mongoose.Schema;

const SalesAgentSchema = new Schema({
    key: { type: String, required: 'Key is required' },
    name: { type: String, required: 'Name is required' },
    phone: String,
    email: String,
    photo: FileSchema
});

export const SalesAgent = mongoose.model("SalesAgent", SalesAgentSchema);