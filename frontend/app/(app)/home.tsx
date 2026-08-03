import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Ionicons name="shield-checkmark" size={24} color="#1d7a38" />
          <Text style={styles.logo}>Marhba</Text>
        </View>
      </View>
      <Text style={styles.title}>
        Marhba, {user?.fullName || "User"} 👋
      </Text>

      <Text style={styles.email}>
        {user?.email || "user@example.com"}
      </Text>

      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.smallTitle}>SYSTEM HEALTH</Text>
          <View style={styles.dot} />
        </View>

        <Text style={styles.secured}>Fully Secured</Text>

        <Text style={styles.gray}>
          Your account is authenticated successfully.
        </Text>

        <View style={styles.row}>
          <Ionicons
            name="shield-checkmark"
            size={18}
            color="#1d7a38"
          />
          <Text style={styles.vault}> Vault Protected</Text>
        </View>
      </View>
      <View style={styles.codeCard}>
        <Text style={styles.smallTitle}>ACCOUNT INFORMATION</Text>

        <Text style={styles.info}>
          Full Name
        </Text>

        <Text style={styles.value}>
          {user?.fullName}
        </Text>

        <Text style={styles.info}>
          Email
        </Text>

        <Text style={styles.value}>
          {user?.email}
        </Text>
      </View>

      <View style={styles.activityHeader}>
        <Text style={styles.activityTitle}>
          Recent Activity
        </Text>
      </View>

      <View style={styles.activityCard}>
        <Ionicons
          name="log-in-outline"
          size={24}
          color="#22c55e"
        />

        <View style={styles.activityText}>
          <Text style={styles.activityMain}>
            Successful Login
          </Text>

          <Text style={styles.activitySub}>
            Welcome back to Marhba
          </Text>
        </View>
      </View>

      <View style={styles.activityCard}>
        <Ionicons
          name="shield-checkmark-outline"
          size={24}
          color="#22c55e"
        />

        <View style={styles.activityText}>
          <Text style={styles.activityMain}>
            Authentication Verified
          </Text>

          <Text style={styles.activitySub}>
            JWT Token validated
          </Text>
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logout}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#fff"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ea",
    padding: 18,
  },

  header: {
    marginTop: 20,
    marginBottom: 15,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    marginLeft: 10,
    color: "#1d7a38",
    fontWeight: "bold",
    fontSize: 22,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },

  email: {
    color: "#666",
    marginBottom: 25,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallTitle: {
    fontSize: 11,
    color: "#777",
    fontWeight: "700",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22c55e",
  },

  secured: {
    color: "#15803d",
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 15,
  },

  gray: {
    color: "#666",
    marginTop: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  vault: {
    color: "#15803d",
    fontWeight: "600",
    marginLeft: 5,
  },

  codeCard: {
    backgroundColor: "#dff6dd",
    borderRadius: 18,
    padding: 20,
    marginBottom: 25,
  },

  info: {
    marginTop: 15,
    color: "#666",
    fontSize: 13,
  },

  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    marginTop: 4,
  },

  activityHeader: {
    marginBottom: 15,
  },

  activityTitle: {
    fontWeight: "bold",
    fontSize: 22,
  },

  activityCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  activityText: {
    marginLeft: 12,
    flex: 1,
  },

  activityMain: {
    fontWeight: "600",
  },

  activitySub: {
    color: "#666",
    marginTop: 4,
    fontSize: 12,
  },

  logout: {
    backgroundColor: "#dc2626",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 40,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});