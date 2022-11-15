import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Card } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React from 'react';
import useStyles from './styles';

const PageCard = ({ children }) => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<>
			<FuseAnimateGroup className={classes.container} animation="transition.slideUpBigIn">
				<Card className={classes.card}>
					<button className={classes.back} onClick={history.goBack}>
						&#10094; Regresar
					</button>
					<container className={classes.content}>{children}</container>
				</Card>
			</FuseAnimateGroup>
		</>
	);
};

export default PageCard;
