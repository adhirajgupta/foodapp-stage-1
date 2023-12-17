import React from 'react';
import { View } from 'react-native';
import { ButtonGroup, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Image from '../assets/Group 22.png';
import DialogBoxComponent from './DialogBoxComponent';

const ImageComponent = ({ screen, showImageDialog }) => {
    return (
        <View style={{ marginBottom: 10, elevation: 7, flexDirection: 'row' }}>
            <img
                src={Image}
                style={{
                    height: 100,
                    width: 330,
                }}
            />
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                {screen === '/' ? (
                    // Render the buttons for the "/" screen
                    <ButtonGroup>
                        <Link to={`/menu/week1}`}>
                            <Button variant='text' >
                                <Typography style={{ color: "#2c265a", fontWeight: 'bold' }}>
                                    Week 1
                                </Typography>
                            </Button>
                        </Link>
                        <Button variant='text'>
                            <Typography style={{ color: "#2c265a", fontWeight: 'bold' }}>
                                Week 2
                            </Typography>
                        </Button>
                        <Button variant='text'>
                            <Typography style={{ color: "#2c265a", fontWeight: 'bold' }}>
                                Week 3
                            </Typography>
                        </Button>
                    </ButtonGroup>
                ) : screen === 'menu' ? (
                    // Render the buttons and handle button press for the "menu" screen
                    <ButtonGroup>
                        <Button variant='text' onClick={() => showImageDialog(true)}>
                            <Typography style={{ color: "#2c265a", fontWeight: 'bold' }}>
                                Week 1
                            </Typography>
                        </Button>
                        <Button variant='text' onClick={() => showImageDialog(true)}>
                            <Typography style={{ color: "#2c265a", fontWeight: 'bold' }}>
                                Week 2
                            </Typography>
                        </Button>
                        <Button variant='text' onClick={() => showImageDialog(true)}>
                            <Typography style={{ color: "#2c265a", fontWeight: 'bold' }}>
                                Week 3
                            </Typography>
                        </Button>
                    </ButtonGroup>
                ) : null}
            </View>
            {/* Render the DialogBoxComponent based on the state */}
            <DialogBoxComponent onClose={() => showImageDialog(false)} />
        </View>
    );
};

export default ImageComponent;
