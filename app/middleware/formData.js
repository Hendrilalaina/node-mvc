const multer = require('multer');
const MaximumFileSizeException = require('../exceptions/maximum-file-size-exception');

const upload = multer({
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
    storage: multer.memoryStorage()
}).any();

exports.formData = (req, res, next) => {
    upload(req, res, err => {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
            return next(new MaximumFileSizeException(100));
        }
        if (err) {
            return next(err);
        }
        req.body.files = {};
        req.files.forEach(file => {
            req.body.files[file.originalname] = {
                filename: file.originalname,
                mimeType: file.mimetype,
                encoding: file.encoding,
                buffer: file.buffer
            };
        });
        next();
    });
};