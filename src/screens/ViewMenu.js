import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Grid, Dialog, DialogContent, Button, Typography, ButtonGroup } from '@mui/material';
import Image from '../assets/Group 22.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import DialogBoxComponent from '../components/DialogBoxComponent';
import { imagePaths } from '../components/Constants'; // Update the path accordingly

class ViewMenuScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            selectedImage: null,
            currentIndex: 0,
        };
    }

    handleImageClick = (image, index) => {
        this.setState({ openDialog: true, selectedImage: image, currentIndex: index });
    };

    handleNextImage = () => {
        const { currentIndex } = this.state;
        const nextIndex = (currentIndex + 1) % imagePaths.length;
        this.setState({ selectedImage: imagePaths[nextIndex], currentIndex: nextIndex });
    };

    handlePrevImage = () => {
        const { currentIndex } = this.state;
        const prevIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
        this.setState({ selectedImage: imagePaths[prevIndex], currentIndex: prevIndex });
    };

    handleCloseDialog = () => {
        this.setState({ openDialog: false });
    };

    renderGridImages = () => {
        return imagePaths.map((path, index) => (
            <Grid item key={index} xs={4} onClick={() => this.handleImageClick(path, index)}>
                <img
                    src={path}
                    alt={`Image ${index + 1}`}
                    style={styles.gridImage}
                    loading="lazy"
                />
            </Grid>
        ));
    };

    render() {
        const { openDialog, selectedImage } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <img
                        src={Image}
                        alt="Your Image"
                        style={{
                            height: 100,
                            width: 330,
                        }}
                    />
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Link to={"/"}>
                            <Button variant='text' >
                                <Typography style={{ color: "#2c265a", fontWeight: 'bold' }}>
                                    HOME
                                </Typography>
                            </Button>
                        </Link>
                    </View>
                </View>

                <Grid container spacing={2}>
                    {this.renderGridImages()}
                </Grid>

                <DialogBoxComponent
                    open={openDialog}
                    onClose={this.handleCloseDialog}
                    selectedImage={selectedImage}
                    handlePrevImage={this.handlePrevImage}
                    handleNextImage={this.handleNextImage}
                    handleCloseDialog={this.handleCloseDialog}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    imageContainer: {
        marginBottom: 10,
        elevation: 7,
        flexDirection: 'row',
    },
    gridImage: {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
    },
    dialogImage: {
        width: '100%',
        height: 'auto',
    },
});

export default ViewMenuScreen;
