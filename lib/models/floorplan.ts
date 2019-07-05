import * as mongoose from 'mongoose';
import { FileSchema } from './file';
import { FeatureSchema } from './feature';

const Schema = mongoose.Schema;

const FloorplanSchema = new Schema({
    key: { type: String, required: 'Key is required' },
    name: { type: String, required: 'Name is required' },
    images: [FileSchema],
    documents: [FileSchema],
    features: [FeatureSchema]
});

export const Floorplan = mongoose.model("Floorplan", FloorplanSchema);