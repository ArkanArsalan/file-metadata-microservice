import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';

dotenv.config();

const app = express();

app.use(cors());
app.use('/public', express.static(path.join(process.cwd(), 'public')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const port = 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  console.log(req.file);
  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});
