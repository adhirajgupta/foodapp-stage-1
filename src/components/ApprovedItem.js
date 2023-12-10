import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Paper, LinearProgress, Button, Icon } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getFirestore, collection, updateDoc, query, where, getDocs, doc } from 'firebase/firestore';
import db from '../config';
const firestore = getFirestore(db);
const SuggestionsRef = collection(firestore, "Suggestions");



// ... (other imports)

const ApprovedItem = ({ approved, description, votes, progress, suggestion, onVoteCallback }) => {
	const [isExpanded, setExpanded] = useState(false);
	const [iconWidth, setIconoWidth] = useState(40)

	const updateVote = async (approved, description, votes, progress, suggestion) => {
		const querySnapshot = query(SuggestionsRef, where("suggestion", "==", suggestion), where("description", "==", description))
		const docId = (await getDocs(querySnapshot)).docs[0].id
		console.log(docId)
		await updateDoc(doc(SuggestionsRef, docId), {
			votes: parseInt(votes) + 1,
		})

		alert("Voted!")

		onVoteCallback(); // Call the callback function


	}
	if (approved) {
		return (
			<Paper elevation={0} style={styles.paper}>
				<Accordion
					TransitionProps={{ unmountOnExit: true }}
					style={styles.accordion}
					expanded={isExpanded}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
						onMouseEnter={() =>  setExpanded(true)}
						onMouseLeave={() => setExpanded(false)}
						style={styles.summary}
					>
						<Typography variant="h6" style={{ fontWeight: 'bold', marginRight: 10, marginTop: 3 }}>
							{suggestion}
						</Typography>
						<View style={{ flexDirection: "column", flex: 1, alignItems: 'center', marginTop: 7 }}>
							<LinearProgress
								variant="determinate"
								value={votes}
								style={styles.progressBar}
							/>
							<Typography style={{ opacity: 0.5, fontSize: 15, marginLeft: 'auto', marginRight: 20 }}>
								{votes} votes
							</Typography>
						</View>
						<View style={styles.progressIconContainer}>
							<View style={styles.iconBackground}>
								<img
									src={require("../assets/image2.png")}
									style={{ width: iconWidth, height: iconWidth }}
									alt='like icon'
									onClick={() => updateVote(approved, description, votes, progress, suggestion)}
								/>
							</View>
						</View>
					</AccordionSummary>
					<AccordionDetails style={{ margin: 5 }}>
						<Typography>{description}</Typography>
					</AccordionDetails>
				</Accordion>
			</Paper>
		);
	} else {
		return null;
	}
};


const styles = StyleSheet.create({
	paper: {
		backgroundColor: 'lightgray',
		margin: 20,
		marginBottom: 10,
		// marginTop: 10,
		borderRadius: 10, // Add border radius for the paper
	},
	accordion: {
		borderRadius: 10, // Add border radius for the accordion
		overflow: 'hidden', // This will hide any content that overflows from rounded corners
		opacity: 0.8,
		backgroundColor: '#DFE3FB',
		elevation: 0,
		shadowColor: '#ffffff',
		padding: 10

	},
	summary: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',

	},
	progressBar: {
		width: (0.4 * window.innerWidth),
		marginLeft: 'auto',
		marginRight: 20,
		color: '#29215d',
		backgroundColor: '#D9D9D9'
	},
	iconBackground: {
		backgroundColor: '#29215d',
		borderRadius: 999, // A large number to make it a circle
		padding: 10,
		marginTop: -3
	},
});

export default ApprovedItem;
