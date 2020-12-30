import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { GetOneRepo, GetContributors } from '../services';
import GetRandomId from '../getRandomId';
import ErrorIndicator from '../errorIndicator';
import Spinner from '../spinner';

import styled from 'styled-components';

const Table = styled.table`
  margin: 3rem auto;
  border: 1px solid grey;
`;

const Tr = styled.tr`
  width: 100%;
  display: table;
  margin: 1.5rem 0;
  text-align: center;
`;

const Td = styled.td`
  width: ${(props) => (props.block ? '100%' : '200px')};
  text-align: center;
  vertical-align: middle;
  font-weight: ${(props) => (props.name ? 'bold' : 'regular')};
  font-size: ${(props) => (props.name ? '20px' : '16px')};
`;

const Img = styled.img`
  width: 130px;
  border-radius: 100px;
`;

const Card = ({ itemName, value }) => {
  const [selectedRepo, setSelectedRepo] = useState('');
  const [contributors, setContributors] = useState('');
  const [loading, toggleLoading] = useState(true);
  const [error, toggleError] = useState(false);

  const onError = () => {
    toggleLoading(false);
    toggleError(true);
  };

  useEffect(() => {
    GetOneRepo(itemName)
      .then((results) => {
        setSelectedRepo(results);
        toggleLoading(false);
        toggleError(false);
      })
      .catch(() => onError());

    GetContributors(itemName)
      .then((results) => {
        results.slice(0, 9);
        setContributors(results);
        toggleLoading(false);
        toggleError(false);
      })
      .catch(() => onError());
  }, [itemName]);

  const renderContributors = useCallback(
    (users) => {
      if (contributors) {
        const contributorsArr = users.map((user) => {
          const key = GetRandomId();
          return (
            <Tr key={key}>
              <Td>
                <Img src={user.avatar_url} alt="avatar" />
              </Td>
              <Td>{user.login}</Td>
            </Tr>
          );
        });
        return contributorsArr;
      }
    },
    [contributors]
  );

  const renderList = useCallback(
    (repo) => {
      if (selectedRepo) {
        return (
          <React.Fragment>
            <Tr>
              <Td name="name">{repo.name}</Td>
              <Td>Stargazers:<br />{repo.stargazers_count}
              </Td>
              <Td>Last commit:<br />{repo.pushed_at}
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Img src={repo.owner.avatar_url} alt="avatar" />
              </Td>
              <Td>Nickname:<br />{repo.owner.login}
              </Td>
              <Td>
                <a href={repo.owner.html_url}>{repo.owner.html_url}</a>
              </Td>
            </Tr>
            <Tr>
              <Td block>Languages:<br />{repo.language}
              </Td>
            </Tr>
            <Tr>
              <Td block>Description:<br />{repo.description}
              </Td>
            </Tr>
            <Tr>
              <Td block>Contributors:</Td>
            </Tr>
            {renderContributors(contributors)}
          </React.Fragment>
        );
      }
    },
    [contributors, renderContributors, selectedRepo]
  );

  const spinner = loading ? <Spinner /> : null;
  const errorIndicator = error ? <ErrorIndicator /> : null;
  const hasData = !(loading || error);
  const content = hasData ? renderList(selectedRepo) : null;

  return (
    <React.Fragment>
      {errorIndicator}
      {spinner}
      <Table>
        <tbody>{content}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default withRouter(Card);
