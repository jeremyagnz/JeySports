import { View, Text, StyleSheet } from 'react-native';

const COLORS = {
  card: '#1F2833', white: '#FFFFFF', gray: '#C5C6C7',
  grayDark: '#66757F', border: '#2d3748', green: '#68D391', red2: '#FC8181',
};

export default function TeamCard({ team }) {
  const winPct = ((team.wins / (team.wins + team.losses)) * 100).toFixed(1);
  return (
    <View style={[styles.card, { borderTopColor: team.primaryColor, borderTopWidth: 3 }]}>
      <View style={styles.header}>
        <Text style={styles.logo}>{team.logo}</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{team.name}</Text>
          <Text style={styles.division}>{team.division}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{team.shortName}</Text>
        </View>
      </View>
      <View style={styles.record}>
        <View style={styles.recordItem}>
          <Text style={[styles.recordValue, { color: COLORS.green }]}>{team.wins}</Text>
          <Text style={styles.recordLabel}>Wins</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.recordItem}>
          <Text style={[styles.recordValue, { color: COLORS.red2 }]}>{team.losses}</Text>
          <Text style={styles.recordLabel}>Losses</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.recordItem}>
          <Text style={styles.recordValue}>{winPct}%</Text>
          <Text style={styles.recordLabel}>Win %</Text>
        </View>
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
  logo: {
    fontSize: 36,
  },
  info: {
    flex: 1,
  },
  name: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  division: {
    color: COLORS.grayDark,
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '800',
  },
  record: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 12,
  },
  recordItem: {
    flex: 1,
    alignItems: 'center',
  },
  recordValue: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
  },
  recordLabel: {
    color: COLORS.grayDark,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
});
