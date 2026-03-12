import ArticleDetailClient from './ArticleDetailClient';

export async function generateStaticParams() {
  return [{ articleId: '_' }];
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ articleId: string }> }) {
  const { articleId } = await params;
  return <ArticleDetailClient articleId={articleId} />;
}
