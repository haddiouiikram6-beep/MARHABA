import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    try {
      setError("");

      await login(email, password);

      router.replace("/(app)/home");
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur de connexion");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🛡️ Marhba</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome back</Text>

        <Text style={styles.subtitle}>
          Log in to your account
        </Text>

        <Text style={styles.label}>Email</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={18}
            color="#777"
            style={styles.icon}
          />

          <TextInput
            placeholder="name@company.com"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.passwordHeader}>
          <Text style={styles.label}>Password</Text>

          <Pressable>
            <Text style={styles.forgot}>Forgot?</Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={18}
            color="#777"
            style={styles.icon}
          />

          <TextInput
            placeholder="********"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            onPress={() =>
              setShowPassword(!showPassword)
            }
          >
            <Ionicons
              name={
                showPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={20}
              color="#777"
            />
          </Pressable>
        </View>

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}

        <Pressable
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Loading..." : "Login"}
          </Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Dont have an account?{" "}
          </Text>

          <Link href="/(auth)/register">
            <Text style={styles.register}>
              Register
            </Text>
          </Link>
        </View>
      </View>

      <Text style={styles.copy}>
        © 2026 MARHBA SECURITY LABS
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ea",
    paddingHorizontal: 22,
  },

  logoContainer: {
    marginTop: 25,
    marginBottom: 20,
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1d7a38",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 6,
    marginBottom: 25,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 18,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 15,
  },

  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  forgot: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "600",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#22c55e",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  footerText: {
    color: "#666",
  },

  register: {
    color: "#22c55e",
    fontWeight: "bold",
  },

  copy: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 12,
  },
});