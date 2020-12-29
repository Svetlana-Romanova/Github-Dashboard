import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import GetRandomId from '../getRandomId';

const Ul = styled.ul `
    display: flex;
    justify-content: center;
    padding: 0;
    list-style-type: none;
`;

const Li = styled.li `
    padding: 0.7rem;
`;

const StyledLink = styled(Link) `
    text-decoration: none;
    color: black;
`;

const Active = styled.a `
    color: red;
`;

const Pagination = ({pageNumber, match}) => {

    let { number } = match.params;

    const [ numberStart, setNumberStart ] = useState(0);
    const [ numbersArr, setNumberArr ] = useState([]);

    if(numberStart < 10) {
        let nextNumber = numberStart + 1;
        setNumberStart(nextNumber);
        setNumberArr([...numbersArr, nextNumber]);
    }

    const renderPaginator = (selectedNumber = 1) => {
        const listNumbers = numbersArr.map((num) => {
            const key = GetRandomId();

            if(num === +selectedNumber) {
                return (
                    <Li key={key}>
                        <Active to={`/page/${num}`} className='active'>{num}</Active>
                    </Li>
                )
            } else {
                return (
                    <Li key={key}>
                        <StyledLink to={`/page/${num}`}>{num}</StyledLink>
                    </Li>
                )
            }
        })
        return listNumbers;
    }


    return (
        <Ul>
            {renderPaginator(number)}
        </Ul>
    )
}

export default withRouter(Pagination);