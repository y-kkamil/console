import styled from 'styled-components';

export const ServiceClassTabsContentWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0 0 20px 0;
  text-align: left;
  border-radius: 4px;
  background-color: #ffffff;
  font-family: '72';
  width: 100%;
  font-weight: normal;
`;

export const LinkButton = styled.span`
  color: #0b74de;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
`;

export const Link = styled.a`
  cursor: pointer;
  text-decoration: none !important;
`;

export const StatusWrapper = styled.div`
  background-color: #6d7678;
  position: relative;
  border-radius: 2px;
  width: 20px;
  height: 20px;
  margin-left: 3px;
  border: none;
  overflow: hidden;
  float: left;

  &:first-child {
    margin-left: 0;
  }
`;

export const Status = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  border: none;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  font-family: '72';
  line-height: 20px;
  font-size: 12px;
  color: #ffffff;
`;
