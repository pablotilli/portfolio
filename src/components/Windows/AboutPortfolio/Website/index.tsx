import React from 'react';
import styled from 'styled-components';

const WebsiteContainer = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

interface WebsiteProps {
  url: string;
}

const WebSite: React.FC<WebsiteProps> = ({ url }) => {
  return (
    <WebsiteContainer>
      <Iframe src={url} title="Embedded Site" />
    </WebsiteContainer>
  );
};

export default WebSite;
