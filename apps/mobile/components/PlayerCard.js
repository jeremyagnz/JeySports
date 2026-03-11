import { View, Text, StyleSheet } from 'react-native';

const COLORS = {
  bg: '#0B0C10', card: '#1F2833', red: '#D50032',
  white: '#FFFFFF', gray: '#C5C6C7', grayDark: '#66757F', border: '#2d3748',
};

export default function PlayerCard({ player }) {
  const initials = player.name.split(' ').map(n => n[0]).join('').substring(0, 2);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{player.name}</Text>
          <Text style={styles.team}>{player.team}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{player.position}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        {[
          ['AVG', player.stats?.avg],
          ['HR', player.stats?.hr],
          ['RBI', player.stats?.rbi],
          ['OPS', player.stats?.ops],
        ].map(([label, value]) => (
          <View key={label} style={styles.statItem}>
            <Text style={styles.statValue}>{value ?? '--'}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
  info: {
    flex: 1,
  },
  name: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  team: {
    color: COLORS.grayDark,
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    backgroundColor: COLORS.red,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  stats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  statValue: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.grayDark,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 2,
  },
});
