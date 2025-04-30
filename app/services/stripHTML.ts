import striptags from 'striptags';

export default function stripHtml(html: string): string {
  return striptags(html);
}