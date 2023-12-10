import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';
import Image from '../assets/Group 22.png';

import { getFirestore, collection, addDoc } from 'firebase/firestore';
import db from '../config';

const firestore = getFirestore(db);
const SuggestionsRef = collection(firestore, 'Suggestions');

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstInputValue: this.extractLastSegment(window.location.href),
            secondInputValue: '',
            showModal: false,
        };
    }

    componentDidMount() {
        console.log(this.props)
    }

    extractLastSegment = (url) => {
        const segments = url.split('/');
        const lastSegment = segments[segments.length - 1];
        return decodeURIComponent(lastSegment);
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

    uploadToFirebase = async (suggestion, votes, approved, description) => {
        try {
            const docRef = await addDoc(SuggestionsRef, {
                suggestion: suggestion,
                votes: votes,
                approved: approved,
                description: description,
            });
            console.log('Document written with ID: ', docRef.id);
            this.handleButtonClick();
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    handleAddItem = () => {
        this.uploadToFirebase(
            this.state.firstInputValue,
            0,
            false,
            this.state.secondInputValue
        );
    };

    render() {
        return (
            <div style={{ backgroundColor: '#c6ccf9', flex: 1 }}>
                <img
                    src={Image}
                    alt="Your Image"
                    style={{
                        height: 100,
                        width: 330,
                        transformOrigin: 'left top',
                    }}
                />
                <div style={{ padding: 20 }}>
                    <TextField
                        label="Suggestion"
                        variant="filled"
                        fullWidth
                        value={this.state.firstInputValue}
                        onChange={this.handleFirstInputChange}
                        style={{
                            marginBottom: 10,
                            borderBottom: '2px solid #000000',
                            borderTop: '0px solid #000000',
                            backgroundColor: '#c6ccf9',
                            borderRadius: 5,
                        }}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={window.screen.availHeight / 49}
                        variant="filled"
                        fullWidth
                        value={this.state.secondInputValue}
                        onChange={this.handleSecondInputChange}
                        style={{
                            marginBottom: 20,
                            height: '70%',
                            borderBottom: '2px solid #000000',
                            backgroundColor: '#c6ccf9',
                            borderLeft: '2px solid #000000',
                            borderRadius: 15,
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleAddItem}
                        style={{
                            backgroundColor: '#3c3e81',
                            borderRadius: 5,
                            marginTop: 27,
                        }}
                        fullWidth
                    >
                        Submit
                    </Button>

                    <Dialog open={this.state.showModal} onClose={this.handleModalClose}>
                        <DialogTitle>
                            Your suggestion has now been added to the verification process
                        </DialogTitle>
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

export default AddItem;
