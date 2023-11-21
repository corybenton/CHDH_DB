import ModifyForm from '../components/ModifyForm';
import List from '../components/List';

export default function ModifyMembers() {
    return (
        <div>
            <h2>Edit Member Data</h2>
            <p>Modify any member data, searching by member name or email.
            </p>
            <ModifyForm />
        </div>
    );
};