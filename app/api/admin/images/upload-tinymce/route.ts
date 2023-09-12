import { NextResponse } from 'next/server';
import { v4 } from 'uuid';
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { lookup } from "mime-types";
import fsPromise from "fs/promises";

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const file = data.get('file') as File
  
    if (!existsSync('./storage')){
      mkdirSync('./storage', { recursive: true });
    }
  
    const sharpCompress = {
      'png': {compressionLevel: 8, quality: 60},
      'jpeg': { quality: 60 },
      'webp': { quality: 60 },
      'gif': {},
      'jp2': {},
      'tiff': {},
      'avif': {},
      'heif': {},
      'jxl': {}
    }

    const extension = extname(file.name)
    const mimeName = lookup(extension) || ''
    if (!mimeName.startsWith('image/')) {
      throw "Không phải định dạng ảnh"
    }

    let name = v4() + extension
    let fileUrl = `./storage/tiny-mce/${name}`

    if (Object.keys(sharpCompress).findIndex(v => `.${v}` == extension) < 0) {

      const fileBuffer = Buffer.from(await file.arrayBuffer())

      await fsPromise.writeFile(fileUrl, fileBuffer)
    }
    else {
      let fileData = sharp(await file.arrayBuffer(), { animated: true })

      //@ts-ignore
      await fileData[metadata.format || "png"](sharpCompress[metadata.format || "png"]).toFile(fileUrl)
    }
  
    return { location: fileUrl.slice(1) }
  }
  catch (error) {
    console.log(error)
    return NextResponse.json("Error", {status: 400})
  }
}