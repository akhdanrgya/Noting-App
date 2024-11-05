import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  initialData,
  ScheduleData,
  Activity,
} from "@/components/dummy/JadwalData";

const Jadwal: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData>(initialData);

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long", // 'long', 'short', 'narrow' untuk tipe weekday
      year: "numeric", // 'numeric' untuk tahun
      month: "short", // 'long', 'short', 'numeric', '2-digit' untuk tipe bulan
      day: "numeric", // 'numeric' untuk tanggal
    };
    const formattedDate = today.toLocaleDateString("id-ID", options).split(" ");
    const day = formattedDate[0];
    const month = formattedDate[1];
    const date = formattedDate[2];
    const year = formattedDate[3];

    console.log(options);

    setScheduleData((prevData) => ({
      ...prevData,
      hari: day,
      bulan: month,
      tanggal: date,
      tahun: year,
    }));
  }, []);

  const handleDatePress = (date: string) => {
    setScheduleData((prevData) => ({ ...prevData, tanggal: date }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Jadwal</Text>
          <View style={styles.dateBox}>
            <Text style={styles.dateNumber}>{scheduleData.bulan}</Text>
            <View>
              <Text style={styles.dateText}>{scheduleData.hari}</Text>
              <Text style={styles.dateText}>
                {scheduleData.tanggal} {scheduleData.tahun}
              </Text>
            </View>
          </View>


        <View style={styles.calendar}>
          <View style={styles.weekDays}>
            {["M", "S", "S", "R", "K", "J", "S"].map((day, index) => (
              <TouchableOpacity
                key={index}
                style={styles.weekDayButton}
                onPress={() => handleDatePress(scheduleData.tanggal)}
              >
                <Text style={styles.weekDay}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.dates}>
              {["27", "28", "29", "30", "31", "1", "2"].map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dateButton}
                  onPress={() => handleDatePress(date)}
                >
                  <Text
                    style={[
                      styles.dateNumber,
                      date === scheduleData.tanggal ? styles.selectedDate : {},
                    ]}
                  >
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <ScrollView>
        <View style={styles.content}>
          {scheduleData.jadwal.map((activity: Activity, index: number) => (
            <View key={index} style={styles.activity}>
              <Text style={styles.activityTime}>{activity.waktu}</Text>
              <View style={styles.activityCard}>
                <Text style={styles.activityTitle}>{activity.kegiatan}</Text>
                <Text style={styles.activityDescription}>
                  {activity.keterangan}
                </Text>
                {activity.lokasi && (
                  <View style={styles.activityLocationRow}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={16}
                      color="#ffffff"
                    />
                    <Text style={styles.activityLocation}>
                      {activity.lokasi}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F2F2F",
    marginBottom: 20,
  },
  dateBox: {
    flexDirection: "row",
    backgroundColor: "#E8E0F4",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  dateNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4B3F72",
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#4B3F72",
  },
  calendar: {
    width: "100%",
    alignItems: "center",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekDay: {
    fontSize: 16,
    color: "#79747E",
  },
  weekDayButton: {
    paddingHorizontal: 10,
  },
  dates: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  selectedDate: {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#7A5FAF",
    borderRadius: 10,
    padding: 5,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  activity: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  activityTime: {
    fontSize: 18,
    color: "black",
    marginRight: 10,
  },
  activityCard: {
    backgroundColor: "#7A5FAF",
    padding: 15,
    borderRadius: 12,
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  activityDescription: {
    fontSize: 16,
    color: "#D3C4E3",
    marginTop: 5,
  },
  activityLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  activityLocation: {
    fontSize: 14,
    color: "#ffffff",
    marginLeft: 5,
  },

  dateContainer: {

  }

});

export default Jadwal;
