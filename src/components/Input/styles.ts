import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 48px;
  margin-bottom: 24px;
  background-color: transparent;
`;

export const InputBase = styled.input`
  width: 100%;
  height: 48px;
  outline: 0;
  border-radius: 8px;
  border: none;
  padding-left: 24px;
  font-size: 16px;
  background-color: rgba(196, 196, 200, 0.3);

  &.error {
    border: 1px solid ${colors.error};
  }
`;
