import { useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import SecondStageE from './secondstagee';
import { QUERY_SINGLE_MEMBER_BY_EMAIL } from '../../../utilities/queries';

const ModifyForm = () => {
    const [searchState, setSearchState] = useState({
        search: 'default',
        criteria: '',
    });

    const [memberState, setMemberState] = useState({
        memberName: '',
        email: '',
        memberYears: '',
        address: '',
        agesOfKids: '',
        payer: '',
        notes: '',
    });

    const [searchByEmail, { data: dataE, error }] = useLazyQuery(QUERY_SINGLE_MEMBER_BY_EMAIL);


    const handleSearchChange = (e) => {
        const { name, value } = e.target;

        setSearchState({ ...searchState, [name]: value });
    }

    const handleChangeChange = (e) => {
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (searchState.search === 'email' && searchState.criteria !== '') {
                searchByEmail({ variables: { email: searchState.criteria }});
                // console.log(a);
                // setMemberState({ ...memberState, ['memberName']: searchData.memberByEmail.memberName})
            }
            console.log(memberState.memberName);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='search'>Search criterion:</label>
                <select
                    value={searchState.search}
                    name='search'
                    onChange={handleSearchChange}>
                    <option value='default'></option>
                    <option value='memberName'>Name</option>
                    <option value='email'>Email</option>
                </select>

                <label htmlFor='criteria'>Search value:</label>
                <input
                    value={searchState.criteria}
                    name='criteria'
                    onChange={handleSearchChange}
                    type='text'
                    placeholder='Member name or email'
                />

                <button type='submit'>Submit</button>
            </form>
            <div>
            <input 
                value={dataE?.memberByEmail?.memberName}
                name='memberName'
                onChange={handleChangeChange}
                type='text'
                />
            </div>
        </div>
    )
};

export default ModifyForm;