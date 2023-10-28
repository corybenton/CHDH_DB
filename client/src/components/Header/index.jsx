function Header({ currentPage, handlePageChange }) {
    return (
        <header>
            <h1>Chapel Hill-Durham Homeschoolers</h1>
            <nav>
                <ul>
                    <li>
                        <a
                            href="#addMembers"
                            onClick={() => handlePageChange('AddMembers')}
                        >
                            Add Members
                        </a>
                    </li>
                    <li>
                        <a
                            href="#modifyMembers"
                            onClick={() => handlePageChange('ModifyMembers')}
                        >
                            Edit Member Data
                        </a>
                    </li>
                    <li>
                        <a
                            href="#deleteMembers"
                            onClick={() => handlePageChange('DeleteMembers')}
                        >
                            Remove Members
                        </a>
                    </li>
                    <li>
                        <a
                            href="#listMembers"
                            onClick={() => handlePageChange('ListMembers')}
                        >
                            Get Member Lists
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;