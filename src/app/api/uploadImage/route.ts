import { putProfileImageToDatabase } from '@/actions/actions';
import {uploadToS3, getUserPresignedUrls} from '@/lib/s3';
import { userAuth } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const userId = (await userAuth()).id
    const formData = await req.formData()
    const file = formData.get('image') as File;

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const {error, key} = await uploadToS3({file, userId})
    if(error) return NextResponse.json({ message: error});

    if(key) putProfileImageToDatabase(userId, key)
    return NextResponse.json({ key });   
}

// export async function GET(req: NextRequest) {
//     const userId = (await userAuth()).id

//     try {
//         const {error, presignedUrls } = await getUserPresignedUrls(userId)

//         if(error) return NextResponse.json({ message: error });

//         return NextResponse.json(presignedUrls);
//     } catch (error) {
//         return NextResponse.json({ message: error });
//     }
//   }
  