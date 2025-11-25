const express = require("express");
const router = express.Router();
const {createCategoryController,createSubCategoryController,createCategoryStatusController,createSubCategoryStatusController,getAllCategoryController,getAllSubCategoryController, deleteCategoryController, createCategoryUpdateController, deleteSubCategoryController} = require("../../controller/categoryController");
const multer  = require('multer');

 //////MAIN Project/////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.originalname.split('.')[1]}`)
   // console.log('first', file.originalname.split('.')[1] ); 
   

    }   
  })
const upload = multer({ storage: storage })


  

router.post("/createCategory", createCategoryController );
 router.post("/createcategorystatus", createCategoryStatusController);
 router.post("/createsubcategory",upload.single('image'), createSubCategoryController);
 router.post("/createsubcategorystatus", createSubCategoryStatusController);

router.get("/getallcategory", getAllCategoryController); 
router.get("/getallsubcategories", getAllSubCategoryController);
router.post("/updatecategory", createCategoryUpdateController);

router.post("/deletecategory", deleteCategoryController)
router.delete("/deletesubcategory/:id", deleteSubCategoryController)
 
module.exports = router;