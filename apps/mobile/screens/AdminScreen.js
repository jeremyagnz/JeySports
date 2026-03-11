import { View, Text, StyleSheet } from 'react-native';

const COLORS = {
  bg: '#0B0C10', white: '#FFFFFF', gray: '#C5C6C7', grayDark: '#66757F',
};

export default function AdminScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔒</Text>
      <Text style={styles.title}>Admin Panel</Text>
      <Text style={styles.subtitle}>
        Admin features are available in the web app.{'\n'}Please visit the web dashboard to manage players and teams.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: { fontSize: 64, marginBottom: 16 },
  title: { color: COLORS.white, fontSize: 22, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: COLORS.grayDark, fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
