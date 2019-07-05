import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FeatureSchema = new Schema({
    name: String,
    value: String
}, { _id: false });

export const FeatureCategorySchema = new Schema({
    name: String,
    features: [FeatureSchema]
}, { _id: false });