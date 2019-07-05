import * as mongoose from 'mongoose';
import { FileSchema } from './file';
import { FeatureSchema } from './feature';

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    key: { type: String, required: 'Key is required' },
    name: { type: String, required: 'Name is required' },
    description: String,
    city: String,
    salesLaunch: String,
    active: Boolean,
    images: [FileSchema],
    documents: [FileSchema],
    summary: [FeatureSchema]
});

export const Project = mongoose.model("Project", ProjectSchema);