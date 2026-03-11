import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import PlayerCard from '../components/PlayerCard';
import playersData from '../data/players';

const COLORS = {
  bg: '#0B0C10', card: '#1F2833', red: '#D50032',
  white: '#FFFFFF', gray: '#C5C6C7', grayDark: '#66757F', border: '#2d3748',
};

function StatsPanel({ player }) {
  const stats = player?.stats || {};
  const rows = [
    ['Batting Average', stats.avg],
    ['Home Runs', stats.hr],
    ['RBI', stats.rbi],
    ['OPS', stats.ops],
  ];
  return (
    <View style={spStyles.panel}>
      <Text style={spStyles.title}>Season Stats</Text>
      {rows.map(([label, value]) => (
        <View key={label} style={spStyles.row}>
          <Text style={spStyles.label}>{label}</Text>
          <Text style={spStyles.value}>{value ?? '--'}</Text>
        </View>
      ))}
    </View>
  );
}

const spStyles = StyleSheet.create({
  panel: {
    backgroundColor: '#1F2833',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 16,
    marginTop: 12,
  },
  title: {
    color: '#D50032',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  label: {
    color: '#C5C6C7',
    fontSize: 14,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default function PlayersScreen() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = playersData.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <TextInput
          style={styles.search}
          placeholder="🔍 Search players..."
          placeholderTextColor={COLORS.grayDark}
          value={search}
          onChangeText={setSearch}
        />
        {selected && (
          <View style={styles.selectedBanner}>
            <Text style={styles.selectedName}>{selected.name}</Text>
            <StatsPanel player={selected} />
            <TouchableOpacity onPress={() => setSelected(null)} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕ Close</Text>
            </TouchableOpacity>
          </View>
        )}
        {filtered.map(player => (
          <TouchableOpacity key={player.id} onPress={() => setSelected(player)}>
            <PlayerCard player={player} />
          </TouchableOpacity>
        ))}
        {filtered.length === 0 && (
          <Text style={styles.noResults}>No players found.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  inner: { padding: 16 },
  search: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 16,
  },
  selectedBanner: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.red,
    padding: 16,
    marginBottom: 16,
  },
  selectedName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  closeBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  closeBtnText: {
    color: COLORS.grayDark,
    fontSize: 13,
  },
  noResults: {
    color: COLORS.grayDark,
    textAlign: 'center',
    padding: 24,
    fontSize: 14,
  },
});
