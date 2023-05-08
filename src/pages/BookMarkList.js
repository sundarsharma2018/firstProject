import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
var db = openDatabase({ name: 'FirstProject112' });
export const BookMark = () => {
    const [saveData, setSaveData] = useState([])
    useEffect(() => {
        fetchLocalDb()
    }, [])


    function fetchLocalDb(){
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_user',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                        setSaveData(temp);
                    }
                })
        })
    }



    const renderItem = ({ item }) => {
        const { id, height } = item;
        return (
            <TouchableOpacity >
                <View style={styles.item}>
                    <Text style={styles.title}>{id}</Text>
                    <Text>{height}</Text>
                </View>
            </TouchableOpacity>
        )
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={saveData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    },
    item: {
        backgroundColor: '#f5f520',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    header: {
        backgroundColor: 'red',
        padding: 10,
        fontSize: 20
    },
    item1: {
        backgroundColor: 'red',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        color: '#000000',
        fontSize: 20
    },
});