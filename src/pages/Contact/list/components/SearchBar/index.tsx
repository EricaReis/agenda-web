import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

interface ISearchBar {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ search, setSearch }: ISearchBar) {
    return (
        <Container>
            <InputGroup className="mb-2">
                <InputGroup.Text><MdSearch /></InputGroup.Text>
                <FormControl value={search} onChange={(e) => setSearch(e.target.value)} id="inlineFormInputGroup" placeholder="Pesquisa" />
            </InputGroup>
        </Container>
    );
}

export default SearchBar;