import { useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";

import { QUERY_SINGLE_MEMBER } from '../../../utilities/queries';
import { MUTATE_SINGLE_MEMBER } from '../../../utilities/mutations'

const ModifyForm = () => {
    const [searchState, setSearchState] = useState({
        search: 'default',
        criteria: '',
    });

    const [memberState, setMemberState] = useState({
        memberName: '',
        email: '',
        memberYears: 0,
        address: '',
        agesOfKids: 0,
        payer: false,
        notes: '',
    });

    const [memberSearch, { data, error }] = useLazyQuery(QUERY_SINGLE_MEMBER);
    const [dataChange, { data: data2, error: error2 }] = useMutation(MUTATE_SINGLE_MEMBER);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;

        setSearchState({ ...searchState, [name]: value });
    }

    const handleChangeChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setMemberState({ ...memberState, [name]: value });

        console.log(memberState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let promise;
            if (searchState.search && searchState.criteria) {
                promise = new Promise((resolve) => {resolve(memberSearch({ 
                    variables: { searchInfo: [searchState.search, searchState.criteria] }}))});
            }
            let result = await promise;

            setMemberState(result.data.searchMember);

        } catch (err) {
            console.error(err);
        }
    }

    const handleSecondSubmit = async (e) => {
        e.preventDefault();
        try{
            const promise = new Promise((resolve) => {resolve(dataChange({ variables: 
                { searchInfo: [searchState.search, searchState.criteria], memberInfo: memberState}}))});
            let result = await promise;
            console.log(result);
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
            <form onSubmit={handleSecondSubmit}>
                <input
                    value={memberState?.memberName || ''}
                    name='memberName'
                    onChange={handleChangeChange}
                    type='text'
                />
                <input
                    value={memberState?.email || ''}
                    name='email'
                    onChange={handleChangeChange}
                    type='text'
                />
                <input
                    value={memberState?.memberYears || ''}
                    name='memberYears'
                    onChange={handleChangeChange}
                    type='text'
                />
                <input
                    value={memberState?.address || ''}
                    name='address'
                    onChange={handleChangeChange}
                    type='text'
                />

                <input
                    value={memberState?.agesOfKids || ''}
                    name='agesOfKids'
                    onChange={handleChangeChange}
                    type='text'
                />
                <input
                    value={memberState?.payer || ''}
                    name='payer'
                    onChange={handleChangeChange}
                    type='text'
                />
                <input
                    value={memberState?.notes || ''}
                    name='notes'
                    onChange={handleChangeChange}
                    type='text'
                />
                <button type='submit'>Submit</button>
            </form>
            <div>
            {data2 ? (
                <div>
                <p>Updated member</p>
                <p>{data2?.modifyMember?.memberName}</p>
                </div>
            ) : (
                <div></div>
            )}
            </div>
        </div>
    )
};

export default ModifyForm;