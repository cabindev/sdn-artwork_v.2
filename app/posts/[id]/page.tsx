import { generateMetadata as fetchMetadata } from './metadata';
import { Metadata } from 'next';
import PostDetail from './postDetail';

interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata | undefined> {
  return fetchMetadata({ params });
}

const PostPage = ({ params }: { params: { id: string } }) => {
  return <PostDetail params={params} />;
};

export default PostPage;

