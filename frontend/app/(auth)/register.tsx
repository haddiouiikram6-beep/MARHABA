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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { register, isLoading } = useAuthStore();

  const handleRegister = async () => {
    try {
      setError("");

      await register(fullName, email, password);

      router.replace("/(app)/home");
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur d'inscription");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🛡️ Marhba</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>
          Register to continue
        </Text>

        <Text style={styles.label}>Full Name</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={18}
            color="#777"
            style={styles.icon}
          />

          <TextInput
            placeholder="Full name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

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

        <Text style={styles.label}>Password</Text>

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
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Loading..." : "Register"}
          </Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
          </Text>

          <Link href="/(auth)/login">
            <Text style={styles.login}>Login</Text>
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

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
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

  login: {
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