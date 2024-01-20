import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_MEMBER } from '../../../utilities/mutations';

const AddForm = () => {
    const [formState, setFormState] = useState({
        memberName: '',
        email: '',
        memberYears: 0,
        address: '',
        agesOfKids: 0,
        payer: true,
        notes: '',
    });

    const [tempState, setTempState] = useState('');

    const [addMember, { data, error }] = useMutation(ADD_MEMBER);

    const currentYear = new Date().getFullYear();

    const handleInputChange = (e) => {
        e.preventDefault();

        const inputType = e.target.name;
        let inputValue = e.target.value;
        if (inputType === 'payer') {
            setFormState({ ...formState, payer: e.target.checked });
        } else if (inputType === 'address' || inputType === 'notes') {
            setFormState({ ...formState, [inputType]: inputValue });
        } else {
            setTempState(inputValue)
        };
    }

    const handleBoxChange = (e) => {
        e.preventDefault();

        const toChange = e.target.name;
        const statePlace = formState[toChange];
        let dataArray = [];

        // set dataArray equal to the appropriate array in memberState
        for (let i = 0; i < statePlace.length; i++) {
            dataArray.push(statePlace[i]);
        }

        // add new value to end of above array
        if (toChange === 'memberYears' || toChange === 'agesOfKids') {
            dataArray.push(parseInt(tempState));
        } else {
            dataArray.push(tempState);
        }
        setFormState(formState => ({ ...formState, [toChange]: dataArray }));
        e.target.value = '';

    }

    const handleMistake = (e) => {
        e.preventDefault();

        const { value, name } = e.target;
        const statePlace = formState[name];
        let dataArray = [];
        for (let i = 0; i < statePlace.length; i++) {
            if (i !== parseInt(value)) {
                dataArray.push(statePlace[i]);
            };
        };

        setFormState(formState => ({ ...formState, [name]: dataArray }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = addMember({
                variables: { memberInfo: formState },
            });

            setFormState({
                memberName: '',
                email: '',
                memberYears: 0,
                address: '',
                agesOfKids: 0,
                payer: true,
                notes: '',
            });
        } catch (err) {
            console.error(err);
        }
    }

    const handleMany = async (e) => {
        e.preventDefault();


    }

    return (
        <div>
            <form onSubmit={handleMany}>
                <input type='file' id='newfile' name='newfile' />
                <button type='submit'>Submit File</button>
            </form>
            <br />
            <form onSubmit={handleSubmit}>
                <label htmlFor='memberName'>Name(s):</label>
                <br />
                {formState?.memberName ? (
                    formState.memberName.map((names, index) => ([
                        <b key={'mn' + index} name='memberName'>{names} &ensp;</b>,
                        <button
                            key={'mnb' + index}
                            value={index}
                            name='memberName'
                            onClick={handleMistake}
                        >X</button>,
                        <span key={'mns' + index}>&ensp;</span>
                    ]))) : (<div></div>)}
                <input
                    name='memberName'
                    onChange={handleInputChange}
                    onBlur={handleBoxChange}
                    type='text'
                    placeholder='First Last'
                />
                <br />

                <label htmlFor='email'>Email(s):</label>
                <br />
                {formState?.email ? (
                    formState.email.map((emails, index) => ([
                        <b key={'em' + index} name='email'>{emails} &ensp;</b>,
                        <button
                            key={'emb' + index}
                            value={index}
                            name='email'
                            onClick={handleMistake}
                        >X</button>,
                        <span key={'ems' + index}>&ensp;</span>
                    ]))) : (<div></div>)}
                <input
                    name='email'
                    onChange={handleInputChange}
                    onBlur={handleBoxChange}
                    type='text'
                    placeholder='randomperson@google.com'
                />
                <br />

                <label htmlFor='memberYears'>Member In:</label>
                <br />
                {formState?.memberYears ? (
                    formState.memberYears.map((years, index) => ([
                        <b key={'my' + index} name='memberYears'>{years} &ensp;</b>,
                        <button
                            key={'myb' + index}
                            value={index}
                            name='memberYears'
                            onClick={handleMistake}
                        >X</button>,
                        <span key={'mys' + index}>&ensp;</span>
                    ]))) : <div />}
                <input
                    name='memberYears'
                    onChange={handleInputChange}
                    onBlur={handleBoxChange}
                    type='number'
                    min={currentYear - 10}
                    max={currentYear}
                />
                <br />

                <label htmlFor='address'>Address:</label>
                <br />
                <input
                    value={formState.address}
                    name='address'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='123 Main St'
                />
                <br />

                <label htmlFor='agesOfKids'>Kid(s) Age:</label>
                <br />
                {formState?.agesOfKids ? (
                    formState.agesOfKids.map((ages, index) => ([
                        <b key={'ak' + index} name='agesOfKids'>{ages} &ensp;</b>,
                        <button
                            key={'akb' + index}
                            value={index}
                            name='agesOfKids'
                            onClick={handleMistake}
                        >X</button>,
                        <span key={'aks' + index}>&ensp;</span>
                    ]))) : <div />}
                <input
                    name='agesOfKids'
                    onChange={handleInputChange}
                    onBlur={handleBoxChange}
                    type='number'
                    placeholder='1'
                    min='1'
                    max='18'
                />
                <br />

                <label htmlFor='payer'>Payer: &emsp;</label>
                <input
                    value={formState.payer}
                    name='payer'
                    onChange={handleInputChange}
                    type='checkbox'
                    defaultChecked='true'
                />
                <br />

                <label htmlFor='notes'>Notes:</label>
                <br />
                <input
                    value={formState.notes}
                    name='notes'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='Additional info'
                />
                <br /><br />

                <button onClick={handleSubmit} type='submit'>Submit</button>
            </form>
            <div>
                {data ? (
                    <div>
                        <h4>Created member</h4>
                        <span>Member name(s): &ensp;</span>
                        {data.createMember.memberName.map((names, index) => (
                            <span key={index}>{names} &ensp;</span>
                        ))}
                        <br />
                        <span>Email(s): &ensp;</span>
                        {data.createMember.email.map((email, index) => (
                            <span key={index}>{email} &ensp;</span>
                        ))}
                        <br />
                        <span>Member in: &emsp;</span>
                        {data.createMember.memberYears.map((years, index) => (
                            <span key={index}>{years} &emsp;</span>
                        ))}
                        <br />
                        <span>Address: &ensp; {data.createMember.address}</span>
                        <br />
                        <span>Kids' ages: &emsp;</span>
                        {data.createMember.agesOfKids.map((ages, index) => (
                            <span key={index}>{ages} &emsp;</span>
                        ))}
                        <br />
                        <span>Payer?: </span>
                        <input
                            type='checkbox'
                            checked={data.createMember.payer}
                            readOnly
                        />
                        <br />
                        <span>Notes: &ensp; {data.createMember.notes}</span>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
};

export default AddForm;