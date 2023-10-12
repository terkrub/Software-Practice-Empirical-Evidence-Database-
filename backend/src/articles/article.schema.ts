import { Schema } from 'mongoose';

export const ArticleSchema = new Schema({
  title: String,
  authors: [String],
  journalName: String,
  yearOfPublication: Number,
  volume: String,
  number: String,
  pages: String,
  doi: String,
  SE_practice: String,
  claim:String,
  result_of_evidence: String,
  type_of_research: String,
  dateSubmitted: { type: Date, default: Date.now },
  isDuplicate: { type: Boolean, default: false },
  modCheck: { type: Boolean, default: false },
  approve: { type: Boolean, default: false },
});
