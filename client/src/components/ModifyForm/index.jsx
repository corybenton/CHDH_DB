import { useState } from "react";
import { useMutation } from "@apollo/client";

import List from "../List";
// import { MODIFY_MEMBER } from '../../utilities/mutations';

const ModifyForm = () => {
    const [searchState, setSearchState] = useState({
        search: '',
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

    // const [findMember, { error }] = useMutation(FIND_MEMBER);
    // const [modifyMember, { errror }] = useMutation(MODIFY_MEMBER);

    const handleSearchChange = (e) => {
        const inputType = e.target.name;
        const inputValue = e.target.value;

        setSearchState({ searchState, [inputType]: inputValue });
    }

    const setupChange = (data) => {
        const firstForm = document.querySelector('form');

        const secondForm = document.createElement('form');
        secondForm.onSubmit = { handleSecondSubmit };
        secondForm.id = 'second';

        const labelNames = ['Name', 'Email', 'Member Years', 'Address', "Kids's Ages", 'Payer', 'Notes']

        for (let i = 0; i < 7; i++) {
            const label = document.createElement('label');
            label.htmlFor = data[i].name;
            label.innerHTML = labelNames[i];

            const dataValue = document.createElement('input');
            dataValue.value = data[i].value;
            dataValue.name = data[i].name;
            dataValue.type = 'text';

            together = label.append(dataValue);
            secondForm.appendChild(together);
        }

        const button = document.createElement('button');
        button.type = 'submit';
        button.innerHTML = 'Submit';
        secondForm.appendChild(button);

        firstForm.append(secondForm);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const toBeChanged = findMember({
                variables: { searchState },
            });

            setupChange(toBeChanged);

            setSearchState({
                search: '',
                criteria: '',
            });
        } catch (err) {
            console.error(err);
        }
    }

    const handleSecondSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();



    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='search'>Search criterion:</label>
                <select
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
        </div>
    )
};

export default ModifyForm;