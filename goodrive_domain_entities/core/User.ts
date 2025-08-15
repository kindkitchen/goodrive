import { Brand, Data } from "effect";
import { Bucket } from "./Bucket.ts";
import { SessionNormal } from "./Session.ts";

export type ID_User = string & Brand.Brand<"ID_User">;
export const ID_User = Brand.nominal<ID_User>();

export type User = {
  _tag: "User";
  _id: ID_User;
  buckets(): Promise<Bucket[]>;
  sessions(): Promise<SessionNormal[]>;
};

export const User = Data.tagged<User>("User");
