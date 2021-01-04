import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { GetOneRepo, GetContributors } from '../services';
import GetRandomId from '../getRandomId';
import ErrorIndicator from '../errorIndicator';
import Spinner from '../spinner';

import styled from 'styled-components';

const Table = styled.div`
  margin: 3rem auto;
  border: 1px solid grey;
`;

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.between ? 'space-between' : 'space-around')};
  align-items: center;
`;

const Span = styled.span `
  flex: 1;
  margin: 1rem 0.5rem;
  text-align: center;
`;

const Img = styled.img`
  margin: 1.5rem 0;
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
            <Block key={key}>
              {/* <div> */}
                <Img src={user.avatar_url} alt="avatar" />
              {/* </div> */}
              <span>{user.login}</span>
            </Block>
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
            <Block>
              <Span name="name">{repo.name}</Span>
              <Span>Stargazers:<br />{repo.stargazers_count}
              </Span>
              <Span>Last commit:<br />{repo.pushed_at}
              </Span>
            </Block>
            <Block between>
              <Span>
                <Img src={repo.owner.avatar_url} alt="avatar" />
              </Span>
              <Span>Nickname:<br />{repo.owner.login}
              </Span>
              <Span>
                <a href={repo.owner.html_url}>{repo.owner.html_url}</a>
              </Span>
            </Block>
            <Block>
              <Span block>Languages:<br />{repo.language}
              </Span>
            </Block>
            <Block>
              <Span block>Description:<br />{repo.description}
              </Span>
            </Block>
            <Block>
              <Span block>Contributors:</Span>
            </Block>
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
        {content}
      </Table>
    </React.Fragment>
  );
};

export default withRouter(Card);
