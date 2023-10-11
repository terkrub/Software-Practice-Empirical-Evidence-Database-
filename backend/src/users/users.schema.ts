import { Schema } from 'mongoose';

export const UsersSchema = new Schema({
  email: String,
  password: String,
  type: { type: String, default: "user" },
});
