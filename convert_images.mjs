import sharp from 'sharp';
import fs from 'fs';

if (!fs.existsSync('./public/images')) {
  fs.mkdirSync('./public/images', { recursive: true });
}

const files = [
  { in: 'C:/Users/Boryot/.gemini/antigravity-ide/brain/8f998f71-988c-4d74-b8bb-879a62967c26/media__1783905697295.jpg', out: './public/images/local_noche.webp' },
  { in: 'C:/Users/Boryot/.gemini/antigravity-ide/brain/8f998f71-988c-4d74-b8bb-879a62967c26/media__1783905710907.jpg', out: './public/images/burger_local.webp' },
  { in: 'C:/Users/Boryot/.gemini/antigravity-ide/brain/8f998f71-988c-4d74-b8bb-879a62967c26/media__1783905717733.jpg', out: './public/images/burger_close.webp' },
  { in: 'C:/Users/Boryot/.gemini/antigravity-ide/brain/8f998f71-988c-4d74-b8bb-879a62967c26/media__1783905727374.jpg', out: './public/images/terraza.webp' }
];

async function convert() {
  for (const f of files) {
    try {
      await sharp(f.in)
        .resize({ width: 2160, withoutEnlargement: false })
        .webp({ quality: 95 })
        .toFile(f.out);
      console.log('Converted: ' + f.out);
    } catch (err) {
      console.error('Error with ' + f.in, err);
    }
  }
}

convert();
