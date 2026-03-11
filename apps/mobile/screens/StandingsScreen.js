import { ScrollView, View, Text, StyleSheet } from 'react-native';

const COLORS = {
  bg: '#0B0C10', card: '#1F2833', red: '#D50032',
  white: '#FFFFFF', gray: '#C5C6C7', grayDark: '#66757F', border: '#2d3748',
};

const standingsData = {
  'AL East': [
    { teamId: 1, shortName: 'NYY', team: 'New York Yankees', wins: 92, losses: 70, pct: '.568', gb: '-', streak: 'W3' },
    { teamId: 8, shortName: 'BOS', team: 'Boston Red Sox', wins: 81, losses: 81, pct: '.500', gb: '11', streak: 'L2' },
  ],
  'AL West': [
    { teamId: 5, shortName: 'HOU', team: 'Houston Astros', wins: 90, losses: 72, pct: '.556', gb: '-', streak: 'W1' },
    { teamId: 4, shortName: 'SEA', team: 'Seattle Mariners', wins: 88, losses: 74, pct: '.543', gb: '2', streak: 'W2' },
  ],
  'NL West': [
    { teamId: 2, shortName: 'LAD', team: 'Los Angeles Dodgers', wins: 98, losses: 64, pct: '.605', gb: '-', streak: 'W5' },
    { teamId: 5, shortName: 'ARI', team: 'Arizona Diamondbacks', wins: 84, losses: 78, pct: '.519', gb: '14', streak: 'W1' },
  ],
  'NL East': [
    { teamId: 3, shortName: 'ATL', team: 'Atlanta Braves', wins: 89, losses: 73, pct: '.549', gb: '-', streak: 'W2' },
  ],
};

export default function StandingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        {Object.entries(standingsData).map(([division, teams]) => (
          <View key={division} style={styles.divisionBlock}>
            <Text style={styles.divisionTitle}>{division}</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, styles.teamCell]}>Team</Text>
              <Text style={styles.headerCell}>W</Text>
              <Text style={styles.headerCell}>L</Text>
              <Text style={styles.headerCell}>PCT</Text>
              <Text style={styles.headerCell}>GB</Text>
              <Text style={styles.headerCell}>STK</Text>
            </View>
            {teams.map((team, i) => (
              <View key={team.teamId} style={[styles.tableRow, i === 0 && styles.leaderRow]}>
                <Text style={[styles.cell, styles.teamCell, i === 0 && { color: COLORS.white, fontWeight: '700' }]}>
                  {i === 0 ? '★ ' : ''}{team.shortName}
                </Text>
                <Text style={[styles.cell, { color: '#68D391', fontWeight: '700' }]}>{team.wins}</Text>
                <Text style={[styles.cell, { color: '#FC8181' }]}>{team.losses}</Text>
                <Text style={styles.cell}>{team.pct}</Text>
                <Text style={styles.cell}>{team.gb}</Text>
                <Text style={[styles.cell, { color: team.streak.startsWith('W') ? '#68D391' : '#FC8181' }]}>
                  {team.streak}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  inner: { padding: 16 },
  divisionBlock: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  divisionTitle: {
    color: COLORS.red,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  headerCell: {
    flex: 1,
    color: COLORS.grayDark,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  leaderRow: {
    backgroundColor: 'rgba(213, 0, 50, 0.05)',
  },
  cell: {
    flex: 1,
    color: COLORS.gray,
    fontSize: 13,
    textAlign: 'center',
  },
  teamCell: {
    flex: 1.5,
    textAlign: 'left',
    fontWeight: '600',
  },
});
