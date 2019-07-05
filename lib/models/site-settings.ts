import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SiteSettingsSchema = new Schema({
    allowAnonymousAccess: Boolean
},
{ _id: false});

export const SiteSettings = mongoose.model("SiteSettings", SiteSettingsSchema);