import { gql } from '@apollo/client';

export const MUTATE_SINGLE_MEMBER = gql`
    mutation modOne($searchInfo: [String]!, $memberInfo: MemberInput!) {
        modifyMember(searchInfo: $searchInfo, memberInfo: $memberInfo) {
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