import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export default function GlobalSchoolingInvoice({ billData }) {
	const [service, setService] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [unitPrice, setUnitPrice] = useState(0);
	const [subscription, setSubscription] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (billData) {
			setService(getServiceType(billData?.auto_recurring.frequency));
			setQuantity(billData?.summarized?.charged_quantity);
			setUnitPrice(billData?.auto_recurring?.transaction_amount);
			setSubscription(billData?.summarized?.last_charged_amount);
		}
	}, [billData]);

	useEffect(() => {
		setTotal(quantity * unitPrice);
	}, [quantity, unitPrice]);

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});

	function getServiceType(value) {
		switch (value) {
			case 6:
				return 'Semestral';
			case 12:
				return 'Anual';
			default:
				return 'Mensual';
		}
	}

	return (
		<div className="w-full h-full bg-white flex justify-center items-center">
			<div className="px-40 py-20 border-2 rounded border-slate-600">
				<section className="flex items-center justify-center">
					<img className="w-60" src="assets/images/logos/globalSchool.png" alt="logo" />
					<label className="font-bold text-4xl text-black ml-20">Global Schooling</label>
				</section>

				<section className="flex flex-col mt-40 items-center">
					<div>
						<div className="flex">
							<label className="font-bold text-md text-black">Recibo:</label>
							<label className="font-normal text-md text-black ml-10">#{billData?.application_id}</label>
						</div>
						<div className="flex">
							<label className="font-bold text-md text-black">ID de pago:</label>
							<label className="font-normal text-md text-black ml-10">{billData?.id}</label>
						</div>
						<div className="flex">
							<label className="font-bold text-md text-black ">fecha:</label>
							<label className="font-normal text-md text-black ml-10">
								{moment(billData?.date_created).format('YYYY-MM-DD hh:mmA')}
							</label>
						</div>
					</div>
				</section>

				<section className="mt-40">
					<Table className="simple">
						<TableHead>
							<TableRow>
								<TableCell align="center">
									<label className="font-bold">CANTIDAD</label>
								</TableCell>
								<TableCell align="center">
									<label className="font-bold">SERVICIO</label>
								</TableCell>
								<TableCell align="center">
									<label className="font-bold">PRECIO UNITARIO</label>
								</TableCell>
								<TableCell align="center">
									<label className="font-bold">SUSCRIPCIÓN</label>
								</TableCell>
								<TableCell align="center">
									<label className="font-bold text-blue-A700">TOTAL</label>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell align="center">{quantity}</TableCell>
								<TableCell align="left">{service}</TableCell>
								<TableCell align="center">{formatter.format(unitPrice)}</TableCell>
								<TableCell align="center">{formatter.format(subscription)}</TableCell>
								<TableCell align="center" className="font-bold text-blue-A700">
									{`${formatter.format(total)} ${billData?.payment_type}`}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</section>
				<section className="mt-40 flex items-center">
					<Button to={`/`} component={Link} variant="contained" color="primary" className="mx-auto mb-10">
						Regresar al dashboard
					</Button>
				</section>
			</div>
		</div>
	);
}
