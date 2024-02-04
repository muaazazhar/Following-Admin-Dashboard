import {
    Box,
    Grid,
    InputBase,
    Step,
    StepLabel,
    Stepper,
    styled,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import HeaderText from '../Text/HeaderText';
import CustomizedInputsStyled from '../Text/StandardTextField';
import SubHeaderText from '../Text/SubHeaderText';
import WrapperStandardTextField from '../Wrapper/WrapperStandardTextField';
import CustomSelect from '../Input/CustomSelect';
import validationService from '../../services/validationService';
import PreLabel from '../Text/PreLabel';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MapPicker from 'react-google-map-picker';

const DefaultLocation = { lat: 25.276987, lng: 55.296249 };
const DefaultZoom = 10;

const CampaignStep2 = ({
    errors,
    register,
    setIndex,
    requiredFields,
    setRequiredFields,
}) => {
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const [markerLocation, setMarkerLocation] = useState(null);

    // Function to handle marker position change
    const handleMarkerChange = (lat, lng) => {
        setMarkerLocation({ lat, lng });
    };

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        setDefaultLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
    }

    useEffect(() => {
        setRequiredFields([
            ...requiredFields,
            'city',
            'state',
            'postcode',
            'country',
        ]);
    }, []);

    return (
        <>
            <WrapperStandardTextField lg={12}>
                <HeaderText text="Address" color="#282F53" />
            </WrapperStandardTextField>
            <WrapperStandardTextField
                style={{ paddingRight: '10px', paddingTop: '20px' }}
            >
                <PreLabel label={'Audience Location ( GeoLocate Map)'} />
                <CustomizedInputsStyled
                    color="#272727"
                    required={true}
                    label="Enter Your Location"
                    error={errors['location']}
                >
                    <InputBase
                        fullWidth
                        disabled
                        value={`@ ${location?.lat}  ${location?.lng}`}
                        sx={{
                            ml: 2,
                            flex: 1,
                            color: '#808080',
                            fontSize: '14px',
                            lineHeight: '21px',
                        }}
                        placeholder={'London, Uk / @33.5614054,72.8533316,11z'}
                        type={'text'}
                        inputProps={{
                            'aria-label':
                                'London, Uk / @33.5614054,72.8533316,11z',
                        }}
                        required
                        error={!!errors['location']}
                        helperText={
                            errors['location'] ? errors['location'].message : ''
                        }
                        {...register('location')}
                    />
                </CustomizedInputsStyled>
            </WrapperStandardTextField>
            <WrapperStandardTextField
                style={{ paddingRight: '10px', paddingTop: '20px' }}
            >
                <PreLabel label={'Location'} />
                <CustomizedInputsStyled
                    color="#272727"
                    required={true}
                    label="City"
                    error={errors['city']}
                >
                    <InputBase
                        fullWidth
                        sx={{
                            ml: 2,
                            flex: 1,
                            color: '#808080',
                            fontSize: '14px',
                            lineHeight: '21px',
                        }}
                        placeholder={'City'}
                        type={'text'}
                        inputProps={{
                            'aria-label': 'City',
                        }}
                        required
                        error={!!errors['city']}
                        helperText={
                            errors['city'] ? errors['city'].message : ''
                        }
                        {...register('city')}
                    />
                </CustomizedInputsStyled>
            </WrapperStandardTextField>
            <WrapperStandardTextField
                lg={4}
                style={{ paddingRight: '10px', paddingTop: '30px' }}
            >
                <PreLabel label={'Your State'} />
                <CustomizedInputsStyled
                    color="#272727"
                    required={true}
                    label="State"
                    error={errors['state']}
                >
                    <InputBase
                        fullWidth
                        sx={{
                            ml: 2,
                            flex: 1,
                            color: '#808080',
                            fontSize: '14px',
                            lineHeight: '21px',
                        }}
                        placeholder={'state'}
                        type={'text'}
                        inputProps={{
                            'aria-label': 'state',
                        }}
                        required
                        error={!!errors['state']}
                        helperText={
                            errors['state'] ? errors['state'].message : ''
                        }
                        {...register('state')}
                    />
                </CustomizedInputsStyled>
            </WrapperStandardTextField>
            <WrapperStandardTextField
                lg={4}
                style={{ paddingRight: '10px', paddingTop: '30px' }}
            >
                <PreLabel label={'Your Postcode'} />
                <CustomizedInputsStyled
                    color="#272727"
                    required={true}
                    label="Postcode"
                    error={errors['postcode']}
                >
                    <InputBase
                        fullWidth
                        sx={{
                            ml: 2,
                            flex: 1,
                            color: '#808080',
                            fontSize: '14px',
                            lineHeight: '21px',
                        }}
                        placeholder={'12343'}
                        type={'text'}
                        inputProps={{
                            'aria-label': '12343',
                        }}
                        required
                        error={!!errors['postcode']}
                        helperText={
                            errors['postcode'] ? errors['postcode'].message : ''
                        }
                        {...register('postcode')}
                    />
                </CustomizedInputsStyled>
            </WrapperStandardTextField>
            <WrapperStandardTextField
                lg={4}
                style={{ paddingRight: '0px', paddingTop: '30px' }}
            >
                <PreLabel label={'Select Country'} />
                <CustomizedInputsStyled
                    color="#272727"
                    required={true}
                    label="Country"
                    error={errors['country']}
                >
                    <InputBase
                        fullWidth
                        sx={{
                            ml: 2,
                            flex: 1,
                            color: '#808080',
                            fontSize: '14px',
                            lineHeight: '21px',
                        }}
                        placeholder={'Country'}
                        type={'text'}
                        inputProps={{
                            'aria-label': 'Country',
                        }}
                        required
                        error={!!errors['country']}
                        helperText={
                            errors['country'] ? errors['country'].message : ''
                        }
                        {...register('country')}
                    />
                </CustomizedInputsStyled>
            </WrapperStandardTextField>
            <WrapperStandardTextField
                lg={12}
                style={{ paddingRight: '0px', paddingTop: '30px' }}
            >
                <MapPicker
                    defaultLocation={defaultLocation}
                    style={{ height: '250px' }}
                    onChangeLocation={handleChangeLocation}
                    onChangeZoom={handleChangeZoom}
                    apiKey="AIzaSyBrCu57oEymo7VK-gTCouW3cdIGyv3Mmt4"
                >
                    {/* Check if markerLocation is not null, then display the marker */}
                    {markerLocation && (
                        <MapPicker.Marker
                            position={markerLocation}
                            draggable={true}
                            onDragEnd={(lat, lng) =>
                                handleMarkerChange(lat, lng)
                            }
                        />
                    )}
                </MapPicker>
            </WrapperStandardTextField>

            <WrapperStandardTextField md={12} lg={12}>
                <LoadingButton
                    variant="contained"
                    sx={{
                        backgroundColor: '#FFFFFF',
                        color: '#272727',
                        border: '1px solid #272727',
                        textTransform: 'capitalize',
                        mt: '20px',
                        mr: '20px',
                        borderRadius: '5px',
                    }}
                    onClick={() => setIndex((prev) => prev - 1)}
                >
                    Back
                </LoadingButton>
                <LoadingButton
                    variant="contained"
                    type="submit"
                    sx={{
                        backgroundColor: '#272727',
                        color: '#FFFFFF',
                        textTransform: 'capitalize',
                        mt: '20px',
                        borderRadius: '5px',
                    }}
                >
                    Next Step
                </LoadingButton>
            </WrapperStandardTextField>
        </>
    );
};

export default CampaignStep2;
