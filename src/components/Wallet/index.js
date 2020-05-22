import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import AddBank from './AddBank';
import SelectAction from './SelectAction';
import SelectBank from './SelectBank';
import Amount from './Amount';
import Confirm from './Confirm';
import Success from './Success';
import { fetchBalance, fetchBanks, addBank } from '../../actions';

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	outerContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	formControl: {
		fullWidth: true,
		display: 'flex',
		wrap: 'nowrap',
	},
}));

const Wallet = (props) => {
	const {
		access_token,
		fetchBalance,
		fetchBanks,
		addBank,
		banks,
		balance,
	} = props;
	const [step, setStep] = useState(0);
	const [mode, setMode] = useState('withdraw'); // Modes can either be withdraw or deposit
	const [bank, setBank] = useState({});
	const [fetched, setFetched] = useState(false);
	const [amount, setAmount] = useState(0);
	const classes = useStyles();

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	const setModeDeposit = () => {
		setMode('deposit');
		nextStep();
	};

	const setModeWithdraw = () => {
		setMode('withdraw');
		nextStep();
	};

	useEffect(() => {
		// 1. If the banks havent been fetched and put in store->user->banks, then do so
		(async () => {
			if (!fetched) {
				await fetchBanks();
				setFetched(true);
			}
		})();

		// 2. If there are banks, and one hasn't been selected, choose the last one in store->user->banks
		if (fetched && banks.length === 0) setStep(-1);
	}, [fetched, fetchBanks, banks]);

	// At step 0, let them decide if the want to deposit/withdraw
	// Depending on their decision, set the type (need to pass in from TabPanel)

	const walletState = { bank: bank, amount: amount, mode: mode };

	const renderStep = () => {
		switch (step) {
			case -1:
				return (
					<AddBank
						classes={classes}
						nextStep={nextStep}
						addBank={addBank}
						walletState={walletState}
					/>
				);

			case 0:
				return (
					<SelectAction
						setModeDeposit={setModeDeposit}
						setModeWithdraw={setModeWithdraw}
						prevStep={prevStep}
					/>
				);

			case 1:
				return (
					<SelectBank
						prevStep={prevStep}
						nextStep={nextStep}
						setBank={setBank}
						walletState={walletState}
						banks={banks}
						classes={classes}
					/>
				);

			case 2:
				return (
					<Amount
						nextStep={nextStep}
						prevStep={prevStep}
						setAmount={setAmount}
						walletState={walletState}
						balance={balance}
						classes={classes}
					/>
				);

			case 3:
				return (
					<Confirm
						nextStep={nextStep}
						prevStep={prevStep}
						walletState={walletState}
						access_token={access_token}
					/>
				);

			case 4:
				return (
					<Success
						fetchBalance={fetchBalance}
						setStep={setStep}
						walletState={walletState}
					/>
				);

			default:
		}
	};

	return <>{renderStep()}</>;
};

const mapStateToProps = (state) => {
	return {
		access_token: state.auth.access_token,
		banks: state.user.banks,
		balance: state.user.balance,
	};
};

export default connect(mapStateToProps, { fetchBalance, fetchBanks, addBank })(
	Wallet
);
