'use client';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface InfiniteScrollTriggerProps {
  onTrigger: () => void;
  enabled: boolean;
}

export default function InfiniteScrollTrigger({
  onTrigger,
  enabled,
}: InfiniteScrollTriggerProps) {
  const ref = useInfiniteScroll(onTrigger, enabled);
  return <div ref={ref} style={{ height: 1 }} />;
}
