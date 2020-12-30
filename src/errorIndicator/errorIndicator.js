import React from 'react';

import styled from 'styled-components';

const ErrorBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: mediumvioletred;
`;

const ErrorHeader = styled.span`
  font-size: 1.7rem;
`;

const ErrorIndicator = () => {
  return (
    <ErrorBlock>
      <ErrorHeader>Oooops!</ErrorHeader>
      <span>something has gone wrong</span>
      <span>(but we will fix it soon...)</span>
    </ErrorBlock>
  );
};

export default ErrorIndicator;
