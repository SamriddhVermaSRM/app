import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import dp from './assets/dp.jpg';
import { useState } from 'react';
import dataJson from './data.json';

import React from 'react';
import PDFView from 'react-native-view-pdf';


const Stack = createNativeStackNavigator();

function App() {
    return (
        <>
            {/* <PDFExample /> */}
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Home" component={Home} />
                    {/* <Stack.Screen name="PDF" component={PDFViewComponent} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleLogin = () => {
        let flag = false;
        dataJson.data.map((key, index) => {
            if (dataJson.data[index].username === email && dataJson.data[index].password === password) {
                console.log('Logged in');
                console.log(index);
                user(index);
                flag = true;
                navigation.navigate('Home');
            }
        });
        flag === false ? alert('Invalid email or password') : console.log('Logged in');
    }

    const style = {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <View style={styles.input}>
                <TextInput placeholder="Enter your email" onChangeText={newText => setEmail(newText)} style={style} />
                <TextInput placeholder="Enter your password" onChangeText={newText => setPassword(newText)} style={style} />
            </View>
            <View style={styles.buttonLogin}><Button color={"red"} title="Login" onPress={handleLogin} /></View>
        </View>
    );
}

function Home({ navigation }) {
    const log = (hihi) => {
        console.log(hihi);
    }
    return (
        <View style={styles.home}>
            <View style={styles.header}>
                <Image source={dp} style={styles.image} />
                <Text style={{ fontSize: 20 }}>Welcome {dataJson.data[user(null)].name}</Text>
            </View>
            <Text style={{ fontSize: 36, padding: 10, textDecorationStyle: 'solid' }}>Brainwave Reports</Text>
            <View style={styles.table}>
                <View style={styles.tr}>
                    <Text style={styles.tch}>Date</Text>
                    <Text style={styles.tch}>Data</Text>
                </View>
                {dataJson.data[user(null)].data.map((key, index) => {
                    return (
                        <View style={styles.tr}>
                            <Text key={key} style={styles.tc}>{dataJson.data[user(null)].data[index].date}</Text>
                            <View style={styles.tc}>
                                <Button
                                    style={styles.databtn}
                                    key={(key) * 100}
                                    title={dataJson.data[user(null)].data[index].pdf}
                                    onPress={() => {
                                        log(dataJson.data[user(null)].data[index].pdf);
                                        navigation.navigate('PDF');
                                    }}
                                >

                                </Button>
                            </View>
                        </View>
                    );
                }
                )}
            </View>
        </View>
    );
}








function PDFExample() {
    const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    return (
        <View style={{ flex: 1 }}>
            {/* Some Controls to change PDF resource */}
            <PDFView
                style={{ flex: 1 }}
                resource={url}
                resourceType={url}
                onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                onError={(error) => console.log('Cannot render PDF', error)}
            />
        </View>
    );
}






let random = 0;
function user(heyo) {
    if (heyo !== null) {
        random = heyo;
        return random;
    }
    return random;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 15,
    },
    databtn: {
        flex: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        color: 'transparent',
    },
    table: {
        flex: 1,
        margin: 20,
    },
    tr: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tch: {
        width: '50%',
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        fontWeight: 'bold',
    },
    tc: {
        width: '50%',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    header: {
        height: 100,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        width: 60,
        height: 60,
        margin: 20,
    },
    home: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 50,
        color: 'red',
    },
    statusbar: {
        background: 'pink',
    },
    buttonLogin: {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        color: 'pink',
        margin: 10,
    },
});

export default App;