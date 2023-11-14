import { gql } from "@apollo/client";

export const QUERY_SINGLE_MEMBER_BY_EMAIL = gql`
    query getMemberByEmail($email: String!) {
        memberByEmail(email: $email) {
            memberName
            email
            memberYears
            address
            agesOfKids
            payer
            notes
        }
    }
`;

export const QUERY_SINGLE_MEMBER_BY_NAME = gql`
    query getMemberByName($name: String!) {
        memberByName(name: $name) {
            memberName
            email
            memberYears
            address
            agesOfKids
            payer
            notes
        }
    }
`