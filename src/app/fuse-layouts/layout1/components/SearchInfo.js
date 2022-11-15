import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from 'app/store/fuse/inputMaestroSlice';

function SearchInfo(props) {
    
    const dispatch = useDispatch();
    const [values, setValues] = useState();

    const handleChange = (event) => {
        dispatch(setUserName(event));
    }

    return( 
        <>
            <FormControl>
                <OutlinedInput
                    className="buscadorTeacher"
                    id="outlined-adornment-amount"
                    value={values}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder='Buscar...'
                    startAdornment={
                        <SearchIcon 
                            position="start"
                            style={{
                                paddingRight: '5px'
                            }}
                        >
                            Icon
                        </SearchIcon>
                    }
                />
            </FormControl>
        </>
    )
} 

export default SearchInfo;