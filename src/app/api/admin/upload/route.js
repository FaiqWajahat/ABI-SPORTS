import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Check if Cloudinary credentials are fully defined
    if (cloudName && apiKey && apiSecret) {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const folder = 'abi-sports';
      
      // Generate SHA1 signature required by Cloudinary
      const signatureStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash('sha1').update(signatureStr).digest('hex');

      // Construct form data payload for Cloudinary API
      const cloudinaryForm = new FormData();
      // Convert buffer back to Blob for Next fetch form data append
      const fileBlob = new Blob([buffer]);
      cloudinaryForm.append('file', fileBlob, file.name);
      cloudinaryForm.append('api_key', apiKey);
      cloudinaryForm.append('timestamp', timestamp.toString());
      cloudinaryForm.append('signature', signature);
      cloudinaryForm.append('folder', folder);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: cloudinaryForm,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Cloudinary API upload error:', errorText);
        throw new Error('Cloudinary upload failed');
      }

      const data = await response.json();
      return NextResponse.json({
        success: true,
        url: data.secure_url,
        fileName: file.name,
      });
    } else {
      // Fallback: Save file locally in the public/uploads folder
      console.warn('Cloudinary credentials missing, falling back to local public uploads.');
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate a unique filename to avoid collision
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.name) || '.png';
      const cleanFileName = `file-${uniqueSuffix}${ext}`;
      const filePath = path.join(uploadDir, cleanFileName);

      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${cleanFileName}`,
        fileName: file.name,
        isFallback: true,
      });
    }
  } catch (error) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { error: 'File upload failed' },
      { status: 500 }
    );
  }
}
