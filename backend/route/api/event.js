const express = require('express');
const router = express.Router();
const multer  = require('multer');
const {createEventController,getEventController,updateEventController,deleteEventController,getAllEventsController,getUpcomingEventsController,getPastEventsController,
  getEventGalleryController, registerForEventController,generateEventReportController} = require('../../controller/eventController'); 

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
  const upload = multer({ storage: storage });




router.get('/allevent',  getAllEventsController);
router.post('/createevent',  upload.single('images'), createEventController);
router.post('/upcoming',  getUpcomingEventsController);
router.get('/past',  getPastEventsController);
router.get('/gallery',  getEventGalleryController);
router.get('/report',  generateEventReportController);
router.get('/getevent/:id',  getEventController);
router.put('/eventupdate/:id',  upload.single('images'), updateEventController);
router.delete('/deleteevent/:id', deleteEventController);
router.post('/:id/register',  registerForEventController);

module.exports = router;
