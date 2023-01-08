import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import backgroundImg from "../../background.jpg";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <div
      style={{
        backgroundImage: "url(" + backgroundImg + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
      }}
    >
      <Box>
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Technomaniacs
          </Typography>
        </Box>
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome !, Chat to other technomaniacs!!
          </Typography>
          <Form></Form>
        </Box>
        <Typography textAlign="right">
          Apologies...starting server might take 30 seconds.
        </Typography>
      </Box>
    </div>
  );
};

export default LoginPage;
