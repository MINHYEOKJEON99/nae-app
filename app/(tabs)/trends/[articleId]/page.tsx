export const dynamic = 'force-dynamic';

import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import ArticleDetail from '@/components/trends/ArticleDetail';

interface Props {
  params: Promise<{ articleId: string }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { articleId } = await params;

  if (!ObjectId.isValid(articleId)) notFound();

  const db = await getDb();
  const doc = await db.collection('articles').findOne({ _id: new ObjectId(articleId) });

  if (!doc) notFound();

  const article = {
    _id: doc._id.toString(),
    title: doc.title as string,
    url: doc.url as string,
    category: doc.category as string,
    aiSummaryShort: (doc.aiSummaryShort ?? '') as string,
    aiSummaryLong: (doc.aiSummaryLong ?? '') as string,
    keywords: (doc.keywords ?? []) as string[],
    isHot: (doc.isHot ?? false) as boolean,
    createdAt: (doc.createdAt ?? '') as string,
  };

  return <ArticleDetail article={article} />;
}
