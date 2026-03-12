import { execSync } from 'child_process';
import { renameSync, existsSync } from 'fs';

// API 라우트는 static export와 호환되지 않으므로 빌드 시 임시 제외
if (existsSync('app/api')) {
  renameSync('app/api', 'app/_api_backup');
}

try {
  execSync('npx next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      STATIC_EXPORT: 'true',
      NEXT_PUBLIC_API_BASE: 'https://nae-app-six.vercel.app',
    },
  });
} finally {
  if (existsSync('app/_api_backup')) {
    renameSync('app/_api_backup', 'app/api');
  }
}
