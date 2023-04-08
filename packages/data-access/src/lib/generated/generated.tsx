import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers?: Maybe<Array<Maybe<User>>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
};

export type UserListQueryVariables = Exact<{ [key: string]: never; }>;


export type UserListQuery = { __typename?: 'Query', getAllUsers?: Array<{ __typename?: 'User', id: number, username?: string | null } | null> | null };


export const UserListDocument = gql`
    query userList {
  getAllUsers {
    id
    username
  }
}
    `;

/**
 * __useUserListQuery__
 *
 * To run a query within a React component, call `useUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserListQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserListQuery(baseOptions?: Apollo.QueryHookOptions<UserListQuery, UserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
      }
export function useUserListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
        }
export type UserListQueryHookResult = ReturnType<typeof useUserListQuery>;
export type UserListLazyQueryHookResult = ReturnType<typeof useUserListLazyQuery>;
export type UserListQueryResult = Apollo.QueryResult<UserListQuery, UserListQueryVariables>;