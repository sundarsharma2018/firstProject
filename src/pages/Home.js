import React, { useEffect, useState } from 'react';
import { openDatabase } from 'react-native-sqlite-storage'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import AuthService from '../utils/Api'
let db = openDatabase({ name: 'FirstProject112' })
export default function App() {
    const [data, setData] = useState([])
    const [dataSelected, setDataSelected] = useState([])
    useEffect(() => {
        createTable()
        fetchMethod()
    }, [])


    function createTable(){
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                (tx, res) => {
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, id VARCHAR(20), height INT(10))',
                            []
                        );
                    }
                }
            );
        });
    }

    function fetchMethod() {
        AuthService.getList().then((response) => {
            if (response)  setData(response)
        })
    }
    const renderItem = ({ item }) => {
        const { id, height } = item;
        const isSelected = dataSelected.filter((i) => i === id).length > 0
        return (
            <TouchableOpacity onPress={() => {
                if (isSelected) {
                    setDataSelected((prev) => prev.filter((i) => i !== id))
                } else {
                    setDataSelected((prev) => [...prev, id])
                    save(id, height)
                }
            }}>
                <View style={isSelected ? styles.item : styles.item1}>
                    <Text style={styles.title}>{id}</Text>
                    <Text>{height}</Text>
                </View>
            </TouchableOpacity>
        )
    };


    function save(id, height) {
        db.transaction(function (txn) {
            txn.executeSql(
                'INSERT INTO table_user(id, height) VALUES(?,?)',
                [id, height],
                (tx, results) => {
                    console.log(results)
                }
            )
        })
    }



    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
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