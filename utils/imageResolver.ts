//Sistema híbrido: intenta Vercel Blob primero, si falla usa local

export function resolveImageUrl(
  filename: string, 
  folder: string = "RESTAURACIONES"
): string[] {
  // Devuelve un ARRAY con URLs en orden de prioridad
  const vercelUrl = `https://6cpapojiq0eoskkp.public.blob.vercel-storage.com/images/dataale/TRABAJOS/${folder}/${filename}`;
  const localUrl = `/images/dataale/TRABAJOS/${folder}/${filename}`;
  
  return [vercelUrl, localUrl]; // Primero intenta Vercel, luego local
}


export function getThumbnailUrl(
  filename: string,
  folder: string = "RESTAURACIONES"
): string {
  // Para thumbnails siempre usa local (más rápido, menos consumo)
  return `/images/dataale/TRABAJOS/${folder}/thumbs/${filename}`;
  // Si no tienes carpeta thumbs, comenta la línea anterior y usa:
  // return `/images/dataale/TRABAJOS/${folder}/${filename}`;
}

export function getImageKey(url: string): string {
  return url.split('/').pop() || url;
}