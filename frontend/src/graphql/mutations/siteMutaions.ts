import { gql } from "graphql.macro";

export const SITE_UPDATE_MUTATION = gql`
  mutation UpdateSite($input: UpdateSiteInput!) {
    updateSite(input: $input) {
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

export const SITE_CREATE_MUTATION = gql`
  mutation CreateSite($input: CreateSiteInput!) {
    createSite(input: $input) {
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

export const SITE_BULK_DELETE_MUTATION = gql`
  mutation BulkDeleteSites($input: BulkIdInput!) {
    bulkDeleteSite(input: $input) {
      id
      name
      status
      postalCode
      phoneNumber
      address
      note
    }
  }
`;
