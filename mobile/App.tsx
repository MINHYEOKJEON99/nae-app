import { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Platform, BackHandler } from "react-native";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";
import { useEffect } from "react";

const WEB_URL = "https://nae-app-six.vercel.app";

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // Android 뒤로가기 버튼 처리
  useEffect(() => {
    if (Platform.OS !== "android") return;

    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });

    return () => handler.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_URL }}
        style={styles.webview}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        // 풀스크린 웹앱 느낌
        allowsBackForwardNavigationGestures
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        // 성능 최적화
        cacheEnabled
        javaScriptEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f5",
  },
  webview: {
    flex: 1,
  },
});
