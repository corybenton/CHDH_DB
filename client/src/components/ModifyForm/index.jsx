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

    const [tempState, setTempState] = useState('');

    const [memberSearch, { data, error }] = useLazyQuery(QUERY_SINGLE_MEMBER,
        { fetchPolicy: 'network-only' });
    const [dataChange, { data: data2, error: error2 }] = useMutation(MUTATE_SINGLE_MEMBER);

    let currentYear = new Date();
    currentYear = currentYear.getFullYear();

    const handleSearchChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        setSearchState({ ...searchState, [name]: value });
    }

    const handleChangeChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        if (name === 'address' || name === 'notes') {
            setMemberState(memberState => ({ ...memberState, [name]: value }));
        } else {
            setTempState(value);
        }
    }

    const handleBoxCheck = (e) => {
        e.preventDefault();

        const { checked } = e.target;

        setMemberState({ ...memberState, payer: checked });
    }

    const handleChangeSet = (e) => {
        e.preventDefault();

        const toChange = e.target.name;
        if (toChange !== 'address' && toChange !== 'notes') {
            const statePlace = memberState[toChange];
            let dataArray = [];
            for (let i = 0; i < statePlace.length; i++) {
                dataArray.push(statePlace[i]);
            }
            if (toChange === 'memberYears' || toChange === 'agesOfKids') {
                dataArray.push(parseInt(tempState));
            } else {
                dataArray.push(tempState);
            }
            setMemberState(memberState => ({ ...memberState, [toChange]: dataArray }));
            e.target.value = '';
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let promise;
            if (searchState.search && searchState.criteria) {
                promise = new Promise((resolve) => {
                    resolve(memberSearch({
                        variables: { searchInfo: [searchState.search, searchState.criteria] }
                    }))
                });
            }
            let result = await promise;

            setMemberState(result.data.searchMember);
        } catch (err) {
            console.error(err);
        }
    }

    const handleSecondSubmit = async (e) => {
        e.preventDefault();
        try {
            const promise = new Promise((resolve) => {
                resolve(dataChange({
                    variables:
                        { searchInfo: [searchState.search, searchState.criteria], memberInfo: memberState }
                }))
            });
            let result = await promise;

            setMemberState(result.data.modifyMember)
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
                {memberState?.memberName ? (
                    memberState.memberName.map((names, index) => (
                        <input
                            key={index}
                            value={names || ''}
                            name='memberName'
                            onChange={handleChangeChange}
                            onBlur={handleChangeSet}
                            type='text'
                        />
                    ))
                ) : (<div></div>)}
                <input
                    name='memberName'
                    onChange={handleChangeChange}
                    onBlur={handleChangeSet}
                    type='text'
                />
                {memberState?.email ? (
                    memberState.email.map((emails, index) => (
                        <input
                            key={index}
                            value={emails || ''}
                            name='email'
                            onChange={handleChangeChange}
                            onBlur={handleChangeSet}
                            type='email'
                        />
                    ))
                ) : (<div></div>)}
                <input
                    name='email'
                    onChange={handleChangeChange}
                    onBlur={handleChangeSet}
                    type='email'
                />
                {memberState?.memberYears ? (
                    memberState.memberYears.map((years, index) => (
                        <input
                            key={index}
                            value={years || ''}
                            name='memberYears'
                            onChange={handleChangeChange}
                            onBlur={handleChangeSet}
                            type='number'
                            min={currentYear - 10}
                            max={currentYear}
                        />
                    ))
                ) : (<div></div>)}
                <input
                    name='memberYears'
                    onChange={handleChangeChange}
                    onBlur={handleChangeSet}
                    type='number'
                    min={currentYear - 10}
                    max={currentYear}
                />
                <input
                    value={memberState?.address || ''}
                    name='address'
                    onChange={handleChangeChange}
                    onBlur={handleChangeSet}
                    type='text'
                />
                {memberState?.agesOfKids ? (
                    memberState.agesOfKids.map((ages, index) => (
                        <input
                            key={index}
                            value={ages || ''}
                            name='agesOfKids'
                            onChange={handleChangeChange}
                            onBlur={handleChangeSet}
                            type='number'
                            min='1'
                            max='18'
                        />
                    ))
                ) : (<div></div>)}
                <input
                    name="agesOfKids"
                    onChange={handleChangeChange}
                    onBlur={handleChangeSet}
                    type='number'
                    min='1'
                    max='18'
                />
                <input
                    checked={memberState.payer || false}
                    name='payer'
                    onChange={handleBoxCheck}
                    type='checkbox'
                />
                <input
                    value={memberState?.notes || ''}
                    name='notes'
                    onChange={handleChangeChange}
                    onBlur={handleChangeSet}
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