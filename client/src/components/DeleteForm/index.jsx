import { useState } from "react";
import { useMutation } from "@apollo/client";

import List from '../List';
// import { REMOVE_MEMBER } form '../../utilities/mutations';

const DeleteForm = () => {
    const [dropdownValue, setDropdownValue] = useState('');
    const [boxValue, setBoxValue] = useState('');
    
    // const [delMember, { error }] = useMutation(REMOVE_MEMBER);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        setBoxValue(inputValue);
    };

    const handleDropdownChange = (e) => {
        const inputValue = e.target.value;

        setDropdownValue(inputValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = delMember({
                variables: { dropdownValue, boxValue },
            })

            setDropdownValue('');
            setBoxValue('');
        } catch (err) {
            console.error(err);
        }
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='search'>Enter info type and value to delete member:</label>
                <select 
                    name='search'
                    onChange={handleDropdownChange}>
                    <option value='default'></option>
                    <option value='memberName'>Name</option>
                    <option value='email'>Email</option>
                </select>
                
                <input
                    value={boxValue}
                    name='BoxValue'
                    onChange={handleInputChange}
                    type='text'
                    placeholder='Member name or email'
                />
                <button onClick={handleSubmit} type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default DeleteForm;