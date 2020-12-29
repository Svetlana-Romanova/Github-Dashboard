import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `;

const Label = styled.label `
    font-size: 1.5rem;
    color: grey;
`;

const Input = styled.input`
    width: 25rem;
    background-color: lightgray;
    font-size: 18px;
    padding: 1rem;
    margin: 1rem;
    border: none;
    border-radius: 3px;
    `;

const SearchHeader = ({ savedValue, setValueSearch }) => {

    const pushValue = (el) => {
        setValueSearch(el)
    } 

    return (
        <Container>
            <Label>Search:
            <Input 
                type="text" 
                placeholder="Name" 
                value={savedValue}
                onChange={(e) => pushValue(e.target.value)}
                />
            </Label>
        </Container>
    )
}

export default SearchHeader;