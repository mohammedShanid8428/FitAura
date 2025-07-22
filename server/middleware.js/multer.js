const multer=require('multer');
const{CloudinaryStorage}=require('multer-storage-cloudinary')
const cloudinary=require('../config/cloudinary');

const routineStorage =new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder:"FitAura/Routines"
    
  }
})
const nutritionStorage =new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder:"FitAura/Nutritions"
    
  }
})
const moodStorage =new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder:"FitAura/Moods"
    
  }
})

const upload=multer({storage});
module.exports=upload;
