import { colors } from "@/lib/theme";

export default function HotBadge() {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 8px',
      backgroundColor: colors.hot,
      color: '#ffffff',
      fontSize: '11px',
      fontWeight: 'bold',
      borderRadius: '9999px',
      letterSpacing: '0.5px',
    }}>
      HOT
    </span>
  );
}
