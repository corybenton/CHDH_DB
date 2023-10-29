import { useState } from 'react';
import Header from '../Header';
import AddMembers from '../../pages/addMembers';
import DeleteMembers from '../../pages/deleteMembers';
import ListMembers from '../../pages/listMembers';
import ModifyMembers from '../../pages/modifyMembers';

function Body() {
    const [currentPage, setCurrentPage] = useState('ListMembers');

    const renderPage = () => {
        if (currentPage === 'ListMembers') {
            return <ListMembers />;
        } else if (currentPage === 'AddMembers') {
            return <AddMembers />;
        } else if (currentPage === 'DeleteMembers') {
            return <DeleteMembers />;
        } else {
            return <ModifyMembers />;
        }
    };

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <div>
                <Header currentPage={currentPage} handlePageChange={handlePageChange} />
                <main>{renderPage()}</main>
            </div>
        </div>
    );
}

export default Body;