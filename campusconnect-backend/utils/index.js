export const defaultImage = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

import {v2 as cloudinary} from 'cloudinary'

const uploadImage = (image,id) =>{
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(
            image,
            {public_id : id},
            function (error,result){
                if(result && result.secure_url){

                    return resolve(result.secure_url)
                }
            return reject(error)
            }
        )
    })
}



export {uploadImage}