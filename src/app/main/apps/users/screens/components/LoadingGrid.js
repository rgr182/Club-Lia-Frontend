import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';

export default function LoadingGrid() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center mt-80 mb-80">
			<Typography className="text-20  mt-80 mb-16" color="textSecondary">
				Se está consultando la información...
			</Typography>
			<CircularProgress color="secondary" />
		</div>
	);
}
