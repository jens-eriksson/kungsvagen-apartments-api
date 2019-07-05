import * as mongoose from 'mongoose';
import { FileSchema } from './file';
import { FeatureCategorySchema } from './feature';
const Schema = mongoose.Schema;



const UnitSchema = new Schema({
    key: { type: String, required: 'Key is required' },
    name: { type: String, required: 'Name is required' },
    description: String,
    projectKey: String,
    salesAgentKey: String,
    size: Number,
    price: Number,
    rent: Number,
    sold: Boolean,
    images: [FileSchema],
    documents: [FileSchema],
    featureCategories: [FeatureCategorySchema]
});

export const Unit = mongoose.model('Unit', UnitSchema);