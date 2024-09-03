import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import generateUUID from "../utils/uuid.js";
import { Router } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const profile = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/profiles'));
    },
    filename: (req, file, cb) => {
        cb(null, `${generateUUID()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const uploadProfile = (req, res) => {
    return res.send(req.file.filename);
}

profile.post("/", upload.single('profileImage'), uploadProfile);

export default profile;
