// Import React Hooks
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState, useEffect } from 'react';
// Import user interface elements
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
// Import components related to obtaining Android device permissions
import { PermissionsAndroid, Platform } from 'react-native';
// Import Agora SDK
import {
    createAgoraRtcEngine,
    ChannelProfileType,
    ClientRoleType,
    IRtcEngine,
    RtcConnection,
    IRtcEngineEventHandler,
} from 'react-native-agora';

const App = () => {
    const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
    const [isJoined, setIsJoined] = useState(false); // Whether the local user has joined the channel
    const [isHost, setIsHost] = useState(true); // User role
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
    const [message, setMessage] = useState(''); // User prompt message
    const eventHandler = useRef<IRtcEngineEventHandler>(); // Callback functions
    const [randString, setRandString] = useState('');

    // Define basic information
    const appId = '7b237a9b8a49470bbed958a1c5febd77';
    const token = randString;
    const channelName = 'testChannel';
    const uid = 0; // Local user Uid, no need to modify

    useEffect(() => {
        function makeid() {
            let result = '';
            const characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < 20) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            setRandString(result);
        }
        makeid();
    }, [])

    useEffect(() => {
        // Initialize the engine when the App starts
        setupVideoSDKEngine();
        // Release memory when the App is closed
        return () => {
            agoraEngineRef.current?.unregisterEventHandler(eventHandler.current!);
            agoraEngineRef.current?.release();
        };
    }, []);

    // Define the setupVideoSDKEngine method called when the App starts
    const setupVideoSDKEngine = async () => {
        try {
            // Create RtcEngine after obtaining device permissions
            if (Platform.OS === 'android') {
                await getPermission();
            }
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            eventHandler.current = {
                onJoinChannelSuccess: () => {
                    showMessage('Successfully joined channel: ' + channelName);
                    setIsJoined(true);
                },
                onUserJoined: (_connection: RtcConnection, uid: number) => {
                    showMessage('Remote user ' + uid + ' joined');
                    setRemoteUid(uid);
                },
                onUserOffline: (_connection: RtcConnection, uid: number) => {
                    showMessage('Remote user ' + uid + ' left the channel');
                    setRemoteUid(0);
                },
            };

            // Register the event handler
            agoraEngine.registerEventHandler(eventHandler.current);
            // Initialize the engine
            agoraEngine.initialize({
                appId: appId,
            });
        } catch (e) {
            console.log(e);
        }
    };

    // Define the join method called after clicking the join channel button
    const join = async () => {
        if (isJoined) {
            return;
        }
        try {
            if (isHost) {
                // Join the channel as a broadcaster
                agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                    // Set channel profile to live broadcast
                    channelProfile: ChannelProfileType.ChannelProfileCommunication,
                    // Set user role to broadcaster
                    clientRoleType: ClientRoleType.ClientRoleBroadcaster,
                    // Publish audio collected by the microphone
                    publishMicrophoneTrack: true,
                    // Automatically subscribe to all audio streams
                    autoSubscribeAudio: true,
                });
            } else {
                // Join the channel as an audience
                agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                    // Set channel profile to live broadcast
                    channelProfile: ChannelProfileType.ChannelProfileCommunication,
                    // Set user role to audience
                    clientRoleType: ClientRoleType.ClientRoleAudience,
                    // Do not publish audio collected by the microphone
                    publishMicrophoneTrack: false,
                    // Automatically subscribe to all audio streams
                    autoSubscribeAudio: true,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };
    // Define the leave method called after clicking the leave channel button
    const leave = () => {
        try {
            // Call leaveChannel method to leave the channel
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            showMessage('Left the channel');
        } catch (e) {
            console.log(e);
        }
    };

    // Render user interface
    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.head}>Agora Voice Calling Quickstart</Text>
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
                    <Text>Local user uid: {uid}</Text>
                ) : (
                    <Text>Join a channel</Text>
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

    // Display information
    function showMessage(msg: string) {
        setMessage(msg);
    }
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
    main: { flex: 1, alignItems: 'center', paddingVertical: 50 },
    scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
    scrollContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    videoView: { width: '90%', height: 200 },
    btnContainer: { flexDirection: 'row', justifyContent: 'center' },
    head: { fontSize: 20 },
});

const getPermission = async () => {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
    }
};

export default App;
