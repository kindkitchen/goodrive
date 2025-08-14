import { Brand, Data } from "effect";
import { ApiKey } from "./ApiKey.ts";
import { ID_User, User } from "./User.ts";

export type ID_Bucket = string & Brand.Brand<"ID_Bucket">;
export const ID_Bucket = Brand.nominal<ID_Bucket>();

export type Bucket = {
  _tag: "Bucket";
  _id: ID_Bucket;
  email: string;
  user_id: ID_User;
  user(): Promise<User>;
  keys(): Promise<ApiKey[]>;
};

export const Bucket = Data.tagged<Bucket>("Bucket");
