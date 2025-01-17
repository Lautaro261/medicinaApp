import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, AirbnbRating, ListItem, Avatar } from "@rneui/themed";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { map } from "lodash";
import { DateTime } from "luxon";
import { Loading } from "../../shared/loading/Loading";
import { db } from "../../../utils/firebase";
import "intl";
import "intl/locale-data/jsonp/es";

export const Reviews=(props)=> {
  const { idProfessional } = props;
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("idProfessional", "==", idProfessional),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      //console.log(snapshot.docs)
        setReviews(snapshot.docs);
    });
  }, []);

  if (!reviews) return <Loading show text="Cargando" />;

  return (
    <View style={styles.content}>
      {map(reviews, (review) => {
        const data = review.data();
        const createReview = new Date(data.createdAt.seconds * 1000);

        return (
          <ListItem key={data.id} bottomDivider containerStyle={styles.review}>
            <Avatar source={{ uri: data.avatar }} size={50} rounded />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
              <View style={styles.subtitle}>
                <Text style={styles.comment}>{data.comment}</Text>
                <View style={styles.contentRatingDate}>
                  <AirbnbRating
                    defaultRating={data.rating}
                    showRating={false}
                    size={15}
                    isDisabled
                    starContainerStyle={styles.starContainer}
                  />
                  <Text style={styles.date}>
                    {DateTime.fromISO(createReview.toISOString()).toFormat(
                      "yyyy/LL/dd - hh:mm"
                    )}
                  </Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
    content: {
      marginHorizontal: 15,
    },
    review: {
      paddingVertical: 20,
    },
    title: {
      fontWeight: "bold",
    },
    subtitle: {
      flex: 1,
      flexDirection: "column",
      marginTop: 5,
    },
    comment: {
      paddingRight: 50,
    },
    contentRatingDate: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 10,
    },
    starContainer: {
      height: 10,
      flex: 1,
      width: "100%",
      justifyContent: "flex-start",
    },
    date: {
      fontSize: 12,
      color: "#828282",
    },
  });
  