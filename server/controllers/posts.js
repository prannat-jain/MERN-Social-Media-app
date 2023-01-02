import Post from "../models/Post.js";
import User from "../models/User.js";

/*CREATE*/
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      //likes and comments initially empty
      likes: {},
      comments: [],
    });
    //saving the post into mongoDb
    await newPost.save();

    //list of posts with new post added for the feed
    const post = await Post.find();
    //status 201 = successful creation
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/*READ*/
export const getFeedPosts = async (req, res) => {
  try {
    //grabbing the newsfeed
    const post = await Post.find();
    //status 200 = successful request
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    //grabbing the newsfeed for a specific userid
    const post = await Post.find({ userId });
    //status 200 = successful request
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/*UPDATE*/
export const likePost = async (req, res) => {
  try {
    //destucuring and getting id and userId from req
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    //an userId is present already then delete it from the list
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      //if user if is not present add, it to the list of likes
      post.likes.set(userId, true);
    }

    //updated the front end below
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      //new object = true
      { new: true }
    );
    //updated the front end
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
