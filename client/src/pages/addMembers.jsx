import AddForm from '../components/AddForm';
import List from '../components/List';

export default function AddMembers() {
    return (
        <div>
            <h2>Add Members</h2>
            <p>Add new members to database.</p>
            <AddForm />
            <p>New member created.</p>
            <List />
        </div>
    );
};