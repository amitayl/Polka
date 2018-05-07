

let cloudinaryIsInit =  false;

function uploadImg(imgUrl) {
   if (!cloudinaryIsInit) _initCloudinary(); 
    return new Promise((resolve, reject)=>{
    cloudinary.v2.uploader.upload(imgUrl, (err, res) => {
        console.log('res', res);
        if (err)    reject(err)
        else        resolve(res);
    });
   });
 }
 function _initCloudinary(){
        cloudinary.config({
            cloud_name: 'df35vgajg',
            api_key: '628837165216168',
            api_secret: 'ivRld4kUcq2bazy-kLT8qmW9i9'
        });
        cloudinaryIsInit = true;
    
 }

 module.exports = {
    uploadImg,
  };

