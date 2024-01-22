import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import DialogBoxComponent from '../components/DialogBoxComponent';
import { imagePaths, extractLastSegment, checkInputPrompt } from '../components/Constants';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import db from '../config';
import { StyleSheet } from 'react-native';

const firestore = getFirestore(db);
const SuggestionsRef = collection(firestore, 'Suggestions');
const weeksOptions = ['Week 1', 'Week 2', 'Week 3'];
const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealsOptions = ['Breakfast', 'Lunch', 'Dinner'];

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstInputValue: extractLastSegment(window.location.href),
            secondInputValue: '',
            showModal: false,
            showImageDialog: false,
            openDialog: false,
            selectedImage: imagePaths[0],
            currentIndex: 0,
            enableDropdowns: false,
            dropdownValues: {
                dropdown1: '',
                dropdown2: '',
                dropdown3: '',
            },
        };
    }

    componentDidMount() {
        console.log(this.props);
    }

    handleFirstInputChange = (event) => {
        this.setState({
            firstInputValue: event.target.value,
        });
    };

    handleSecondInputChange = (event) => {
        this.setState({
            secondInputValue: event.target.value,
        });
    };

    handleButtonClick = () => {
        this.setState({
            showModal: true,
        });
    };

    handleModalClose = () => {
        this.setState({
            showModal: false,
        });
    };

    handleImageDialog = (show) => {
        this.setState({ showImageDialog: show, openDialog: true });
    };

    handleImageClick = (image, index) => {
        this.setState({ openDialog: true, selectedImage: image, currentIndex: index });
    };

    handleNextPrevImage = (direction) => {
        const { currentIndex } = this.state;
        const nextIndex =
            direction === 'next' ? (currentIndex + 1) % imagePaths.length : (currentIndex - 1 + imagePaths.length) % imagePaths.length;
        this.setState({ selectedImage: imagePaths[nextIndex], currentIndex: nextIndex });
    };

    handleCloseDialog = () => {
        this.setState({ openDialog: false, showImageDialog: false });
    };

    handleRadioChange = () => {
        // Toggle the enableDropdowns state and set dropdown values to an empty object
        this.setState((prevState) => ({
            enableDropdowns: !prevState.enableDropdowns,
            dropdownValues: !prevState.enableDropdowns ? prevState.dropdownValues : { dropdown1: '', dropdown2: '', dropdown3: '' },
        }));
    };

    handleDropdownChange = (dropdownName, event) => {
        this.setState((prevState) => ({
            dropdownValues: {
                ...prevState.dropdownValues,
                [dropdownName]: event.target.value,
            },
        }));
    };

    uploadToFirebase = async (suggestion, votes, approved, description) => {
        try {
            const { enableDropdowns, dropdownValues } = this.state;

            const data = {
                suggestion: suggestion,
                votes: votes,
                approved: approved,
                description: description,
                replacement: enableDropdowns,
            };

            if (enableDropdowns) {
                data.week = dropdownValues.dropdown1;
                data.day = dropdownValues.dropdown2;
                data.meal = dropdownValues.dropdown3;
            }

            const docRef = await addDoc(SuggestionsRef, data);
            console.log('Document written with ID: ', docRef.id);
            this.handleButtonClick();
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };




    handleAddItem = () => {
        if (checkInputPrompt(this.state.firstInputValue) && checkInputPrompt(this.state.secondInputValue)) {
            console.log(checkInputPrompt(this.state.firstInputValue),this.state.firstInputValue)
            this.uploadToFirebase(this.state.firstInputValue, 0, false, this.state.secondInputValue);
        } else {
            alert("This language is not allowed","Please use polite language to voice your concern")
        }
    };

    renderDropdownOptions = (options) => {
        return options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ));
    };



    render() {
        return (
            <div style={styles.container}>
                <ImageComponent screen={'menu'} showImageDialog={this.handleImageDialog} />
                <div style={{ padding: 20 }}>
                    <TextField
                        label="Suggestion"
                        variant="filled"
                        fullWidth
                        value={this.state.firstInputValue}
                        onChange={this.handleFirstInputChange}
                        style={styles.textField}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={10}
                        variant="filled"
                        fullWidth
                        value={this.state.secondInputValue}
                        onChange={this.handleSecondInputChange}
                        style={styles.multilineTextField}
                    />

                    <div style={styles.radioGroup}>
                        <FormControlLabel
                            control={<Radio checked={this.state.enableDropdowns} onChange={this.handleRadioChange} onClick={() => this.setState({ enableDropdowns: false })} />}
                            label="This is a replacement/improvement on an existing item"
                        />
                    </div>

                    {this.state.enableDropdowns && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Select
                                value={this.state.dropdownValues.dropdown1}
                                onChange={(event) => this.handleDropdownChange('dropdown1', event)}
                                style={styles.dropdown}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Week
                                </MenuItem>
                                {this.renderDropdownOptions(weeksOptions)}
                            </Select>

                            <Select
                                value={this.state.dropdownValues.dropdown2}
                                onChange={(event) => this.handleDropdownChange('dropdown2', event)}
                                style={styles.dropdown}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Day
                                </MenuItem>
                                {this.renderDropdownOptions(daysOptions)}
                            </Select>

                            <Select
                                value={this.state.dropdownValues.dropdown3}
                                onChange={(event) => this.handleDropdownChange('dropdown3', event)}
                                style={styles.dropdown}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Meal
                                </MenuItem>
                                {this.renderDropdownOptions(mealsOptions)}
                            </Select>
                        </div>
                    )}


                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleAddItem}
                        style={styles.button}
                        fullWidth
                    >
                        Submit
                    </Button>

                    <DialogBoxComponent
                        open={this.state.openDialog}
                        onClose={this.handleCloseDialog}
                        selectedImage={this.state.selectedImage}
                        handleNextImage={() => this.handleNextPrevImage('next')}
                        handlePrevImage={() => this.handleNextPrevImage('')}
                        handleCloseDialog={this.handleCloseDialog}
                    />

                    <Dialog open={this.state.showModal} onClose={this.handleModalClose}>
                        <DialogTitle>Your suggestion has now been added to the verification process</DialogTitle>
                        <DialogActions>
                            <Link to="/">
                                <Button style={{ color: '#3c3e81' }}>Ok</Button>
                            </Link>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#c6ccf9',
        flex: 1,
        minHeight: '100vh',  // Ensure that the purple background covers the entire screen
    },
    textField: {
        marginBottom: 10,
        borderBottom: '2px solid #000000',
        borderTop: '0px solid #000000',
        backgroundColor: '#c6ccf9',
        borderRadius: 5,
    },
    multilineTextField: {
        marginBottom: 20,
        height: '30%',
        borderBottom: '2px solid #000000',
        backgroundColor: '#c6ccf9',
        borderLeft: '2px solid #000000',
        borderRadius: 15,
    },
    button: {
        backgroundColor: '#3c3e81',
        borderRadius: 5,
        marginTop: 27,
    },
    radioGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-evenly'
    },
    radioLabel: {
        marginLeft: 10,
    },
    dropdown: {
        width: '30%',
        marginBottom: 20,
    },
};

export default AddItem;
