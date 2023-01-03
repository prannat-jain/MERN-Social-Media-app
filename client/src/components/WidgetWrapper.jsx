//this component represents the styling of each widget(like a card)

import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  //top, right, bottom ,left = clockwise
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));
export default WidgetWrapper;
