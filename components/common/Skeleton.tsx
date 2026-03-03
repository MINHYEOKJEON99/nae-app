'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonBox = styled.div<{ $width?: string; $height?: string; $radius?: string }>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '16px'};
  border-radius: ${({ $radius, theme }) => $radius || theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.button};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.button} 0px,
    ${({ theme }) => theme.colors.border} 40px,
    ${({ theme }) => theme.colors.button} 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

const CardSkeleton = styled.div`
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export function SkeletonLine({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return <SkeletonBox $width={width} $height={height} />;
}

export function SkeletonCard() {
  return (
    <CardSkeleton>
      <SkeletonBox $width="60%" $height="20px" />
      <SkeletonBox $width="100%" $height="14px" />
      <SkeletonBox $width="80%" $height="14px" />
    </CardSkeleton>
  );
}
