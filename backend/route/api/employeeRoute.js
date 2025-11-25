
/////////Correct Version///////////////

const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // ADD THIS

// Middlewares
const authMiddleware = require('../../middleware/authMiddleware');
const { authorizeRoles } = require('../../middleware/authorizeRoles');

// Controllers
const {createEmployeeController,getAllEmployeesController,getEmployeeStatsController,searchEmployeesController,exportEmployeesController,getEmployeeByIdController,
  updateEmployeeController,updateEmployeeStatusController,deleteEmployeeController,uploadEmployeeDocumentController} = require("../../controller/employeeController");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});
// Multer configuration for documents
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'document-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Upload for documents
const uploadDocument = multer({
  storage: documentStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for documents
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'text/plain'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid document type! Allowed: PDF, Word, Images, Text'), false);
    }
  }
});



router.use(authMiddleware);

// Employee Routes
 router.post('/createemployee', authorizeRoles('Admin', 'HR'),  upload.single('image'), createEmployeeController);
// router.post('/createemployee', authorizeRoles('Admin', 'HR'), upload.single('image'), (req, res, next) => {
//   // console.log('=== FORM DATA DEBUG ===');
//   // console.log('Raw body fields:');
//   // Object.keys(req.body).forEach(key => {
//   //   console.log(`  ${key}:`, req.body[key], `(type: ${typeof req.body[key]})`);
//   // });
//   // console.log('File:', req.file);
//   // console.log('=== END DEBUG ===');
//   console.log("===== DEBUG: EMPLOYEE CREATE REQUEST =====");
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);
//     console.log("HEADERS:", req.headers["content-type"]);
//     console.log("==========================================");
//   next();
// }, createEmployeeController);
 router.get('/allemployee', getAllEmployeesController);
router.get('/stats', authorizeRoles('Admin', 'HR'), getEmployeeStatsController);
router.get('/search', searchEmployeesController);
router.get('/export', authorizeRoles('Admin', 'HR'), exportEmployeesController);

router.get('/:id', getEmployeeByIdController);
router.put('/update/:id', authorizeRoles('Admin', 'HR'), upload.single('image'),updateEmployeeController);
router.patch('/status/:id', authorizeRoles('Admin', 'HR'), updateEmployeeStatusController);
router.delete('/delete/:id', authorizeRoles('Admin'), deleteEmployeeController);
router.post('/:id/documents', authorizeRoles('Admin', 'HR'), uploadDocument.single('document'), uploadEmployeeDocumentController);

module.exports = router;






