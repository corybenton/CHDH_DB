import ListForm from '../components/ListForm';
import List from '../components/List';

export default function ListMembers() {
    return (
        <div>
            <h2>Pull Lists of Members</h2>
            <p>Retrieve member data from database, determined by entered criteria,
                with .csv download.
            </p>
            <ListForm />
            <List />
        </div>
    );
};