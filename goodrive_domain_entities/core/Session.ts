import { Brand, Data } from "effect";
import { Bucket, ID_Bucket } from "./Bucket.ts";
import { ID_User, User } from "./User.ts";

export type ID_Session = string & Brand.Brand<"ID_Session">;
export const ID_Session = Brand.nominal<ID_Session>();
export type Session = {
  _id: ID_Session;
  created_at: Date;
  updated_at: Date;
};

export type SessionGhost = Session & {
  _tag: "SessionGhost";
};
export type SessionNormal = Session & {
  _tag: "SessionNormal";
  user_id: ID_User;
  active_bucket_id: ID_Bucket;
  active_bucket(): Promise<Bucket>;
  user(): Promise<User>;
};
export const SessionGhost = Data.tagged<SessionGhost>("SessionGhost");
export const SessionNormal = Data.tagged<SessionNormal>("SessionNormal");
