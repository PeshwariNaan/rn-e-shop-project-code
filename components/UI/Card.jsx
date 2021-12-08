import React from "react";
import { StyleSheet, View } from "react-native";

const Card = (props) => {
// The style syntax here allows us to use the styles defined in this component but also allows additional styles to be added or to override the styles here via props.
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white"
  },
});
