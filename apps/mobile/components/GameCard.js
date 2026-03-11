import { View, Text, StyleSheet } from 'react-native';

const COLORS = {
  card: '#1F2833', white: '#FFFFFF', gray: '#C5C6C7',
  grayDark: '#66757F', border: '#2d3748',
};

export default function GameCard({ game }) {
  const isFinal = game.status === 'final';
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.statusBadge, { backgroundColor: isFinal ? 'rgba(56,161,105,0.2)' : 'rgba(213,0,50,0.2)' }]}>
          <Text style={[styles.statusText, { color: isFinal ? '#68D391' : '#FC8181' }]}>
            {isFinal ? 'Final' : 'Upcoming'}
          </Text>
        </View>
      </View>
      <View style={styles.teams}>
        <View style={styles.teamSide}>
          <Text style={styles.teamName}>{game.awayTeam}</Text>
          {isFinal && <Text style={styles.score}>{game.awayScore}</Text>}
        </View>
        <Text style={styles.vs}>VS</Text>
        <View style={[styles.teamSide, styles.teamSideRight]}>
          {isFinal && <Text style={styles.score}>{game.homeScore}</Text>}
          <Text style={styles.teamName}>{game.homeTeam}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.meta}>📅 {new Date(game.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
        {!isFinal && <Text style={styles.meta}>🕐 {game.time}</Text>}
        <Text style={styles.meta}>🏟 {game.venue}</Text>
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
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  teams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  teamSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamSideRight: {
    justifyContent: 'flex-end',
  },
  teamName: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  score: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800',
  },
  vs: {
    color: COLORS.grayDark,
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
  },
  meta: {
    color: COLORS.grayDark,
    fontSize: 11,
  },
});
