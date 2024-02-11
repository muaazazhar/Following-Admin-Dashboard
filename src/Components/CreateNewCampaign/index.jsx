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
import dev from '../../services/axios-client';
import HeaderWrapper from '../Wrapper/HeaderWrapper';
import Loader from '../Loader';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PrimaryBtn from '../CustomButton/PrimaryBtn';
import { useNavigate } from 'react-router';
import validationService from '../../services/validationService';
import FormSubmitDialog from '../Popups/formSubmitDialog';
import CustomizedSteppers from '../Stepper';
import CampaignStep1 from './step1';
import CampaignStep2 from './step2';
import CampaignStep3 from './step3';
import CampaignStep4 from './step4';
import { useFormData } from '../../services/formDataContext';
import CampaignStep5 from './step5';

const CreateNewCampaign = () => {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [errors, setErrors] = useState({});
    const [index, setIndex] = useState(4);
    const [requiredFields, setRequiredFields] = useState([]);
    const [modal, setModal] = useState({ open: false });
    const [payoutType, setPayoutType] = useState('');
    const [socialMediaChannelsData, setSocialMediaChannelsData] = useState([]);
    const [socialMediaChannels, setSocialMediaChannels] = useState();

    const { formData, updateFormData } = useFormData();

    const handleClose = () => {
        setModal({ ...modal, open: false });
        setLoading(false);
    };

    const {
        register,
        setValue,
        formState: { isSubmitSuccessful },
        handleSubmit,
    } = useForm();

    const onChangeHandler = (e, name) => {
        console.log(name);
        const { [name]: tmp, ...rest } = errors;
        setErrors(rest);
        setValue(name, e);
    };

    const handleFormChange = (event) => {
        if (event?.target?.name) {
            const { [event.target.name]: tmp, ...rest } = errors;
            setErrors(rest);
        }
    };

    useEffect(() => {
        setValue('audienceLanguage', validationService.LanguageOptions[0]);
    }, []);

    function validateFormData(formData, requiredFields) {
        let errors = {};
        // Define the required fields

        // Check for missing required fields
        requiredFields.forEach((field) => {
            if (!formData[field]) {
                errors[field] = { message: `${field} is required` };
            }
            if (formData[field] instanceof FileList) {
                if (formData[field].length < 1) {
                    errors[field] = { message: `${field} is required` };
                }
            }
        });

        return errors;
    }

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setLoading(true);
        setLoading(false);
        data = {
            ...data,
            audienceGender: data.audienceGender?.value,
            audienceAge: data.audienceAge?.value,
            audienceLanguage: data.audienceLanguage?.value,
            socialMediaChannels,
            merchantId: user.user.id,
            walkInOrDelivery: payoutType,
            inspiration: 'Brand Advertisement',
            contentRequirement: 'Stories',
            minFollowers: 10000,
            engageRate: 50,
            budgetPerInfluencer: 100,
            totalBudget: 1000,
            reachEstimation: 100,
            totalDealsAvailable: 3,
            pastCampaigns: 4,
            rating: 3,
            availableSpots: 4,
            logoLink:
                '/C:/Users/musma/Downloads/WhatsApp Image 2024-01-22 at 19.03.13_f9e1afe7.jpg',
        };
        if (socialMediaChannelsData.length) {
            data['socialMediaChannels'] = socialMediaChannelsData;
        }
        updateFormData({ ...formData, ...data });

        let validatedFormData = validateFormData(data, requiredFields);
        setErrors(validatedFormData);
        if (Object.entries(validatedFormData).length < 1) {
            if (index < 1) {
                setIndex(1);
            } else {
                data = {
                    ...data,
                    dealType: data.dealType?.value,
                    paymentMethod: data.paymentMethod?.value,
                    totalDealsAvailable: data.totalDealsAvailable?.value,
                };
                validatedFormData = validateFormData(data, requiredFields);
                data = {
                    ...data,
                    locations: `${data.city}, ${data.state}, ${data.country}`,
                };
                updateFormData({ ...formData, ...data });
                setErrors(validatedFormData);
                delete data.payout;
                if (Object.entries(validatedFormData).length < 1) {
                    setIndex((prev) => prev + 1);
                    if (index === 3) {
                        try {
                            const body = new FormData();
                            Object.entries(formData).forEach(([key, value]) => {
                                if (key === 'socialMediaChannels') {
                                    // For socialMediaChannels, iterate over each channel and format accordingly
                                    value.forEach((channel, index) => {
                                        Object.entries(channel).forEach(
                                            ([subKey, subValue]) => {
                                                body.append(
                                                    `socialMediaChannels[${index}][${subKey}]`,
                                                    subValue,
                                                );
                                            },
                                        );
                                    });
                                } else {
                                    // For other fields, directly add them to formData
                                    body.append(key, value);
                                }
                            });

                            const response = await dev.post('/campaign', body, {
                                headers: {
                                    token: user.token,
                                },
                            });
                            if (response.data) {
                                setIndex(2);
                                setLoading(false);
                            }
                        } catch (error) {
                            // Handle errors
                            console.log('Error:', error);
                            setLoading(false);
                        }
                    }
                } else {
                    setModal({
                        error: true,
                        open: true,
                        title: 'Please fill are required fields',
                    });
                }
            }
        } else {
            setModal({
                error: true,
                open: true,
                title: 'Please fill are required fields',
            });
        }
    };
    const onError = (errors, e) => console.log(errors, e);

    return (
        <Grid container sx={{ height: '100%' }}>
            <Loader loading={loading} />
            <FormSubmitDialog modal={modal} onClose={handleClose} />

            <HeaderWrapper>
                <HeaderText
                    text="Campaign Management"
                    color="#272727"
                    style={{
                        fontWeight: 700,
                        fontSize: '32px',
                        lineHeight: '32px',
                    }}
                />
            </HeaderWrapper>

            <Box sx={{ width: '100%' }}></Box>

            {index <= 4 && (
                <Grid xs={12}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onError)}
                        onInput={handleFormChange}
                        id="user-form"
                        noValidate
                        autoComplete="on"
                    >
                        <Grid
                            xs={12}
                            sx={{
                                mt: '20px',
                                padding: '30px 0px',
                            }}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                mb="30px"
                                sx={{ padding: { lg: '0px 150px' } }}
                            >
                                <CustomizedSteppers activeStep={index} />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                mb="30px"
                                width={'100%'}
                                borderTop={'1px solid #E9EDF4'}
                            ></Grid>
                            <Grid
                                container
                                alignContent={'center'}
                                justifyContent="left"
                                direction="row"
                                alignItems="center"
                                mt="33px"
                            >
                                {index === 0 && (
                                    <CampaignStep1
                                        errors={errors}
                                        register={register}
                                        onChangeHandler={onChangeHandler}
                                        setRequiredFields={setRequiredFields}
                                        setPayoutType={setPayoutType}
                                        payoutType={payoutType}
                                        socialMediaChannels={
                                            socialMediaChannels
                                        }
                                        setSocialMediaChannels={
                                            setSocialMediaChannels
                                        }
                                    />
                                )}
                                {index === 1 && (
                                    <CampaignStep2
                                        setIndex={setIndex}
                                        errors={errors}
                                        register={register}
                                        onChangeHandler={onChangeHandler}
                                        requiredFields={requiredFields}
                                        setRequiredFields={setRequiredFields}
                                    />
                                )}
                                {index === 2 && (
                                    <CampaignStep3
                                        setIndex={setIndex}
                                        errors={errors}
                                        register={register}
                                        onChangeHandler={onChangeHandler}
                                        setRequiredFields={setRequiredFields}
                                        socialMediaChannels={
                                            socialMediaChannels
                                        }
                                        socialMediaChannelsData={
                                            socialMediaChannelsData
                                        }
                                        setSocialMediaChannelsData={
                                            setSocialMediaChannelsData
                                        }
                                    />
                                )}
                                {index === 3 && (
                                    <CampaignStep4
                                        setIndex={setIndex}
                                        errors={errors}
                                        register={register}
                                        onChangeHandler={onChangeHandler}
                                        setRequiredFields={setRequiredFields}
                                        socialMediaChannels={
                                            socialMediaChannels
                                        }
                                    />
                                )}
                                {index === 4 && (
                                    <CampaignStep5 setIndex={setIndex} />
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            )}
        </Grid>
    );
};

export default CreateNewCampaign;
