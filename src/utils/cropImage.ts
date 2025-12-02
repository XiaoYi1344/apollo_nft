import { Area } from 'react-easy-crop';

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  type: string,
  rotation: number = 0
): Promise<File> {
  const image = await createImage(imageSrc);

  // Canvas để crop ảnh
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Cannot get canvas context');

  // Dịch chuyển canvas về center và xoay
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  // Vẽ phần crop
  ctx.drawImage(
    image,
    pixelCrop.x, // sx
    pixelCrop.y, // sy
    pixelCrop.width, // sw
    pixelCrop.height, // sh
    0, // dx
    0, // dy
    pixelCrop.width, // dw
    pixelCrop.height // dh
  );

  // Xuất file
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject('Canvas is empty');
      const file = new File([blob], `cropped_${type}.png`, { type: 'image/png' });
      resolve(file);
    }, 'image/png');
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });
}
