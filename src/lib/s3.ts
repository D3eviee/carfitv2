import {GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client} from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import {v4 as uuid} from "uuid"

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

const BUCKET = process.env.BUCKET

export const uploadToS3 = async ({file, userId}:{file: any, userId: string}) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const key = `UserProfilePhotos/${userId}/${uuid()}`
    const command = new PutObjectCommand({
        Bucket: BUCKET, 
        Key: key, 
        Body: buffer,
        ContentType: file.type
    })

    try {
        await s3.send(command)
        return {key}
    }catch(error) {
        console.log(error)
        return {error}
    }
}


const getImageKeysByUser = async (userId:string) => {
    const command = new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: userId
    })

    const {Contents=[]}  = await s3.send(command)

    return Contents.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified)).map(image => image.Key)
}


export const getUserPresignedUrls = async (userId:string) => {
    try {
       const imageKeys =  await getImageKeysByUser(userId)
       
       const presignedUrls = await Promise.all(
        imageKeys.map(key => {
            const command = new GetObjectCommand({ Bucket: BUCKET, Key: key})
            return getSignedUrl(s3, command, {expiresIn: 900})
        })
       )  
       
       return {presignedUrls}
    } catch (error) {
        console.log(error)
        return {error}
    }
}