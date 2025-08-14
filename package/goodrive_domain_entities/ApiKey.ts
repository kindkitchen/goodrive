import { Brand, Data } from "effect";
import { Bucket, ID_Bucket } from "./Bucket.ts";

export type ID_ApiKey = string & Brand.Brand<"ID_ApiKey">;
export const ID_ApiKey = Brand.nominal<ID_ApiKey>();

export type ApiKey = {
  _tag: "ApiKey";
  _id: ID_ApiKey;
  bucket_id: ID_Bucket;
  bucket(): Promise<Bucket>;
};

export const ApiKey = Data.tagged<ApiKey>("ApiKey");
