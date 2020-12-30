import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import GetRandomId from '../getRandomId';

import styled from 'styled-components';

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  list-style-type: none;
`;

const Li = styled.li`
  padding: 0.7rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Active = styled.a`
  color: red;
`;

const Pagination = ({ match, pageNumber, totalCount }) => {
  let { number } = match.params;
  let [countPages, perPage] = totalCount;

  const [numbersArr, setNumberArr] = useState([]);
  const pages = countPages / perPage;
  const newCountPages = pages !== 0 ? (pages > 10 ? 10 : Math.ceil(pages)) : 1;

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= newCountPages; i++) {
      arr.push(i);
      setNumberArr(arr);
    }
  }, [newCountPages]);

  const renderPaginator = useCallback(
    (selectedNumber) => {
      if (selectedNumber > newCountPages || typeof selectedNumber === 'undefined') {
        selectedNumber = 1;
      }

      const listNumbers = numbersArr.map((num) => {
        const key = GetRandomId();
        if (num === +selectedNumber) {
          return (
            <Li key={key}>
              <Active to={`/page/${num}`} className="active">
                {num}
              </Active>
            </Li>
          );
        } else {
          return (
            <Li key={key}>
              <StyledLink to={`/page/${num}`}>{num}</StyledLink>
            </Li>
          );
        }
      });
      return listNumbers;
    },
    [newCountPages, numbersArr]
  );

  return <Ul>{renderPaginator(number)}</Ul>;
};

export default withRouter(Pagination);
