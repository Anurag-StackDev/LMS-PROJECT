import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 10 },
]);

export default upload;