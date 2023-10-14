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
  SE_practice: { type: String, default: '' },
  claim:{ type: String, default: '' },
  result_of_evidence: { type: String, default: '' },
  type_of_research: { type: String, default: '' },
  dateSubmitted: { type: Date, default: Date.now },
  isDuplicate: { type: Boolean, default: false },
  modCheck: { type: Boolean, default: false },
  approve: { type: Boolean, default: false },
});
