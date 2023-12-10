import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Box, LinearProgress, Paper } from '@mui/material';

const hideForm = () => {
    console.log('hide form');
};

const FormOverlay = () => {
    return (
        <View style={styles.formOverlay}>
            <TouchableOpacity onPress={() => hideForm()} style={styles.sphere}>
                <Text style={styles.sphereText}>Click</Text>
            </TouchableOpacity>
            {/* Render your form components here */}
        </View>
    );
};

const styles = {
    formOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        color: 'red',
    },
    sphere: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    sphereText: {
        color: 'white',
        fontSize: 20,
    },
};

export default FormOverlay;
