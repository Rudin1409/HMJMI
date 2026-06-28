import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const BACKEND_URL = API_URL.replace(/\/api$/, '');

export function getImageUrl(path: string | undefined | null): string {
  if (!path) return '';

  if (path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }

  // If it's a relative path, prefix it with BACKEND_URL
  if (path.startsWith('/')) {
    // If it's a local static asset (like logo/logokabinet.png, etc.), keep it relative
    if (path.startsWith('/logo/') || path.startsWith('/Galeri/') || path.startsWith('/anggota/') || path.startsWith('/proker/')) {
      return path;
    }
    return `${BACKEND_URL}${path}`;
  }

  if (!path.startsWith('http://') && !path.startsWith('https://')) {
    return `${BACKEND_URL}/${path}`;
  }

  // If the path is an absolute URL pointing to a backend (like localhost/127.0.0.1 or similar),
  // but our current API host is different, we rewrite the base URL to match the current backend URL.
  const storageIndex = path.indexOf('/storage/');
  if (storageIndex !== -1) {
    return `${BACKEND_URL}${path.substring(storageIndex)}`;
  }

  const logoIndex = path.indexOf('/logo/');
  if (logoIndex !== -1) {
    // For default assets, if it's a local public file like /logo/logokabinet.png, keep it relative so it loads locally
    return path.substring(logoIndex);
  }

  return path;
}

