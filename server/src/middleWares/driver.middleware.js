import upload from "../config/multer"

export const uploadArray = (name) => async (req, res, next) => {
    try {
      upload.array(name)(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            message: 'Something went wrong while trying to upload Image',
            error:err.message
          });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Image upload error' });
    }
  };
