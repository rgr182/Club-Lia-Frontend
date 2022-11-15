import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import {showMessage} from "../../store/fuse/messageSlice";
import Grid from '@material-ui/core/Grid';
import Moment from 'moment';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`
	},
	divider: {
		backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark)
	},
	seller: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.dark),
		marginRight: -88,
		paddingRight: 66,
		width: 480
	}
}));

function CompactInvoicePage(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [invoice, setInvoice] = useState(null);
	const [invoiceData, setInvoiceData] = useState(false);
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
    });
    const search = props.location.search; // returns the URL query String
	const params = new URLSearchParams(search); 
	const orderId = localStorage.getItem('id_order');
	const preapproval_id = params.get('preapproval_id');
	const payment_id = params.get('payment_id');
	const preference_id = params.get('preference_id');
	var dataInv = [];
	var statusPayment = "";

	if(invoiceData === false){
		var path = '/getPreapproval/' + preapproval_id;
		if (payment_id) 
			path = '/getPreapprovalCourse/'+ payment_id;
		axios
			.post(process.env.REACT_APP_API + path,{
				'order_id': orderId,
				'preference_id': preference_id ? preference_id : ''
			})
			.then(res => {
				setInvoiceData(true);
				const datos = res.data.data;
				statusPayment = datos.status;
				dataInv.date = datos.date_created;
				dataInv.number = datos.id;
                dataInv.orderId = datos.application_id;
				dataInv.title = datos.reason ? datos.reason : (datos.updtOrder && datos.updtOrder.title ? datos.updtOrder.title : '');
				dataInv.email = datos.payer_email ? datos.payer_email : (datos.payer && datos.payer.email ? datos.payer.email : '');
				dataInv.name = (
					datos.payer_first_name ? datos.payer_first_name + ' ' + datos.payer_last_name 
						: (datos.payer && datos.payer.first_name ? datos.payer.first_name + ' ' + datos.payer.last_name : '')
				);
				dataInv.titleService = datos.reason ? datos.reason : datos.additional_info.items;
				dataInv.descriptionService = datos.reason ? datos.reason : datos.additional_info.items;
				dataInv.price = datos.transaction_amount ? datos.transaction_amount : datos.auto_recurring.transaction_amount;
				setInvoice(dataInv);
			}).catch(error => {
				console.log(error);
				dispatch(showMessage({message:"tu factura no pudo ser procesada, inicia sesión para revisarlo",variant: 'error'}));
			});
	}

    function navLogin() {
        window.location.href= "/login";
    }

	useEffect(() => {
		if(statusPayment !== "authorized"){
			setInvoice(dataInv);
		}
    }, []);


	return (
		<div className={clsx(classes.root, 'flex-grow flex-shrink-0 p-0 sm:p-64 print:p-0')}>
			{invoice && (
				<FuseAnimate animation={{ translateY: [0, '100%'] }} duration={600}>
					<Card className="mx-auto w-xl print:w-full print:p-8 print:shadow-none rounded-8">
						<CardContent className="p-88 print:p-0">
							<Typography color="textSecondary" className="mb-32">
								{invoice.date}
							</Typography>

							<div className="flex justify-between">
								<div>
									<table className="mb-16">
										<tbody>
											<tr>
												<td className="pb-4">
													<Typography
														className="font-light"
														variant="h6"
														color="textSecondary"
													>
														FACTURA #
													</Typography>
												</td>
												<td className="pb-4 px-16">
													<Typography className="font-light" variant="h6">
														{invoice.orderId}
													</Typography>
												</td>
											</tr>

                                            <tr>
												<td>
													<Typography className="font-light" variant="body2" color="textSecondary">ID DE PAGO</Typography>
												</td>
												<td className="px-16">
													<Typography className="font-light" variant="body2">{invoice.number}</Typography>
												</td>
											</tr>

											<tr>
												<td>
													<Typography className="font-light" variant="body2" color="textSecondary">FECHA DE FACTURA</Typography>
												</td>
												<td className="px-16">
													<Typography className="font-light" variant="body2">{invoice.date}</Typography>
												</td>
											</tr>

										</tbody>
									</table>

									 <Typography className="font-light" variant="body2" color="textSecondary">{invoice.title}</Typography>

									{invoice.name && (
										<Typography className="font-light" variant="body2" color="textSecondary">{invoice.name}</Typography>
									)}
									{invoice.email && (
										<Typography className="font-light" variant="body2" color="textSecondary">{invoice.email}</Typography>
									)}
								</div>

								<div className={clsx(classes.seller, 'flex items-center p-16')}>
									<img className="w-80" src="assets/images/logos/clublia.png" alt="logo" />

									<div className={clsx(classes.divider, 'w-px mx-8 h-96 opacity-50')} />

									<div className="px-8">
										<Typography className="font-light" variant="body2" color="inherit">Club LIA</Typography>

											<Typography className="font-light" variant="body2" color="inherit">Tijuana</Typography>
											<Typography className="font-light" variant="body2" color="inherit">4494494949</Typography>
											<Typography className="font-light" variant="body2" color="inherit">info@clublia.com</Typography>
											<Typography className="font-light" variant="body2" color="inherit">www.clublia.com</Typography>
									</div>
								</div>
							</div>

							<div className="mt-64">
								<Table className="simple">
									<TableHead>
										<TableRow>
											<TableCell>SERVICIO</TableCell>
											<TableCell>DESCRIPCIÓN</TableCell>
											<TableCell align="center">PRECIO UNITARIO</TableCell>
											<TableCell align="right">TOTAL</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{invoice.titleService && invoice.titleService[0].title ? 
											invoice.titleService.map(item => (
												<TableRow key={item.title}>
													<TableCell>
														<Typography className="font-light" variant="subtitle1">{item.title}</Typography>
													</TableCell>
													<TableCell>
														{item.quantity + ' ' + item.title}
													</TableCell>
													<TableCell align="center">{formatter.format(item.unit_price)}</TableCell>
													<TableCell align="right">{formatter.format(item.unit_price * item.quantity)}</TableCell>
												</TableRow>
											))
										:
											<TableRow>
												<TableCell>
													<Typography className="font-light" variant="subtitle1">{invoice.titleService}</Typography>
												</TableCell>
												<TableCell>
													{invoice.descriptionService}
												</TableCell>
												<TableCell align="center">{formatter.format(invoice.price)}</TableCell>
												<TableCell align="right">{formatter.format(invoice.price)}</TableCell>
											</TableRow>
										}
										</TableBody>
								</Table>

								<Table className="simple mt-32">
									<TableBody>
									<TableRow> 
											<TableCell>
												<Typography className="font-light" variant="h4" color="textSecondary">
													TOTAL
												</Typography>
											</TableCell>
											<TableCell align="right">
												<Typography className="font-light" variant="h4" color="textSecondary">
													{formatter.format(invoice.price)}
												</Typography>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</div>

							<div className="mt-96">
								{ invoice.titleService && invoice.titleService[0].title != 'Donation' ?
									<>
										<Typography className="mb-24 print:mb-12" variant="body1">
										Esta información fue enviada a tu correo.
										</Typography>
										<Grid container justify="center">
											<Button onClick={()=>navLogin()} variant="contained" color="primary" 
												className=" mx-auto mb-10">
												<Typography variant="body1">
													Inicia sesión
												</Typography>
											</Button>
										</Grid>
									</>
									:
									<></>
								}
								
							</div>
						</CardContent>
					</Card>
				</FuseAnimate>
			)}
		</div>
	);
}

export default CompactInvoicePage;

/**

 Use the following elements to add breaks to your pages. This will make sure that the section in between
 these elements will be printed on a new page. The following two elements must be used before and after the
 page content that you want to show as a new page. So, you have to wrap your content with them.

 Elements:
 ---------
 <div className="page-break-after"></div>
 <div className="page-break-before"></div>


 Example:
 --------

 Initial page content!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the second page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the third page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>
 * */
