import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Button, ButtonGroup, TextField, Typography } from '@mui/material';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import ApprovedItem from '../components/ApprovedItem';
import { getFirestore, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import db from '../config';
import { Link, Navigate } from 'react-router-dom';
// import Image from '../assets/Group 22.png';
import ImageComponent from '../components/ImageComponent';
import { checkAndSetCookie } from '../components/Constants';

const firestore = getFirestore(db);
const SuggestionsRef = collection(firestore, 'Suggestions');
    const DeclinedRef = collection(firestore, 'Declined');

class MainScreen extends Component {
	state = {
		data: [],
		inputValue: '', // State for the input value
		go: false
	};

	componentDidMount() {
		this.getFirestoreData();
		let x = checkAndSetCookie()
		console.log(x);
	}

	getFirestoreData = async () => {
		try {
			const querySnapshot = await getDocs(SuggestionsRef);
			const list = querySnapshot.docs.map((doc) => doc.data());
			this.setState({ data: list });
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	uploadToFirebase = async (suggestion, votes, approved, description) => {
		try {
			await addDoc(SuggestionsRef, {
				suggestion: suggestion,
				votes: votes,
				approved: approved,
				description: description,
			});
			console.log('Document added successfully');
		} catch (error) {
			console.error('Error adding document: ', error);
		}
	};

	deleteAllDocuments = async () => {
		try {
			// Get all documents in the collection
			const querySnapshot = await getDocs(DeclinedRef);

			// Delete each document
			const deletePromises = [];
			querySnapshot.forEach((doc) => {
				deletePromises.push(deleteDoc(doc.ref));
			});

			// Wait for all delete operations to complete
			await Promise.all(deletePromises);

			console.log('All documents deleted successfully.');
		} catch (error) {
			console.error('Error deleting documents:', error);
		}
	}


	handleVoteCallback = () => {
		console.log('executed handleVoteCallback');
		this.forceUpdate(this.componentDidMount()); // or any other logic you want to execute after voting
	};

	render() {
		const { inputValue, data } = this.state;
		// if (data.length) {
		return (
			<View style={styles.container}>

				<ImageComponent screen={"/"} />

				<ScrollView style={styles.scrollView}>
					<Typography style={{ fontWeight: 'bold', fontSize: 25, padding: 10 }}>
						The official TISB food feedback portal. Vote for existing ideas or post your own idea. The top idea every month will be submitted to the
						TISB Food Council.
					</Typography>
					{data.length ? data.map((val, index) => (
						<ApprovedItem key={index} {...val} onVoteCallback={this.handleVoteCallback} />
					)) : (
						<>
						<ActivityIndicator/>
						<Typography>Loading...</Typography>
						</>
					)}
					<div style={{ marginBottom: 20 }}></div>
				</ScrollView>
				<View style={styles.semiCircleInput}>
					<TextField
						style={styles.textField}
						label="Enter item here"
						variant="outlined"
						value={inputValue}
						onKeyDown={(event) => {
							// event.preventDefault()
							if (event.key == 'Enter') {
								console.log("executed")
								this.setState({ go: true })
							}
						}}
						onChange={(text) => {
							this.setState({ inputValue: text.target.value });
						}}
					/>
						<Link to={inputValue ? `/add/${inputValue}` : ``}   >
							<SendSharpIcon style={{color:'white'}}/>
						</Link>
				</View>
				{this.state.go & inputValue != '' && (
					<Navigate to={`/add/${inputValue}`} />
				)}

			</View>
		);
		// } else return <ActivityIndicator />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 0.8,
		backgroundColor: '#c6ccf9',
		minHeight: '100vh'
	},
	scrollView: {
		flex: 0.2,
		paddingBottom: 50,
		marginBottom: 20
	},
	imageContainer: {
		marginBottom: 10,
		elevation: 7,
		flexDirection: 'row'
	},
	semiCircleInput: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#28215a', // Set the background color of the container
		position: 'fixed',
		bottom: 0, // Keep the input container at the bottom
		width: '100%',
	},
	textField: {
		width: '97%',
		margin: 5,
		// backgroundColor:"#28215a",
		borderRadius: 6,
		borderColor: 'white',
		color: 'white',
		backgroundColor:'#c6ccf9',
		borderWidth:2


	},
});

export default MainScreen;
