import { useState } from 'react';
import { useMutation } from '@apollo/client';

import List from '../List';
//import { ADD_MEMBER } from '../../utilities/mutations';

const AddForm = () => {
    const [formState, setFormState] = useState({
        memberName: '',
        email: '',
        memberYears: '',
        address: '',
        agesOfKids: '',
        payer: '',
        notes: '',
    });

    //const [addMember, { error }] = useMutation(ADD_MEMBER);

    const handleInputChange = (e) => {
        const inputType = e.target.name;
        let inputValue;
        if (inputType === 'payer') {
            inputValue = e.target.checked;
        } else {
            inputValue = e.target.value;
        };

        setFormState({ ...formState, [inputType]: inputValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = addMember({
                variables: { ...formState },
            });

            setFormState({
                memberName: '',
                email: '',
                memberYears: '',
                address: '',
                agesOfKids: '',
                payer: '',
                notess: '',
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='memberName'>Name(s):</label>
                <input
                    value={formState.memberName}
                    name='memberName'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='First Last'
                />
                <label htmlFor='email'>Email(s):</label>
                <input
                    value={formState.email}
                    name='email'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='name@email.com'
                />
                <label htmlFor='memberYears'>Member In:</label>
                <input
                    value={formState.memberYears}
                    name='memberYears'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='2023'
                />
                <label htmlFor='address'>Address:</label>
                <input
                    value={formState.address}
                    name='address'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='123 Main St'
                />
                <label htmlFor='agesOfKids'>Kid(s) Age:</label>
                <input
                    value={formState.agesOfKids}
                    name='agesOfKids'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='Age'
                />
                <label htmlFor='payer'>Payer:</label>
                <input
                    value={formState.payer}
                    name='payer'
                    onChange={handleInputChange}
                    type='checkbox'
                    defaultChecked='true'
                />
                <label htmlFor='notes'>Notes:</label>
                <input
                    value={formState.notes}
                    name='notes'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='Additional info'
                />
                <button onClick={handleSubmit} type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default AddForm;