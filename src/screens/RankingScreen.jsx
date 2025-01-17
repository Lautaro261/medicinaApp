import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { map } from "lodash";
import { db } from "../utils/firebase";
import { ProfessionalRanking } from "../components/Professionals/professionalRanking/ProfessionalRanking";


export const RankingScreen=()=> {
  const [professionals, setProfessionals] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "professionals"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );

    console.log("Prof:", professionals)

    onSnapshot(q, (snapshot) => {
      setProfessionals(snapshot.docs);
      //console.log("DATA", snapshot.docs);
    });
  }, []);

  return (
    <ScrollView>
      {map(professionals, (professional, index) => (
        <ProfessionalRanking
          key={index}
          index={index}
          professional={professional.data()}
        />
      ))}
    </ScrollView>
  );
}

