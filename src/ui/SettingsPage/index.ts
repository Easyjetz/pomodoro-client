import styled from 'styled-components';

export const SettingsWrap = styled.div`
  padding: 50px 0;
  .message {
    display: block;
    margin: 0 auto;
    text-align: center;
    max-width: 300px;
    border: 1px solid #ee6e73;
  }
`;

export const SettingsItem = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const SettingsTitle = styled.p`
  line-height: 0;
  margin: 0;
  padding: 4px;
  font-size: 18px;
`;