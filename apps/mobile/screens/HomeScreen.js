import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PlayerCard from '../components/PlayerCard';
import GameCard from '../components/GameCard';
import playersData from '../data/players';
import gamesData from '../data/games';

const COLORS = {
  bg: '#0B0C10', card: '#1F2833', red: '#D50032',
  white: '#FFFFFF', gray: '#C5C6C7', grayDark: '#66757F', border: '#2d3748',
};

export default function HomeScreen({ navigation }) {
  const upcomingGames = gamesData.filter(g => g.status === 'upcoming').slice(0, 3);
  const featuredPlayers = playersData.slice(0, 4);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>⚾</Text>
        <Text style={styles.heroTitle}>Baseball{'\n'}<Text style={styles.heroTitleRed}>Like Never Before</Text></Text>
        <Text style={styles.heroSubtitle}>Your complete baseball hub</Text>
      </View>

      {/* Upcoming Games */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Games</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
            <Text style={styles.seeAll}>See All →</Text>
          </TouchableOpacity>
        </View>
        {upcomingGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </View>

      {/* Featured Players */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Players</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Players')}>
            <Text style={styles.seeAll}>See All →</Text>
          </TouchableOpacity>
        </View>
        {featuredPlayers.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  hero: {
    padding: 24,
    paddingTop: 32,
    backgroundColor: '#0d1117',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 8,
  },
  heroTitleRed: {
    color: COLORS.red,
  },
  heroSubtitle: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  seeAll: {
    fontSize: 13,
    color: COLORS.red,
    fontWeight: '600',
  },
});
