export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  NonEmptyString: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean'];
  register: UserLogin;
  updatedMe: User;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  newPasswordConfirmation: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  userData: UserRegisterInput;
};


export type MutationUpdatedMeArgs = {
  data: UserMeUpdateData;
};

export type Query = {
  __typename?: 'Query';
  findMe: User;
  findUsers: Array<User>;
  login: UserLogin;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['NonEmptyString'];
  firstName: Scalars['NonEmptyString'];
  id: Scalars['NonEmptyString'];
  lastName: Scalars['NonEmptyString'];
  passwordHash: Scalars['NonEmptyString'];
  updatedAt: Scalars['DateTime'];
};

export type UserLogin = {
  __typename?: 'UserLogin';
  email?: Maybe<Scalars['NonEmptyString']>;
  id?: Maybe<Scalars['NonEmptyString']>;
  token: Scalars['String'];
};

export type UserMeUpdateData = {
  email?: InputMaybe<Scalars['NonEmptyString']>;
  firstName?: InputMaybe<Scalars['NonEmptyString']>;
  lastName?: InputMaybe<Scalars['NonEmptyString']>;
};

export type UserRegisterInput = {
  email: Scalars['NonEmptyString'];
  firstName: Scalars['NonEmptyString'];
  lastName: Scalars['NonEmptyString'];
  password: Scalars['String'];
};
