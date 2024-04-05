import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import dp from './assets/dp.jpg';
import { useState } from 'react';
import dataJson from './data.json';

import thing0 from './assets/0.jpg';
import thing1 from './assets/1.jpg';
import thing2 from './assets/2.jpg';

import React from 'react';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <>
            {/* <PdfViewer /> */}
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="PdfViewer" component={PdfViewer} />
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
                                    title={"pdf"}
                                    onPress={() => {
                                        navigation.navigate('PdfViewer', { pdfnum: index });
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



function PdfViewer({ navigation, route }) {

    const style = {
        pdf: {
            flex: 1,
        },
        top: {
            height: 200,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'black',
            borderStyle: 'solid',
        },
        csr: {
            height: '100%',
            width: '40%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: 20,
            gap: 10,
            backgroundColor: 'pink',
        },
        csrtext: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        pd: {
            height: '100%',
            width: '60%',
            justifyContent: 'space-around',
            padding: 5,
            flexDirection: 'column',
            gap: 10,
            backgroundColor: 'purple'
        },
        ashw: {
            flexDirection: 'row',
            gap: 10,
        },
        graph: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            margin: 5,
            borderWidth: 1,
            borderColor: 'black',
            borderStyle: 'solid',
            backgroundColor: 'lightgrey',
        },
        pdh: {
            flexDirection: 'column',
        },
        pdhh: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        text: {
            fontSize: 15,
        },
        image: {
            height: 200,
            width: 400,
            margin: 10,
        },
        heading: {
            fontSize: 35,
            fontWeight: 'bold',
        },
    };

    const pdfnum = route.params.pdfnum;

    const thing = [thing0, thing1, thing2];

    return (
        <View style={style.pdf}>
            <View style={style.top}>
                <View style={style.csr}>
                    <Text style={style.csrtext}>COGNITIVE</Text>
                    <Text style={style.csrtext}>STATE</Text>
                    <Text style={style.csrtext}>REPORT</Text>
                </View>
                <View style={style.pd}>
                    <Text style={style.pdhh}>Patient Name</Text>
                    <Text style={style.text}>{dataJson.data[user(null)].name}</Text>
                    <Text style={style.pdhh}>Date Of Examination</Text>
                    <Text style={style.text}>{dataJson.data[user(null)].data[pdfnum].date}</Text>
                    <View style={style.ashw}>




                        <View style={style.pdh}>
                            <Text style={style.pdhh}>Age:</Text>
                            <Text style={style.text}>{dataJson.data[user(null)].data[pdfnum].age}</Text>
                        </View>
                        <View style={style.pdh}>
                            <Text style={style.pdhh}>Sex:</Text>
                            <Text style={style.text}>{dataJson.data[user(null)].data[pdfnum].sex}</Text>
                        </View>
                        <View style={style.pdh}>
                            <Text style={style.pdhh}>Height:</Text>
                            <Text style={style.text}>{dataJson.data[user(null)].data[pdfnum].height}</Text>
                        </View>
                        <View style={style.pdh}>
                            <Text style={style.pdhh}>Weight:</Text>
                            <Text style={style.text}>{dataJson.data[user(null)].data[pdfnum].weight}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Text style={style.heading}>Brain Wave Content Present</Text>
                <View>
                    <View style={style.graph}>
                        <Text>Alpha</Text>
                        <Text>{dataJson.data[user(null)].data[pdfnum].alpha}</Text>
                    </View>
                    <View style={style.graph}>
                        <Text>Beta</Text>
                        <Text>{dataJson.data[user(null)].data[pdfnum].beta}</Text>
                    </View>
                    <View style={style.graph}>
                        <Text>Delta</Text>
                        <Text>{dataJson.data[user(null)].data[pdfnum].delta}</Text>
                    </View>
                    <View style={style.graph}>
                        <Text>Theta</Text>
                        <Text>{dataJson.data[user(null)].data[pdfnum].theta}</Text>
                    </View>
                </View>
            </View>
            <View>
                <View>
                    <Text style={style.heading}>Comments</Text>
                    <Text style={style.text}>{dataJson.data[user(null)].data[pdfnum].comment}</Text>
                </View>
                <View>
                    <Text style={style.heading}>Scale</Text>
                    <Text style={style.text}>8-13hz = Alpha</Text>
                    <Text style={style.text}>&#62;13hz = Beta</Text>
                    <Text style={style.text}>1-4hz = Delta</Text>
                    <Text style={style.text}>4-8hz = Theta</Text>
                </View>
            </View>
            <View>
                <Image source={thing[pdfnum]} style={style.image} />
            </View>
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