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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateFormInput = {
  /** Name of the form */
  name: Scalars['String'];
};

export type Form = {
  __typename?: 'Form';
  /** Date the form was created */
  createdAt: Scalars['DateTime'];
  /** ID of the form */
  id: Scalars['String'];
  /** Name of the form */
  name: Scalars['String'];
  /** Date the form was last updated */
  updatedAt: Scalars['DateTime'];
  /** Owner of the form */
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm: Form;
  removeForm: Form;
  updateForm: Form;
};


export type MutationCreateFormArgs = {
  createFormInput: CreateFormInput;
};


export type MutationRemoveFormArgs = {
  id: Scalars['String'];
};


export type MutationUpdateFormArgs = {
  updateFormInput: UpdateFormInput;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getCurrentUser: User;
  getCurrentUserForms: Array<Form>;
  getForm: Form;
  getUserById: User;
  healthCheck: Scalars['String'];
};


export type QueryGetFormArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};

export type UpdateFormInput = {
  /** ID of the form */
  id: Scalars['String'];
  /** Name of the form */
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  password: Scalars['String'];
  refresh_token: Scalars['String'];
  username: Scalars['String'];
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: string, username: string, email: string } };

export type CreateFormMutationVariables = Exact<{
  createFormInput: CreateFormInput;
}>;


export type CreateFormMutation = { __typename?: 'Mutation', createForm: { __typename?: 'Form', id: string, name: string, userId: string, createdAt: any, updatedAt: any } };

export type GetFormQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetFormQuery = { __typename?: 'Query', getForm: { __typename?: 'Form', id: string, name: string, userId: string, createdAt: any, updatedAt: any } };

export type GetCurrentUserFormsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserFormsQuery = { __typename?: 'Query', getCurrentUserForms: Array<{ __typename?: 'Form', id: string, name: string, userId: string, createdAt: any, updatedAt: any }> };


export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  getCurrentUser {
    id
    username
    email
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const CreateFormDocument = gql`
    mutation createForm($createFormInput: CreateFormInput!) {
  createForm(createFormInput: $createFormInput) {
    id
    name
    userId
    createdAt
    updatedAt
  }
}
    `;
export type CreateFormMutationFn = Apollo.MutationFunction<CreateFormMutation, CreateFormMutationVariables>;

/**
 * __useCreateFormMutation__
 *
 * To run a mutation, you first call `useCreateFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFormMutation, { data, loading, error }] = useCreateFormMutation({
 *   variables: {
 *      createFormInput: // value for 'createFormInput'
 *   },
 * });
 */
export function useCreateFormMutation(baseOptions?: Apollo.MutationHookOptions<CreateFormMutation, CreateFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFormMutation, CreateFormMutationVariables>(CreateFormDocument, options);
      }
export type CreateFormMutationHookResult = ReturnType<typeof useCreateFormMutation>;
export type CreateFormMutationResult = Apollo.MutationResult<CreateFormMutation>;
export type CreateFormMutationOptions = Apollo.BaseMutationOptions<CreateFormMutation, CreateFormMutationVariables>;
export const GetFormDocument = gql`
    query getForm($id: String!) {
  getForm(id: $id) {
    id
    name
    userId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetFormQuery__
 *
 * To run a query within a React component, call `useGetFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFormQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFormQuery(baseOptions: Apollo.QueryHookOptions<GetFormQuery, GetFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFormQuery, GetFormQueryVariables>(GetFormDocument, options);
      }
export function useGetFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormQuery, GetFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFormQuery, GetFormQueryVariables>(GetFormDocument, options);
        }
export type GetFormQueryHookResult = ReturnType<typeof useGetFormQuery>;
export type GetFormLazyQueryHookResult = ReturnType<typeof useGetFormLazyQuery>;
export type GetFormQueryResult = Apollo.QueryResult<GetFormQuery, GetFormQueryVariables>;
export const GetCurrentUserFormsDocument = gql`
    query getCurrentUserForms {
  getCurrentUserForms {
    id
    name
    userId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCurrentUserFormsQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserFormsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserFormsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserFormsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserFormsQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserFormsQuery, GetCurrentUserFormsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserFormsQuery, GetCurrentUserFormsQueryVariables>(GetCurrentUserFormsDocument, options);
      }
export function useGetCurrentUserFormsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserFormsQuery, GetCurrentUserFormsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserFormsQuery, GetCurrentUserFormsQueryVariables>(GetCurrentUserFormsDocument, options);
        }
export type GetCurrentUserFormsQueryHookResult = ReturnType<typeof useGetCurrentUserFormsQuery>;
export type GetCurrentUserFormsLazyQueryHookResult = ReturnType<typeof useGetCurrentUserFormsLazyQuery>;
export type GetCurrentUserFormsQueryResult = Apollo.QueryResult<GetCurrentUserFormsQuery, GetCurrentUserFormsQueryVariables>;