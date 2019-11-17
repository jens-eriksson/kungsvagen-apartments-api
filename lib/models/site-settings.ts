import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SiteSettingsSchema = new Schema({
    key: { type: String, required: 'Key is required' },
    allowAnonymousAccess: Boolean
},
{ _id: false});

export const SiteSettings = mongoose.model("SiteSettings", SiteSettingsSchema);