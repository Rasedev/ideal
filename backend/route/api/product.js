const express = require('express');
const router = express.Router();
const multer  = require('multer');
const { secureProductUploadController, createProductController, createVariantController, getAllProductController, deleteProductController, setAllVariantController, deleteVariantController } = require('../../controller/productController');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.originalname.split('.')[1]}`)
    //console.log('first', file.originalname.split('.')[1] ); 
    }   
  })
  
  const upload = multer({ storage: storage })

//router.post('/createproduct', secureProductUploadController, createProductController);
router.post('/createproduct', createProductController);


router.post("/createvariant",upload.single('image'), createVariantController); 
router.get("/allproduct", getAllProductController);
router.post("/deleteproduct", deleteProductController);
router.get("/allvariant", setAllVariantController);
router.delete("/deletevariant/:id", deleteVariantController);



module.exports = router; 