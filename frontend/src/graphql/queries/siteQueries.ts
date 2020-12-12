import { gql } from "graphql.macro";

export const SITE_LIST_QUERY = gql`
  query GetSites($input: SearchSiteInput!) {
    getSites(input: $input) {
      id
      updatedAt
      name
      status
    }
  }
`;

export const SITE_DETAIL_QUERY = gql`
  query GetSite($input: GetIdInput!) {
    getSite(input: $input) {
      id
      createdAt
      updatedAt
      name
      status
      postalCode
      phoneNumber
      address
      note
    }
  }
`;
