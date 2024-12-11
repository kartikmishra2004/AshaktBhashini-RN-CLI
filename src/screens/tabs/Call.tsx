// Import React Hooks
import React, { useRef, useState, useEffect } from 'react';
// Import user interface elements
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, PermissionsAndroid, Platform } from 'react-native';
// Import Agora SDK
import {
    createAgoraRtcEngine,
    ChannelProfileType,
    ClientRoleType,
    IRtcEngine,
    RtcConnection,
    IRtcEngineEventHandler,
} from 'react-native-agora';

const App: React.FC = () => {
    const agoraEngineRef = useRef<IRtcEngine>();
    const [isJoined, setIsJoined] = useState(false);
    const [remoteUid, setRemoteUid] = useState(0);
    const [message, setMessage] = useState('');
    const [channelName, setChannelName] = useState('testChannel');

    const appId = '7b237a9b8a49470bbed958a1c5febd77'; // Replace with your Agora App ID
    const token = '007eJxTYNB0XLCcZ8a7M/LfXV8lnv3Js1DqeNzDpimOpkq10T+0LIIVGMyTjIzNEy2TLBJNLE3MDZKSUlMsTS0SDZNN01KTUszNndMj0xsCGRl0NDqYGBkgEMTnZihJLS5xzkjMy0vNYWAAACQEIV4=';
    const uid = Math.floor(Math.random() * 1000000); // Generate a random UID

    useEffect(() => {
        // Initialize Agora SDK
        setupVideoSDKEngine();
        return () => {
            agoraEngineRef.current?.release();
        };
    }, []);

    const setupVideoSDKEngine = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    showMessage('Microphone permission not granted');
                    return;
                }
            }
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;

            agoraEngine.initialize({
                appId: appId,
            });

            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: (connection) => {
                    showMessage(`Successfully joined channel: ${connection.channelId}`);
                    setIsJoined(true);
                },
                onUserJoined: (connection, uid) => {
                    showMessage(`Remote user ${uid} joined`);
                    setRemoteUid(uid);
                },
                onUserOffline: (connection, uid) => {
                    showMessage(`Remote user ${uid} left the channel`);
                    setRemoteUid(0);
                },
                onError: (err) => {
                    console.error('Agora error:', err);
                },
            });
        } catch (err) {
            console.error('SDK setup error:', err);
        }
    };

    const join = () => {
        if (isJoined) return;
        try {
            const agoraEngine = agoraEngineRef.current;
            agoraEngine?.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);
            agoraEngine?.setClientRole(ClientRoleType.ClientRoleBroadcaster);
            agoraEngine?.enableAudio(); // Enable audio track

            agoraEngine?.joinChannel(token, channelName, uid, {
                publishMicrophoneTrack: true,
                autoSubscribeAudio: true,
            });
        } catch (err) {
            console.error('Join error:', err);
        }
    };

    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setIsJoined(false);
            setRemoteUid(0);
            showMessage('Left the channel');
        } catch (err) {
            console.error('Leave error:', err);
        }
    };

    const showMessage = (msg: string) => {
        setMessage(msg);
        console.log(msg);
    };

    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.head}>Agora Voice Calling Quickstart</Text>
            <TextInput
                style={styles.input}
                value={channelName}
                onChangeText={setChannelName}
                placeholder="Enter Channel Name"
            />
            <View style={styles.btnContainer}>
                <Text onPress={join} style={styles.button}>
                    Join Channel
                </Text>
                <Text onPress={leave} style={styles.button}>
                    Leave Channel
                </Text>
            </View>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContainer}>
                {isJoined ? (
                    <Text>Connected to channel: {channelName}</Text>
                ) : (
                    <Text>Not connected. Please join a channel.</Text>
                )}
                {isJoined && remoteUid !== 0 ? (
                    <Text>Remote user uid: {remoteUid}</Text>
                ) : (
                    <Text>Waiting for remote user to join</Text>
                )}
                <Text>{message}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

// Define user interface styles
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 25,
        paddingVertical: 4,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#0055cc',
        margin: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        margin: 10,
        width: '90%',
    },
    main: { flex: 1, alignItems: 'center', paddingVertical: 50 },
    scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
    scrollContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    btnContainer: { flexDirection: 'row', justifyContent: 'center' },
    head: { fontSize: 20 },
});

export default App;
