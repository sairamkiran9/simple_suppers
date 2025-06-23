import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice"; // update path as needed
import { persistor } from "../redux/store"; // this must be exported in store.js

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Vegan",
  "Quick",
  "Healthy",
  "Dessert",
];

const featured = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    label: "Featured Plan 1",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    label: "Featured Plan 2",
  },
];

const mealPlanners = [
  {
    id: 1,
    name: "Healthy Family Meals",
    desc: "Nutritious weekly plans for families",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    favorite: false,
  },
  {
    id: 2,
    name: "Quick Vegan Bites",
    desc: "Delicious vegan recipes in 20 mins",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    favorite: true,
  },
];

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [planners, setPlanners] = useState(mealPlanners);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // TODO: Add your logout logic here (clear user, tokens, etc.)\
    dispatch(logout());

    // Clear persisted state
    await persistor.purge();

    // Navigate to login screen
    navigation.replace("Login");
    Alert.alert("Logged out", "You have been logged out.");
    navigation.replace("Login");
  };
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    console.log("Persisted user:", user);
  }, [user]);

  const handleFavorite = (id) => {
    setPlanners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  };

  // Filter planners by search/category (simple demo)
  const displayedPlanners = planners.filter(
    (p) =>
      (selectedCategory === "All" ||
        p.name.toLowerCase().includes(selectedCategory.toLowerCase())) &&
      (search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={styles.bg}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/32.jpg",
            }}
            style={styles.avatar}
          />
          <Text style={styles.headerGreeting}>Hi, John!</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.carousel}
        >
          {featured.map((item) => (
            <View key={item.id} style={styles.carouselItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.carouselImage}
              />
              <View style={styles.carouselLabelBox}>
                <Text style={styles.carouselLabel}>{item.label}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Horizontal Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          <TouchableOpacity
            style={[
              styles.categoryPill,
              selectedCategory === "All" && styles.activeCategoryPill,
            ]}
            onPress={() => setSelectedCategory("All")}
          >
            <Text
              style={[
                styles.categoryPillText,
                selectedCategory === "All" && styles.activeCategoryPillText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryPill,
                selectedCategory === cat && styles.activeCategoryPill,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryPillText,
                  selectedCategory === cat && styles.activeCategoryPillText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Brand and Search */}
        <View style={styles.brandSearchRow}>
          <View style={styles.brandBox}>
            <Text style={styles.brandText}>Simple Suppers • New York</Text>
          </View>
          <TextInput
            style={styles.searchBox}
            placeholder="Search meal planners"
            placeholderTextColor="#64748b"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* List Section Title */}
        <View style={styles.listSection}>
          <Text style={styles.listTitle}>Available Meal Planners</Text>
        </View>

        {/* Meal Planner Cards */}
        {displayedPlanners.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No meal planners found.</Text>
          </View>
        ) : (
          displayedPlanners.map((planner) => (
            <View key={planner.id} style={styles.mealPlannerCard}>
              <Image
                source={{ uri: planner.image }}
                style={styles.plannerImage}
              />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.mealPlannerText}>{planner.name}</Text>
                <Text style={styles.plannerDesc}>{planner.desc}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 4,
                  }}
                >
                  <Text style={styles.ratingText}>⭐ {planner.rating}</Text>
                  <TouchableOpacity onPress={() => handleFavorite(planner.id)}>
                    <Text
                      style={[
                        styles.favorite,
                        planner.favorite && styles.favoriteActive,
                      ]}
                    >
                      {planner.favorite ? "♥" : "♡"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.viewBtn}>
                <Text style={styles.viewBtnText}>View</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  headerBar: {
    width: "100%",
    height: 64,
    backgroundColor: "#6366f1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 8,
    elevation: 8,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  headerGreeting: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  logoutBtn: {
    backgroundColor: "#fff",
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  logoutText: {
    color: "#6366f1",
    fontWeight: "600",
    fontSize: 15,
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: "center",
    paddingBottom: 60,
  },
  carousel: {
    width: "100%",
    marginBottom: 16,
  },
  carouselItem: {
    width: width - 40,
    marginHorizontal: 10,
    borderRadius: 18,
    overflow: "hidden",
    elevation: 3,
    backgroundColor: "#fff",
  },
  carouselImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  carouselLabelBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#6366f1cc",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopRightRadius: 16,
  },
  carouselLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  categoryScroll: {
    width: "100%",
    marginBottom: 14,
    paddingLeft: 10,
  },
  categoryPill: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#6366f1",
    elevation: 2,
  },
  categoryPillText: {
    color: "#6366f1",
    fontWeight: "600",
    fontSize: 15,
  },
  activeCategoryPill: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },
  activeCategoryPillText: {
    color: "#fff",
  },
  brandSearchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "97%",
    marginBottom: 14,
  },
  brandBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
    justifyContent: "center",
  },
  brandText: {
    color: "#334155",
    fontWeight: "500",
    fontSize: 15,
  },
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
    fontSize: 15,
    color: "#334155",
    marginLeft: 8,
  },
  listSection: {
    width: "97%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 17,
    color: "#334155",
    fontWeight: "700",
    textAlign: "center",
  },
  mealPlannerCard: {
    width: "97%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 18,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
  },
  plannerImage: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: "#e0e7ef",
  },
  mealPlannerText: {
    fontSize: 17,
    color: "#334155",
    fontWeight: "700",
    textAlign: "left",
  },
  plannerDesc: {
    fontSize: 13,
    color: "#64748b",
  },
  ratingText: {
    fontSize: 13,
    color: "#f59e42",
    marginRight: 8,
  },
  favorite: {
    fontSize: 20,
    color: "#e5e7eb",
    marginLeft: 8,
  },
  favoriteActive: {
    color: "#e11d48",
  },
  viewBtn: {
    backgroundColor: "#6366f1",
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 16,
    elevation: 2,
  },
  viewBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  emptyState: {
    padding: 32,
    alignItems: "center",
  },
  emptyStateText: {
    color: "#64748b",
    fontSize: 16,
  },
});

export default HomeScreen;
