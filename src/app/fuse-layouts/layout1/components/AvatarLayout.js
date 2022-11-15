import {pink, lime, green, indigo} from '@material-ui/core/colors';
import {fusePurple, fuseBlue, fuseRed, fuseOrange} from '@fuse/colors';
import React, {useCallback, useEffect, useState} from 'react';
import '../../../../styles/index.css'
import {useDispatch, useSelector} from "react-redux";
import {AutoRotatingCarousel, Slide} from "material-auto-rotating-carousel";
import {closeAvatarLayout, getAvatars, submitUpdateAvatar} from "../../../store/fuse/avatarSlice";
import {useForm} from "../../../../@fuse/hooks";

const defaultFormState = {
    customName: '',
    avatarId: '',
    avatarPath:'',
};

function AvatarLayout(props) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const avatarLayout = useSelector(({fuse}) => fuse.avatar.avatarLayout);
    const avatarData = useSelector(({fuse}) => fuse.avatar.entities);
    const avatar = Object.entries(avatarData).map(([key, value]) => ({key, value}))
    const {form, handleChange, setForm} = useForm(defaultFormState);
    let [color, setBackground] = useState([fuseBlue[500]]);
    let [secondColor, secondBackground] = useState([fuseBlue[700]]);
    let [avatarId, setAvatarId] = useState(0);


    const initDialog = useCallback(() => {

        setForm({
            id: user.data.uuid
        });

    }, [avatarData.entities,setForm]);


    function setColor(key) {
        if (key === 0) {
            setBackground(fuseBlue[400])
            secondBackground(fuseBlue[700])
        }
        if (key === 1) {
            setBackground(fuseRed[400])
            secondBackground(fuseRed[700])
        }
        if (key === 2) {
            setBackground(fuseOrange[400])
            secondBackground(fuseOrange[700])
        }
        if (key === 3) {
            setBackground(fusePurple[400])
            secondBackground(fusePurple[700])
        }
        if (key === 4) {
            setBackground(green[400])
            secondBackground(green[700])
        }
        if (key === 5) {
            setBackground(lime[400])
            secondBackground(lime[700])
        }
        if (key === 6) {
            setBackground(pink[400])
            secondBackground(pink[700])
        }
        if (key === 7) {
            setBackground(indigo[400])
            secondBackground(indigo[700])
        }
    }

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (avatarLayout.props.open) {
            initDialog();
        }
    }, [avatarLayout.props.open, initDialog]);

    useEffect(() => {
    }, []);

    function handleSubmit() {
        dispatch(submitUpdateAvatar(form,avatarId))
        dispatch(closeAvatarLayout());
    }

    return (
        <div className={'lia-avatar'}>
            {avatar ?
                <AutoRotatingCarousel
                    label="Seleccionar Avatar"
                    style={{position: "absolute",}}
                    autoplay={false}
                    {...avatarLayout.props}
                    onClose={ev => dispatch(closeAvatarLayout())}
                    onStart={handleSubmit}
                    onChange={ev => {
                        setColor(ev) ; setAvatarId(ev)
                    }}
                >
                    {avatar.map((row) => (
                        <Slide
                            key={row.value.id}
                            name="avatar"
                            id="avatar"
                            value={form.avatarId}
                            media={
                                <img
                                    src={row.value.path} alt="avatar0"
                                    style={{paddingTop: 30}}
                                />
                            }
                            mediaBackgroundStyle={{backgroundColor: color}}
                            style={{backgroundColor: secondColor}}
                            title={row.value.name}
                            subtitle={row.value.description}
                        />
                    ))
                    }
                </AutoRotatingCarousel>
                :
                null
            }
        </div>
    );
}

export default AvatarLayout;