import Box from '@mui/material/Box';
import { Theme, styled } from '@mui/material';

export const StyledBetweenBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: ${(props: { theme?: Theme }) => props.theme?.spacing(2)};
`;

export const StyledCenteredBox = styled(StyledBetweenBox)`
  justify-content: center;
`;

export const StyledLoaderContainer = styled(StyledBetweenBox)`
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  min-height: 400px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
`;
