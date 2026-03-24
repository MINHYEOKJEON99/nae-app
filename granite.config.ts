import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "my-news",
  brand: {
    displayName: "하루 5분: IT 트렌드", // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: "#3182F6", // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: "https://static.toss.im/appsintoss/27519/51596f09-675c-4483-a453-a8386c604fc2.png",
  },
  web: {
    host: "192.168.45.79",
    port: 5173,
    commands: {
      dev: "next dev --port 5173",
      build: "tsx scripts/build-static.ts",
    },
  },
  permissions: [],
  outdir: "out",
});
