import DeleteForm from '../components/DeleteForm';
import List from '../components/List';

export default function DeleteMembers() {
    return (
        <div>
            <h2>Delete Members</h2>
            <p>Remove members from database in bulk or singly.
            </p>
            <DeleteForm />
            <p>Member\(s\) deleted.</p>
            <List />
        </div>
    );
};