import { Box } from "@mui/material";

//profile image for each user (a circular image)
const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        //50 percent border radius: circular image
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        //profile image source
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};
export default UserImage;
