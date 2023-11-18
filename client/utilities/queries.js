import { gql } from "@apollo/client";

export const QUERY_SINGLE_MEMBER = gql`
    query getSingleMember($searchInfo: [String]!) {
        searchMember(searchInfo: $searchInfo) {
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