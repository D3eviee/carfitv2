import { putBusinessImageToGallery, putProfileImageToDatabase } from '@/actions/actions';
import {uploadToGalleryS3} from '@/lib/s3';
import { serviceAuth } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const businessId = (await serviceAuth()).id
    const formData = await req.formData()
    const file = formData.get('image') as File;

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const {error, key} = await uploadToGalleryS3({file, businessId})
    if(error) return NextResponse.json({ message: error});

    if(key) putBusinessImageToGallery(businessId, key)
    return NextResponse.json({ key });   
}