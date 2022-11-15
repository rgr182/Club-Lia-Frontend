import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectResources, openEditResourceDialog, openResourceDescriptionDialog } from './store/resourcesSlice';
import ResourcesSidebarContent from "./ResourcesSidebarContent";
import ResourcesTable from "./ResourcesTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';

function ResourcesList(props) {

	const dispatch = useDispatch();
	const resources = useSelector(selectResources);
	let searchText = useSelector(({ fuse }) => fuse.input.texto);
	const loading = useSelector(({ ResourcesApp }) => ResourcesApp.resources.loading);
	searchText =searchText? searchText : '';
	const [filteredData, setFilteredData] = useState(null);
	const role = useSelector(({ auth }) => auth.user.role);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Tipo',
				accessor: 'category_name',
				sortable: true,
				Cell: ({ row }) => (
					<div className='flex w-full h-full items-center justify-center text-center'>
						<img className="h-48" src={'assets/images/resources/iconos/' + row.original.category_name.replace('ó', 'o').replace('á', 'a') + '.svg'}/>
					</div>
				)
			},
			{
				Header: 'Nombre',
				accessor: 'name',
				className: 'font-bold',
				sortable: true,
				Cell: ({ row }) => (
					<div className='flex w-full h-full items-center justify-center text-center'>
						<div 
							style={{
								width: '320px',
								display:'inline-block',
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{row.original.name} 
						</div>
					</div>
				)
			},
			{
				Header: 'Grado',
				accessor: 'grade',
				sortable: true,
				Cell: ({ row }) => {
					return row.original.grade + '° '+ (row.original.level == 1 ? "Preescolar" : row.original.level == 2 ? "Primaria" : "Secundaria");
				},
				
			},
			{
				Header: 'Bloque',
				accessor: 'bloque',
				sortable: true
			},
			{
				Header: 'Materia',
				accessor: 'subjects_name',
				sortable: true
			},
		],
		[dispatch]
	);

	useEffect(() => {
		function getFilteredArray(resources, _searchText) {
			if (_searchText.length === 0) {
				return resources;
			}
			return FuseUtils.filterArrayByString(resources, _searchText);
		}
		if (resources) {
			setFilteredData(getFilteredArray(resources, searchText));
		}
	}, [resources, searchText]);

	if (!filteredData) {
		return null;
	}


	let res
	if (loading){
		res = (
			<>
				<div className="flex flex-1 flex-col items-center justify-center h-200 xl:h-400 py-80 xl:py-160">
					<Typography className="text-20 poppins">
						Consultando información...
					</Typography>
					<CircularProgress color="secondary" />
				</div>
			</>
		);
	} else {
		if (filteredData.length === 0) {
			res = (
				<>
					<div className="flex flex-1 items-center justify-center h-200 xl:h-400 py-80 xl:py-160">
						<Typography color="textSecondary" className="text-24 poppins">
							No hay registros que mostrar!
						</Typography>
					</div>
				</>			
			);
		}else{
			res =  (
				<ResourcesTable
					columns={columns}
					data={filteredData}
					onRowClick={(ev, row) => {
						if (row && role == 'admin') {
							dispatch(openEditResourceDialog(row.original));
						} else {
							dispatch(openResourceDescriptionDialog(row.original));
						}
					}}
				/>
			)
		}
	}
	
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<Card elevation={1} class="card3 h-full">
				<div className="flex flex-col flex-1 w-full mx-auto px-24">
					<ResourcesSidebarContent />
					{res}
				
				</div>
			</Card>
		</FuseAnimate>
	);
}

export default ResourcesList;
