import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	footer: {
		backgroundColor: '#4249F8',
	},
	textWhite: {
		color: '#fff !important',
		textDecoration: 'none !important',
		fontFamily: 'poppins',
		fontSize: '16px',
		textTransform: 'none',
		fontWeight: 'normal',
	},
	hoverBlack: {		
		'& svg:hover path': {
			fill: '#26262c'
		},
	},
	hoverBlackCircle: {
		'& svg:hover circle': {
			fill: '#26262c'
		}
	},
}));

function Footer(props) {
	const classes = useStyles(props);
	//const footerTheme = useSelector(selectFooterTheme);
	var today = new Date();
	var year = today.getFullYear();


	return (
		<div>
			<AppBar id="fuse-footer" className="relative z-10">
				<Toolbar className={clsx(classes.footer, 'flex flex-wrap w-full flex-row poppins items-center justify-center text-center')}>
					<div className='w-full sm:w-1/5 md:w-1/3'></div>
					<div className='w-full sm:w-3/5 md:w-1/3 flex flex-wrap pt-60 md:px-0 lg:px-60 xs:px-60'>
						<div className='w-full flex text-center items-center justify-center mb-20'>
							<Icon className='pr-12'>
								<svg width="1em" height="1em" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M14.2949 26.9996C13.767 26.9996 13.2406 26.9996 12.7126 26.9996C12.6266 26.9845 12.5422 26.9649 12.4562 26.9528C11.9599 26.8864 11.4607 26.8472 10.9704 26.7537C8.02006 26.1835 5.5252 24.7835 3.50397 22.5629C1.7467 20.632 0.644078 18.3722 0.206648 15.7941C0.12067 15.2947 0.0678771 14.7894 0 14.287C0 13.759 0 13.2326 0 12.7046C0.0165922 12.611 0.0346927 12.519 0.0482682 12.4255C0.113128 11.9382 0.152346 11.4464 0.245866 10.9652C0.803966 8.08087 2.13737 5.60685 4.30793 3.62763C7.64749 0.578857 11.5828 -0.545012 16.0296 0.243959C18.9603 0.764408 21.4507 2.16434 23.4432 4.37286C26.2518 7.4865 27.4103 11.1583 26.8718 15.3174C26.4555 18.5366 25.0044 21.2565 22.6136 23.456C20.6769 25.2376 18.4022 26.3509 15.8048 26.7944C15.304 26.8774 14.7987 26.9317 14.2949 26.9996ZM6.39855 9.60752C6.3729 10.6846 6.64291 11.371 6.93402 12.0499C7.67313 13.7771 8.75313 15.2721 10.0715 16.5981C11.8076 18.342 13.7851 19.7027 16.1759 20.3967C17.0749 20.6576 17.9437 20.5792 18.7899 20.1779C19.4174 19.8807 19.8714 19.3754 20.3511 18.9002C20.7055 18.5487 20.7055 18.2575 20.3541 17.903C19.5742 17.1171 18.7914 16.3341 18.007 15.5527C17.6586 15.2057 17.3569 15.2088 17.0085 15.5587C16.5801 15.9887 16.1593 16.4247 15.7309 16.8531C15.2211 17.3615 14.6056 17.4037 14.0174 16.9828C12.5045 15.9012 11.1922 14.6159 10.0805 13.1239C9.61592 12.5009 9.65514 11.905 10.2012 11.3529C10.6401 10.9094 11.0851 10.4719 11.524 10.0284C11.8544 9.69351 11.8589 9.39632 11.5316 9.06595C10.7397 8.26793 9.94324 7.47292 9.14531 6.68094C8.82553 6.36263 8.52687 6.36414 8.20257 6.6749C7.9552 6.91174 7.71536 7.15613 7.47553 7.40202C6.7862 8.10048 6.41816 8.94074 6.39855 9.60752Z" fill="white" />
								</svg>
							</Icon>
							<Typography className={clsx(classes.textWhite, 'pl-12')}>55 7031 7876</Typography>
						</div>
						<Button
							className={clsx(classes.textWhite, 'mb-20 w-full sm:w-1/3')}
							style={{ backgroundColor: 'transparent' }}
							disableRipple 
							component="a"
							href={process.env.REACT_APP_BRANDING_PAGE + "/blog"}
						>
							Blog
						</Button>
						<Button
							className={clsx(classes.textWhite, 'mb-20 w-full sm:w-1/3')}
							style={{ backgroundColor: 'transparent' }}
							disableRipple 
							component={Link} to="/"
						>
							Comunidad
						</Button>
						<Button
							className={clsx(classes.textWhite, 'mb-20 w-full sm:w-1/3')}
							style={{ backgroundColor: 'transparent' }}
							disableRipple
							component="a"
							href={process.env.REACT_APP_BRANDING_PAGE + "/contact"}
						>
							Contactanos
						</Button>
						<IconButton
							className={clsx(classes.textWhite, classes.hoverBlackCircle, 'mb-20 w-1/3 sm:w-1/5')}
							style={{ backgroundColor: 'transparent' }}
							disableRipple 
							component="a"
							href="https://www.facebook.com/ClubLIA/"
						>
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="20" cy="20" r="20" fill="#4249F8" />
								<path d="M18.8333 0C19.6458 0 20.4479 0 21.25 0C21.3542 0.0208333 21.4479 0.0520833 21.5521 0.0625C24.5521 0.291667 27.3854 1.125 29.9688 2.66667C35.2917 5.82292 38.5521 10.4375 39.6979 16.5208C39.8333 17.25 39.9063 17.9792 40 18.7083C40 19.5104 40 20.3229 40 21.125C39.8958 21.8854 39.8229 22.6458 39.6875 23.3958C38.8021 28.2813 36.4792 32.375 32.5833 35.4375C26.875 39.9375 20.4375 41.1771 13.5521 38.8021C6.23958 36.2813 1.875 31.0104 0.3125 23.4375C0.166667 22.7083 0.104167 21.9479 0 21.2083C0 20.375 0 19.5417 0 18.7083C0.104167 17.9792 0.177083 17.2396 0.302083 16.5208C1.69792 8.4375 8.04167 1.94792 16.0938 0.395833C17 0.21875 17.9167 0.125 18.8333 0ZM21.9583 17C21.9583 16.1875 21.9479 15.4375 21.9583 14.6875C21.9688 13.9271 22.2812 13.5938 23.0417 13.5625C23.7396 13.5312 24.4479 13.5208 25.1458 13.5208C25.5 13.5208 25.6875 13.3646 25.6875 13.0104C25.6875 12.0104 25.6875 11.0104 25.6771 10.0104C25.6771 9.64583 25.4896 9.45833 25.1146 9.45833C24.1563 9.45833 23.1875 9.42708 22.2292 9.47917C19.7292 9.61458 18.0313 11.0208 17.6146 13.3958C17.4375 14.4063 17.5208 15.4688 17.4896 16.5C17.4792 16.6667 17.4896 16.8229 17.4896 17.0104C16.5833 17.0104 15.7396 17.0104 14.8958 17.0104C14.5625 17.0104 14.3229 17.1354 14.3125 17.4896C14.3021 18.6042 14.3021 19.7292 14.3125 20.8438C14.3125 21.1563 14.5 21.3125 14.8125 21.3125C15.4375 21.3125 16.0625 21.3125 16.6875 21.3125C16.9479 21.3125 17.1979 21.3125 17.4896 21.3125C17.4896 21.5208 17.4896 21.6771 17.4896 21.8333C17.4896 24.4479 17.4896 27.0521 17.4896 29.6667C17.4896 30.3854 17.5729 30.4583 18.3021 30.4688C19.2292 30.4688 20.1458 30.4688 21.0729 30.4688C21.8437 30.4688 21.9271 30.375 21.9271 29.625C21.9271 27.0104 21.9271 24.4063 21.9271 21.7917C21.9271 21.6458 21.9375 21.4896 21.9479 21.3125C22.9687 21.3125 23.9375 21.3125 24.9167 21.3125C25.4479 21.3125 25.5521 21.2083 25.5521 20.6667C25.5521 19.6771 25.5521 18.6875 25.5521 17.7083C25.5521 17.1146 25.4479 17.0104 24.8438 17.0104C23.8958 16.9896 22.9479 17 21.9583 17Z" fill="white" />
							</svg>

						</IconButton>
						<IconButton
							className={clsx(classes.textWhite, classes.hoverBlackCircle, 'mb-20 w-1/3 sm:w-1/5')}
							style={{ backgroundColor: 'transparent' }}
							disableRipple
							component="a"
							href="https://www.instagram.com/club_lia/"
						>
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="20" cy="20" r="20" fill="#4249F8" />
								<path d="M18.7523 0C19.5876 0 20.4229 0 21.2477 0C21.3521 0.0208823 21.4461 0.0522057 21.5505 0.0626468C24.662 0.292352 27.575 1.19029 30.2375 2.82955C35.3955 6.00365 38.58 10.5769 39.6972 16.5596C39.8329 17.2905 39.906 18.0214 40 18.7523C40 19.5876 40 20.4229 40 21.2477C39.9687 21.5087 39.9374 21.7593 39.906 22.0204C39.4779 25.9776 38.0475 29.5275 35.5208 32.5972C32.378 36.4187 28.3686 38.7993 23.4821 39.6868C22.7408 39.8225 21.989 39.8956 21.2477 40C20.4124 40 19.5771 40 18.7523 40C18.2616 39.9374 17.7708 39.8851 17.2905 39.8225C13.6048 39.3004 10.2845 37.8909 7.40277 35.5208C3.58131 32.378 1.20073 28.3581 0.313234 23.4821C0.177499 22.7408 0.104411 21.989 0 21.2477C0 20.4124 0 19.5771 0 18.7523C0.0313234 18.4913 0.0626468 18.2407 0.0939702 17.9796C0.55338 13.7405 2.16132 10.0026 4.98042 6.80762C8.09188 3.2994 11.9551 1.1172 16.591 0.302793C17.3114 0.177499 18.0318 0.104411 18.7523 0ZM19.9948 8.45732C19.9948 8.49909 19.9948 8.55129 19.9948 8.59306C18.3555 8.59306 16.7163 8.56173 15.077 8.6035C13.7405 8.63482 12.4667 8.94806 11.3495 9.69982C9.48055 10.9528 8.66614 12.8008 8.62438 14.9622C8.55129 18.3138 8.58262 21.6758 8.61394 25.0378C8.62438 26.3221 8.96894 27.5646 9.69982 28.6505C10.9632 30.5299 12.8322 31.3339 15.0039 31.3861C18.3346 31.4591 21.6654 31.4383 24.9961 31.3861C26.6458 31.3652 28.1702 30.8536 29.4127 29.6946C30.7909 28.3999 31.3443 26.7502 31.3861 24.923C31.4487 22.1874 31.4591 19.4518 31.4591 16.7267C31.4591 15.9227 31.3965 15.1083 31.3234 14.3148C31.0102 11.2138 28.7967 8.9585 25.6956 8.69747C23.8058 8.53041 21.8951 8.53041 19.9948 8.45732Z" fill="white" />
								<path d="M20.0473 10.5449C21.7597 10.5971 23.4824 10.5971 25.1948 10.7015C27.6276 10.8477 29.2042 12.3617 29.2773 14.784C29.3713 18.2505 29.3713 21.7274 29.2773 25.2043C29.2146 27.6266 27.6276 29.2032 25.1948 29.2763C21.7388 29.3703 18.2723 29.3703 14.8163 29.2763C12.3522 29.2137 10.786 27.637 10.7234 25.1834C10.6294 21.696 10.6607 18.2087 10.7234 14.7214C10.7547 13.2074 11.4334 11.9545 12.8429 11.2132C13.6991 10.7537 14.6492 10.6389 15.5994 10.6285C17.082 10.6076 18.5647 10.618 20.0473 10.618C20.0473 10.6076 20.0473 10.5762 20.0473 10.5449ZM25.8944 19.9941C25.8944 16.7365 23.2841 14.1158 20.0264 14.1053C16.7584 14.0845 14.1167 16.7261 14.1167 19.9941C14.1167 23.2413 16.727 25.8725 19.9847 25.8934C23.2423 25.9038 25.8944 23.2622 25.8944 19.9941ZM27.5023 13.8548C27.5023 13.103 26.8967 12.4974 26.1449 12.487C25.3723 12.487 24.7563 13.0926 24.7667 13.8652C24.7667 14.6274 25.3723 15.2225 26.1241 15.233C26.8863 15.2434 27.5023 14.6274 27.5023 13.8548Z" fill="white" />
								<path d="M23.8274 20.0054C23.8274 22.1041 22.1046 23.8165 19.9955 23.8165C17.8759 23.8165 16.1531 22.0832 16.174 19.9637C16.1845 17.865 17.9177 16.1631 20.0268 16.1631C22.1255 16.184 23.8274 17.9068 23.8274 20.0054Z" fill="white" />
							</svg>


						</IconButton>
						<IconButton
							className={clsx(classes.textWhite, classes.hoverBlack, 'mb-20 w-1/3 sm:w-1/5')}
							style={{backgroundColor: 'transparent'}}  
							disableRipple
							component="a"
							href="https://www.linkedin.com/company/sistema-educativo-lia"
						>
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="20" cy="20" r="20" fill="white" />
								<path d="M21.1054 29.0003C19.852 29.0003 18.6303 29.0003 17.3887 29.0003C17.3887 25.0048 17.3887 21.011 17.3887 17.0014C18.5616 17.0014 19.7375 17.0014 20.9427 17.0014C20.9427 17.5321 20.9427 18.0622 20.9427 18.617C20.9921 18.5888 21.0155 18.5835 21.0243 18.5694C21.8081 17.3066 22.9804 16.7472 24.4293 16.7037C25.2571 16.6791 26.0672 16.7795 26.8269 17.1376C27.8102 17.6013 28.3615 18.4144 28.6655 19.4253C28.908 20.232 28.992 21.0632 28.9978 21.8986C29.0137 24.2134 29.0072 26.5282 29.0096 28.843C29.0096 28.8782 29.0043 28.9134 29.0008 28.9633C27.7632 28.9633 26.5357 28.9633 25.2735 28.9633C25.2735 28.8829 25.2735 28.799 25.2735 28.7144C25.2729 26.7513 25.2788 24.7882 25.2659 22.825C25.2629 22.3806 25.2277 21.9303 25.1473 21.4936C24.9207 20.2648 24.1211 19.8474 22.9757 19.9825C21.9331 20.1057 21.359 20.7157 21.1969 21.844C21.1377 22.2556 21.1112 22.6747 21.1089 23.091C21.1001 24.966 21.1048 26.8411 21.1048 28.7168C21.1054 28.8037 21.1054 28.8905 21.1054 29.0003Z" fill="#4249F8" />
								<path d="M11.3086 16.998C12.5549 16.998 13.7819 16.998 15.0212 16.998C15.0212 20.9995 15.0212 24.9874 15.0212 28.9917C13.7848 28.9917 12.5526 28.9917 11.3086 28.9917C11.3086 24.9956 11.3086 21.0071 11.3086 16.998Z" fill="#4249F8" />
								<path d="M15.3202 13.1546C15.3266 14.3481 14.3586 15.3373 13.1774 15.3443C11.9898 15.3514 11.0006 14.3604 11 13.1628C10.9994 11.9852 11.9669 11.0107 13.1475 11.0001C14.338 10.9895 15.3137 11.957 15.3202 13.1546Z" fill="#4249F8" />
							</svg>

						</IconButton>
						<IconButton
							className={clsx(classes.textWhite, classes.hoverBlack, 'mb-20 w-1/3 sm:w-1/5')}
							style={{ backgroundColor: 'transparent' }}
							disableRipple
							component="a"
							href="https://twitter.com/clublia"
						>
							<svg className={classes.hoverBlack} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="20" cy="20" r="20" fill="white" />
								<path fill="#4249F8" d="M9 28.9733C11.4245 29.1353 13.6006 28.5593 15.5772 27.0629C13.5005 26.8714 12.1352 25.8266 11.3626 23.8975C12.043 23.8975 12.6796 23.8975 13.3154 23.8975C13.319 23.873 13.3226 23.8478 13.3262 23.8233C11.1386 23.1378 9.9613 21.6645 9.78632 19.3178C10.4488 19.6354 11.0738 19.855 11.8141 19.8629C10.6691 18.9412 9.95986 17.8265 9.84465 16.3929C9.77264 15.4921 10.0131 14.6568 10.4646 13.8388C12.9151 16.6967 15.9682 18.3075 19.6823 18.5423C19.6823 18.0375 19.6514 17.5724 19.6874 17.1122C19.8731 14.7691 21.885 12.9624 24.2426 13.0006C25.4465 13.02 26.4806 13.455 27.3475 14.2866C27.4563 14.3911 27.547 14.4235 27.7011 14.386C28.5421 14.1801 29.3479 13.887 30.1083 13.4722C30.1666 13.4406 30.23 13.4175 30.3502 13.3642C29.9974 14.4256 29.3688 15.1968 28.4874 15.7794C28.5011 15.8096 28.5155 15.8391 28.5292 15.8694C29.3148 15.6512 30.1004 15.4337 30.909 15.2091C30.8471 15.302 30.7852 15.4013 30.7168 15.4964C30.2041 16.2085 29.5934 16.8278 28.8942 17.3549C28.7394 17.4723 28.6897 17.586 28.6962 17.7776C28.8575 22.826 25.857 27.8068 21.3032 29.805C17.2002 31.6059 13.1469 31.364 9.23762 29.1288C9.15626 29.082 9.07921 29.0252 9 28.9733Z" />
							</svg>

						</IconButton>
						<IconButton
							className={clsx(classes.textWhite, classes.hoverBlack, 'mb-20 w-1/3 sm:w-1/5')}
							style={{ backgroundColor: 'transparent'}}
							disableRipple
							component="a"
							href="https://www.youtube.com/channel/UCFo-_bOfYcWtCZ0IAHm1QOA"
						>
							<svg  width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="20" cy="20" r="20" fill="white" />
								<path fill="#4249F8" d="M7 21.5802C7 20.5214 7 19.4633 7 18.4044C7.01321 18.3244 7.03341 18.2444 7.03884 18.1636C7.14217 16.7877 7.23461 15.4104 7.34804 14.0353C7.44592 12.8475 8.54286 11.7311 9.71282 11.6084C10.7569 11.4988 11.8003 11.3901 12.8451 11.2945C15.1851 11.0801 17.5312 10.997 19.8804 11.0001C23.1246 11.004 26.3548 11.2277 29.5788 11.5889C30.8039 11.7265 31.9335 12.7729 32.0485 13.9677C32.1984 15.53 32.3212 17.0977 32.3825 18.6654C32.4781 21.1141 32.332 23.5573 32.0594 25.9928C31.9281 27.1682 30.835 28.2745 29.6759 28.3755C27.6095 28.5557 25.5446 28.7522 23.475 28.8835C20.6418 29.0622 17.8039 29.0249 14.9722 28.8424C13.2413 28.7305 11.5151 28.5386 9.78662 28.3817C8.58325 28.2721 7.46534 27.2016 7.35425 25.9983C7.2284 24.6411 7.14605 23.2792 7.0435 21.9197C7.03418 21.8063 7.01476 21.6936 7 21.5802ZM17.5902 24.2247C19.7235 22.803 21.8148 21.4093 23.938 19.9939C21.8102 18.5753 19.7157 17.1793 17.5902 15.7623C17.5902 18.6025 17.5902 21.3852 17.5902 24.2247Z" />
							</svg>

						</IconButton>
						<div className='mb-20 flex w-full text-center items-center justify-center'>
							<Button
								className={clsx(classes.textWhite, 'font-light')}
								style={{ 
									backgroundColor: 'transparent',
									fontSize: '14px',
								}}
								disableRipple
								component="a"
								href={process.env.REACT_APP_BRANDING_PAGE + "/terminos-y-condiciones"}
							>
								Terminos y condiciones
							</Button>
							|
							<Button
								className={clsx(classes.textWhite, 'font-light')}
								style={{ 
									backgroundColor: 'transparent', 
									fontSize: '14px',
								}}
								disableRipple
								component="a"
								href={process.env.REACT_APP_BRANDING_PAGE + "/politicas-de-privacidad"}
							>
								Políticas de privacidad
							</Button>
						</div>
						
					</div>
					<div className='w-full sm:w-1/5 md:w-1/3'></div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default React.memo(Footer);