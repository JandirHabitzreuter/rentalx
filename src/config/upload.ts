import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
    upload(folder: string) {
        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, resolve(__dirname, "..", "..", folder));
            },
            filename(req, file, cb) {
                const fileHash = crypto.randomBytes(16).toString("hex");
                const fileName = `${fileHash}-${file.originalname}`;
                cb(null, fileName);
            },
        });

        return storage;
    },
};
