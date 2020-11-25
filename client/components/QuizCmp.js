import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacityBase,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';

import FlipCard from 'react-native-flip-card';
import Icon from 'react-native-vector-icons/EvilIcons';

const QuizCmp = () => {
    const [quiz, setQuiz] = useState();

    useEffect(() => {
      const get_data = async () => {
        var axios = require('axios');
        var data = '';

        var config = {
        method: 'get',
        url: 'http://220.79.31.179:8000/api/user/quiz',
        headers: {},
        data: data,
        };

        await axios(config)
        .then(function (response) {
            setQuiz(response.data.quiz);
        })
        .catch(function (error) {
            console.log(error);
        });
      }
      get_data();
    }, []);

    const renderitem = ({item, index}) => {
        return (
          <FlipCard
            style={styles.card}
            friction={4}
            perspective={1000}
            flipHorizontal={false}
            flipVertical={true}
            flip={false}
            clickable={true}
          >
              <View style={styles.item}>
                  <Text style={styles.title}>{item.class_name}</Text>
                  <Text>{item.title}</Text>
              </View>

              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text>{item.due_date}</Text>
                <Text>
                  {item.grade === "" ? (
                    "0.00/0.00"
                  ): (
                    item.grade
                  )}
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.linkbtn}>
                  <Text style={styles.linktext}>
                    <Icon name="link" size={25} style={{alignItems: "center"}}/>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
          </FlipCard>
        );
    };
    return (
        <View style={styles.container}>
          <FlatList
            data={quiz}
            renderItem={renderitem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop: 15,
      paddingRight: 15,
      paddingLeft: 15,
    },

    item: {
      padding: 5,
    },

    card: {
      backgroundColor: "white",
      borderRadius: 15,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 4,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 10,
    },
    
    linkbtn: {
      marginTop: 10,
      backgroundColor: "#0081ff",
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
    },

    linktext: {
      color: "white"
    },

    title: {
      fontSize: 16,
      paddingBottom: 10,
      fontWeight: "bold",
    },
  });

export default QuizCmp
