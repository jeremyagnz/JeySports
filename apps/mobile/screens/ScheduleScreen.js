import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import GameCard from '../components/GameCard';
import gamesData from '../data/games';

const COLORS = {
  bg: '#0B0C10', card: '#1F2833', red: '#D50032',
  white: '#FFFFFF', gray: '#C5C6C7', grayDark: '#66757F', border: '#2d3748',
};

export default function ScheduleScreen() {
  const [filter, setFilter] = useState('all');

  const filtered = gamesData.filter(g => {
    if (filter === 'upcoming') return g.status === 'upcoming';
    if (filter === 'final') return g.status === 'final';
    return true;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.filters}>
          {['all', 'upcoming', 'final'].map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {filtered.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
        {filtered.length === 0 && (
          <Text style={styles.empty}>No games found.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  inner: { padding: 16 },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterBtnActive: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
  },
  filterText: {
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  empty: {
    color: COLORS.grayDark,
    textAlign: 'center',
    padding: 24,
    fontSize: 14,
  },
});
