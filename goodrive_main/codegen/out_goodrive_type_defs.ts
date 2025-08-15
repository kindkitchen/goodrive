import { GraphQLResolveInfo } from 'graphql';
import { GqlApiCtx } from './codegen/GqlApiCtx.ts';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ApiKey = {
  __typename?: 'ApiKey';
  _id: Scalars['ID']['output'];
  bucket: Bucket;
  bucket_id: Scalars['ID']['output'];
};

export type Bucket = {
  __typename?: 'Bucket';
  /** It should be the same as email */
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  keys: Array<ApiKey>;
  user: User;
  user_id: Scalars['ID']['output'];
};

export type Session = {
  _id: Scalars['ID']['output'];
  created_at: Scalars['String']['output'];
  updated_at: Scalars['String']['output'];
};

export type SessionGhost = Session & {
  __typename?: 'SessionGhost';
  _id: Scalars['ID']['output'];
  created_at: Scalars['String']['output'];
  updated_at: Scalars['String']['output'];
};

export type SessionNormal = Session & {
  __typename?: 'SessionNormal';
  _id: Scalars['ID']['output'];
  active_bucket?: Maybe<Bucket>;
  active_bucket_id?: Maybe<Scalars['ID']['output']>;
  created_at: Scalars['String']['output'];
  updated_at: Scalars['String']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  buckets: Array<Bucket>;
  sessions: Array<SessionNormal>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Session: ( SessionGhost ) | ( SessionNormal );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ApiKey: ResolverTypeWrapper<ApiKey>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bucket: ResolverTypeWrapper<Bucket>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Session: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Session']>;
  SessionGhost: ResolverTypeWrapper<SessionGhost>;
  SessionNormal: ResolverTypeWrapper<SessionNormal>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ApiKey: ApiKey;
  Boolean: Scalars['Boolean']['output'];
  Bucket: Bucket;
  ID: Scalars['ID']['output'];
  Session: ResolversInterfaceTypes<ResolversParentTypes>['Session'];
  SessionGhost: SessionGhost;
  SessionNormal: SessionNormal;
  String: Scalars['String']['output'];
  User: User;
};

export type ApiKeyResolvers<ContextType = GqlApiCtx, ParentType extends ResolversParentTypes['ApiKey'] = ResolversParentTypes['ApiKey']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bucket?: Resolver<ResolversTypes['Bucket'], ParentType, ContextType>;
  bucket_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BucketResolvers<ContextType = GqlApiCtx, ParentType extends ResolversParentTypes['Bucket'] = ResolversParentTypes['Bucket']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  keys?: Resolver<Array<ResolversTypes['ApiKey']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResolvers<ContextType = GqlApiCtx, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  __resolveType: TypeResolveFn<'SessionGhost' | 'SessionNormal', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SessionGhostResolvers<ContextType = GqlApiCtx, ParentType extends ResolversParentTypes['SessionGhost'] = ResolversParentTypes['SessionGhost']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionNormalResolvers<ContextType = GqlApiCtx, ParentType extends ResolversParentTypes['SessionNormal'] = ResolversParentTypes['SessionNormal']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  active_bucket?: Resolver<Maybe<ResolversTypes['Bucket']>, ParentType, ContextType>;
  active_bucket_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = GqlApiCtx, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  buckets?: Resolver<Array<ResolversTypes['Bucket']>, ParentType, ContextType>;
  sessions?: Resolver<Array<ResolversTypes['SessionNormal']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GqlApiCtx> = {
  ApiKey?: ApiKeyResolvers<ContextType>;
  Bucket?: BucketResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  SessionGhost?: SessionGhostResolvers<ContextType>;
  SessionNormal?: SessionNormalResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

