import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function GalaxyIsland({ buttonClass, textClass, opacity, onClick, imageSrc, label }) {
	return (
		<div style={{ opacity }}>
			<Button
				disableRipple
				className={clsx(buttonClass)}
				style={{ backgroundColor: 'transparent' }}
				onClick={onClick}
				type="button"
			>
				<img src={imageSrc} className="float" />
			</Button>
			<Button disableRipple style={{ backgroundColor: 'transparent' }} onClick={onClick} color="secondary">
				<Typography className={clsx(textClass)}>{label}</Typography>
			</Button>
		</div>
	);
}

GalaxyIsland.propTypes = {
	buttonClass: PropTypes.object,
	textClass: PropTypes.object,
	opacity: PropTypes.number,
	onClick: PropTypes.func,
	imageSrc: PropTypes.string,
	label: PropTypes.string
};

GalaxyIsland.defaultProps = {
	buttonClass: {},
	textClass: {},
	opacity: 1,
	onClick: () => {},
	imageSrc: '',
	label: ''
};
