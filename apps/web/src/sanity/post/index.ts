import { groq } from 'next-sanity';
import { IPost } from './schemas';

export async function getPosts() : Promise<IPost[]> {
  try {
    const { client } = await import('@/sanity/client');
    const query = groq`*[_type == 'post'] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      "mainImage": mainImage.asset -> url,
      description,
    }`
    return client.fetch(query);
  }
  catch (error) {
    console.error('Error fetching data ' + error);
    throw error;
  }
}
