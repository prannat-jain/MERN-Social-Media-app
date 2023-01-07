import { Box } from "@mui/material";
import base__URL from "../base_URL";

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
        src={`${base__URL}/assets/${image}`}
      />
    </Box>
  );
};
export default UserImage;
