import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator,ScrollView } from 'react-native';
import { TextField } from '@mui/material';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import ApprovedItem from '../components/ApprovedItem';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import db from '../config';
import { Link } from 'react-router-dom';
import Image from '../assets/Group 22.png';

const firestore = getFirestore(db);
const SuggestionsRef = collection(firestore, 'Suggestions');

class MainScreen extends Component {
	state = {
		data: [],
		inputValue: '', // State for the input value
	};

	componentDidMount() {
		this.getFirestoreData();
		console.log(this.props);
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

	handleAddItem = () => {
		const { inputValue, data } = this.state;
		const newItem = {
			progress: 0,
			suggestion: inputValue,
			approved: true,
			votes: 0,
			description: '',
		};

		const updatedData = [...data, newItem];
		this.setState({ data: updatedData, inputValue: '' });

		this.uploadToFirebase(inputValue, 0, false, '');
	};

	handleVoteCallback = () => {
		console.log("executed handleVoteCallback")
		this.forceUpdate(this.componentDidMount()); // or any other logic you want to execute after voting
	}

	render() {
		const { inputValue, data } = this.state;
		if (data.length) {
			return (
				<ScrollView style={{ flex: 1, backgroundColor: '#c6ccf9' }}>
					<View style={styles.imageContainer}>
						<img
							src={Image}
							alt="Your Image"
							style={{
								// transform: 'scale(0.25)',
								height: 100,
								width: 330,
								transformOrigin: 'left top',
							}}
						/>
					</View>

					{data.map((val, index) => (
						<ApprovedItem key={index} {...val} onVoteCallback={this.handleVoteCallback} />
					))}
						
					<View style={styles.semiCircleInput}>
						<TextField
							onKeyDown={(ev) => {
								if (ev.key === 'Enter') {
									// this.handleAddItem();
									console.log(window.window.innerHeight);
									ev.preventDefault();
								}
							}}
							style={{ width: '97%', margin: 5 }}
							label="Enter item here"
							variant="filled"
							value={inputValue}
							onChange={(text) => {
								this.setState({ inputValue: text.target.value });
							}}
						/>
						<Link to={`/add/${inputValue}`}>
							<SendSharpIcon />
						</Link>
					</View>
				</ScrollView>
			);
		} else return <ActivityIndicator />;
	}
}

const styles = StyleSheet.create({
	imageContainer: {
		marginBottom: 10,
		elevation: 7,

	},
	semiCircleInput: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		
		// position: 'absolute',
		// top: window.window.innerHeight - 0.06 * window.window.innerHeight,
		// bottom: 0,
		// width: '100%',
		// backgroundColor: 'red',
		// height:100
	},
});

export default MainScreen;
