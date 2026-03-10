import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "my-news",
  brand: {
    displayName: "내뉴", // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: "#3182F6", // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: "/newspaper_icon_logo_600_1.png",
  },
  web: {
    host: "192.168.45.123",
    port: 5173,
    commands: {
      dev: "next dev --port 5173",
      build: "next build",
    },
  },
  permissions: [],
  outdir: "dist",
});
