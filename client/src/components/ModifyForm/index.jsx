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

    const [memberSearch, { loading }] = useLazyQuery(QUERY_SINGLE_MEMBER,
        { fetchPolicy: 'network-only' });
    const [dataChange, { data, error }] = useMutation(MUTATE_SINGLE_MEMBER);

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
        const statePlace = memberState[toChange];
        let dataArray = [];
        
        // set dataArray = appropriate array in memberState
        for (let i = 0; i < statePlace.length; i++) {
            dataArray.push(statePlace[i]);
        }

        // add new value to end of above array
        if (toChange === 'memberYears' || toChange === 'agesOfKids') {
            dataArray.push(parseInt(tempState));
        } else {
            dataArray.push(tempState);
        }
        setMemberState(memberState => ({ ...memberState, [toChange]: dataArray }));
        e.target.value = '';

    }

    const handleDelete = (e) => {
        e.preventDefault();

        const { value, name } = e.target;
        const statePlace = memberState[name];
        let dataArray = [];
        for (let i = 0; i < statePlace.length; i++) {
            if (i !== parseInt(value)) {
                dataArray.push(statePlace[i]);
            };
        };

        setMemberState(memberState => ({ ...memberState, [name]: dataArray }))
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

            setMemberState({
                memberName: '',
                email: '',
                memberYears: 0,
                address: '',
                agesOfKids: 0,
                payer: false,
                notes: ''
            });

            setSearchState({
                search: 'default',
                criteria: '',
            });

            setTempState('');

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='search'>Search criterion: </label>
                <select
                    value={searchState.search}
                    name='search'
                    onChange={handleSearchChange}>
                    <option value='default'></option>
                    <option value='memberName'>Name</option>
                    <option value='email'>Email</option>
                </select>
                <label htmlFor='criteria'>&emsp; Search value: </label>
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
                {memberState?.memberName ? ([
                    <label key='lmn' htmlFor="memberName">Name(s): </label>,
                    memberState.memberName.map((names, index) => ([
                        <input
                            key={'mn' + index}
                            value={names || ''}
                            name='memberName'
                            onChange={handleChangeChange}
                            onBlur={handleChangeSet}
                            type='text'
                        />,
                        <button
                            value={index}
                            name='memberName'
                            key={'mnb'}
                            onClick={handleDelete}>
                            X
                            </button>
                    ])),
                    <input
                        key='mn'
                        name='memberName'
                        placeholder="First Last"
                        onChange={handleChangeChange}
                        onBlur={handleChangeSet}
                        type='text'
                    />,
                    <br key='br1'></br>,

                    <label key='lem' htmlFor="email">Email(s): </label>,
                    memberState.email.map((emails, index) => ([
                        <input
                            key={'em' + index}
                            value={emails || ''}
                            name='email'
                            onChange={handleChangeChange}
                            onBlur={handleChangeSet}
                            type='email'
                        />,
                        <button
                            value={index}
                            name='email'
                            key='emb'
                            onClick={handleDelete}>
                            X</button>
                    ])),
                    <input
                        key='em'
                        name='email'
                        placeholder="email@somewhere.com"
                        onChange={handleChangeChange}
                        onBlur={handleChangeSet}
                        type='email'
                    />,
                    <br key='br2'></br>,

                    <label key='lmy' htmlFor="memberYears">Member in: </label>,
                    memberState.memberYears.map((years, index) => ([
                        <input
                            key={'my' + index}
                            value={years || ''}
                            name='memberYears'
                            onChange={handleChangeChange}
                            onBlur={handleChangeSet}
                            type='number'
                            min={currentYear - 10}
                            max={currentYear}
                        />,
                        <button
                            value={index}
                            name='memberYears'
                            key='myb'
                            onClick={handleDelete}>
                            X</button>
                    ])),
                    <input
                        key='my'
                        name='memberYears'
                        placeholder={currentYear}
                        onChange={handleChangeChange}
                        onBlur={handleChangeSet}
                        type='number'
                        min={currentYear - 10}
                        max={currentYear}
                    />,
                    <br key='br3'></br>,

                    <label key='lad' htmlFor="address">Address: </label>,
                    <input
                        key='ad'
                        value={memberState?.address || ''}
                        name='address'
                        onChange={handleChangeChange}
                        type='text'
                    />,
                    <br key='br4'></br>,

                    <label key='lak' htmlFor="agesOfKids">Kids' ages: </label>,
                    memberState.agesOfKids.map((ages, index) => ([
                        <input
                            key={'ak' + index}
                            value={ages || ''}
                            name='agesOfKids'
                            onChange={handleChangeChange}
                            onBlur={handleChangeSet}
                            type='number'
                            min='1'
                            max='18'
                        />,
                        <button
                            value={index}
                            name='agesOfKids'
                            key='akb'
                            onClick={handleDelete}>
                            X</button>
                    ])),
                    <input
                        key='ak'
                        name="agesOfKids"
                        placeholder="1"
                        onChange={handleChangeChange}
                        onBlur={handleChangeSet}
                        type='number'
                        min={1}
                        max={18}
                    />,
                    <br key='br5'></br>,

                    <label key='lp' htmlFor="payer">Payer?: </label>,
                    <input
                        key='p'
                        checked={memberState.payer || false}
                        name='payer'
                        onChange={handleBoxCheck}
                        type='checkbox'
                    />,

                    <label key='ln' htmlFor="notes">Notes: </label>,
                    <input
                        key='n'
                        value={memberState?.notes || ''}
                        name='notes'
                        onChange={handleChangeChange}
                        type='text'
                    />,

                    <button key='b' type='submit'>Submit</button>

                ]) : (<div></div>)}
            </form>
            <div>
                {data ? (
                    <div>
                        <h4>Updated member</h4>
                        <span>Member name(s): &ensp;</span>
                        {data.modifyMember.memberName.map((names, index) => (
                            <span key={index}>{names} &ensp;</span>
                        ))}
                        <br></br>
                        <span>Email(s): &ensp;</span>
                        {data.modifyMember.email.map((email, index) => (
                            <span key={index}>{email} &ensp;</span>
                        ))}
                        <br></br>
                        <span>Member in: &emsp;</span>
                        {data.modifyMember.memberYears.map((years, index) => (
                            <span key={index}>{years} &emsp;</span>
                        ))}
                        <br></br>
                        <span>Address: &ensp; {data.modifyMember.address}</span>
                        <br></br>
                        <span>Kids' ages: &emsp;</span>
                        {data.modifyMember.agesOfKids.map((ages, index) => (
                            <span key={index}>{ages} &emsp;</span>
                        ))}
                        <br></br>
                        <span>Payer?: </span>
                        <input
                            type='checkbox'
                            checked={data.modifyMember.payer}
                            readOnly
                        />
                        <br></br>
                        <span>Notes: &ensp; {data.modifyMember.notes}</span>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
};

export default ModifyForm;