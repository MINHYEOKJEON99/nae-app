'use client';

import { Global, css, useTheme } from '@emotion/react';

export default function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          font-size: 16px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          background: ${theme.colors.background};
          color: ${theme.colors.text.primary};
          font-family: 'Pretendard Variable', Pretendard, -apple-system,
            BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
            'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
            'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol', sans-serif;
          line-height: 1.5;
          min-height: 100dvh;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          border: none;
          background: none;
          cursor: pointer;
          font: inherit;
          color: inherit;
        }

        ul,
        ol {
          list-style: none;
        }

        input,
        textarea {
          font: inherit;
          color: inherit;
          border: none;
          outline: none;
          background: none;
        }
      `}
    />
  );
}
