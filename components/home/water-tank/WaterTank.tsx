import { SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/common";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import palette from "theme/palette";

const WaterTank = () => {
  const TOTAL_VOLUME = 200; // m³

  const [fillPercentage, setFillPercentage] = useState(50);
  const [waterSurfaceAnim] = useState(new Animated.Value(0));

  // Calculate current volume based on fill percentage
  const getCurrentVolume = () => {
    return ((TOTAL_VOLUME * fillPercentage) / 100).toFixed(2);
  };

  React.useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(waterSurfaceAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(waterSurfaceAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, []);

  const measurementLines = Array.from({ length: 11 }, (_, index) => {
    const percentage = 100 - index * 10;
    return (
      <View key={index} style={styles.measurementLine}>
        <View style={styles.line} />
        <Text style={styles.measurementText}>{percentage}%</Text>
      </View>
    );
  });

  const AnimatedView = Animated.createAnimatedComponent(View);

  return (
    <View style={styles.container}>
      {/* Title and Volume Information */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>خزان بلدة عنبتا </Text>
        <View style={styles.volumeInfo}>
          <Text style={styles.volumeText}>
            السعة الإجمالية: {TOTAL_VOLUME} كوب
          </Text>
          <Text style={styles.volumeText}>
            حجم الماء الحالي داخل الخزان: {getCurrentVolume()} كوب
          </Text>
        </View>
      </View>

      <View style={styles.tankContainer}>
        <AnimatedView
          style={[
            styles.water,
            {
              height: `${fillPercentage}%`,
            },
          ]}
        >
          <LinearGradient
            colors={[
              "rgba(172, 226, 247, 0.7)",
              "rgba(145, 210, 245, 0.8)",
              "rgba(120, 200, 240, 0.85)",
              "rgba(100, 190, 235, 0.9)",
              "rgba(80, 180, 230, 0.95)",
            ]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Animated.View
              style={[
                styles.waterSurface,
                {
                  opacity: waterSurfaceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.6],
                  }),
                },
              ]}
            />

            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.4)",
                "rgba(255, 255, 255, 0.1)",
                "transparent",
              ]}
              style={styles.surfaceHighlight}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          </LinearGradient>
        </AnimatedView>

        <View style={styles.measurementContainer}>{measurementLines}</View>

        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0.1)",
            "rgba(255, 255, 255, 0.05)",
            "transparent",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.glassReflection}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 8,
  },
  volumeInfo: {
    alignItems: "center",
  },
  volumeText: {
    fontSize: 16,
    color: palette.light.text.primary,
    marginBottom: 4,
  },
  tankContainer: {
    position: "relative",
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT * 0.5,
    borderWidth: 3,
    borderColor: palette.light.text.primary,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
  },
  water: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  waterSurface: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  surfaceHighlight: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 15,
  },
  glassReflection: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    opacity: 0.3,
  },
  measurementContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  measurementLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    width: 8,
    height: 1,
    backgroundColor: "#9CA3AF",
  },
  measurementText: {
    fontSize: 12,
    color: "#4B5563",
    marginLeft: 4,
  },
  controls: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  percentage: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 8,
  },
});

export default WaterTank;
