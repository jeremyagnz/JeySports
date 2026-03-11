import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import TeamCard from '../components/TeamCard';
import PlayerCard from '../components/PlayerCard';
import teamsData from '../data/teams';
import playersData from '../data/players';

const COLORS = {
  bg: '#0B0C10', red: '#D50032', white: '#FFFFFF',
  gray: '#C5C6C7', grayDark: '#66757F', border: '#2d3748',
};

export default function TeamsScreen() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const roster = selectedTeam
    ? playersData.filter(p => p.teamId === selectedTeam.id)
    : [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        {selectedTeam ? (
          <>
            <TouchableOpacity style={styles.backBtn} onPress={() => setSelectedTeam(null)}>
              <Text style={styles.backBtnText}>← Back to Teams</Text>
            </TouchableOpacity>
            <View style={styles.teamDetail}>
              <Text style={styles.teamDetailLogo}>{selectedTeam.logo}</Text>
              <Text style={styles.teamDetailName}>{selectedTeam.name}</Text>
              <Text style={styles.teamDetailMeta}>{selectedTeam.division} · {selectedTeam.stadium}</Text>
              <View style={styles.teamRecord}>
                <Text style={[styles.recordNum, { color: '#68D391' }]}>{selectedTeam.wins}W</Text>
                <Text style={styles.recordSep}> - </Text>
                <Text style={[styles.recordNum, { color: '#FC8181' }]}>{selectedTeam.losses}L</Text>
              </View>
            </View>
            <Text style={styles.rosterTitle}>Team Roster</Text>
            {roster.length > 0 ? (
              roster.map(p => <PlayerCard key={p.id} player={p} />)
            ) : (
              <Text style={{ color: COLORS.grayDark, textAlign: 'center', padding: 24 }}>No players found for this team.</Text>
            )}
          </>
        ) : (
          teamsData.map(team => (
            <TouchableOpacity key={team.id} onPress={() => setSelectedTeam(team)}>
              <TeamCard team={team} />
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  inner: { padding: 16 },
  backBtn: { marginBottom: 16 },
  backBtnText: { color: COLORS.gray, fontSize: 14, fontWeight: '600' },
  teamDetail: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1F2833',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  teamDetailLogo: { fontSize: 64, marginBottom: 8 },
  teamDetailName: { color: COLORS.white, fontSize: 22, fontWeight: '800', marginBottom: 4 },
  teamDetailMeta: { color: COLORS.grayDark, fontSize: 13, marginBottom: 12 },
  teamRecord: { flexDirection: 'row', alignItems: 'center' },
  recordNum: { fontSize: 24, fontWeight: '800' },
  recordSep: { color: COLORS.grayDark, fontSize: 20, marginHorizontal: 4 },
  rosterTitle: { color: COLORS.white, fontSize: 18, fontWeight: '700', marginBottom: 12 },
});
