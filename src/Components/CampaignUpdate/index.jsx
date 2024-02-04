import { Box, Grid, InputBase, styled } from '@mui/material';
import { set, useForm } from 'react-hook-form';
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
import { useNavigate, useParams } from 'react-router';
import validationService from '../../services/validationService';
import FormSubmitDialog from '../Popups/formSubmitDialog';


const UpdateCampaign = () => {
    const [loading, setLoading] = useState(false);
    let { campaignId, update } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [errors, setErrors] = useState({});
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const [modal, setModal] = useState({ open: false });
    const [campaign, setCampaign] = useState([]);
    useEffect(() => {
        getCampaign();
    }, []);

    

    const getCampaign = async () => {
        setLoading(true);
        await dev
            .get(`/campaign/single/${campaignId}`, {
                headers: {
                    token: user.token,
                },
            })
            .then((response) => {
                if (response.data.data) {
                    setCampaign(response.data.data);
                
                }
            })
            .catch((error) => console.log(error));
        setLoading(false);
    };

    const handleClose = () => {
        setModal({...modal, open: false });
        setLoading(false);
    };

    const {
        register,
        watch,
        setValue,
        formState: { isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm();

    const onChangeHandler = (e, name) => {
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

    function findIndexWithValue(value, array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].value === value) {
            return i;
          }
        }
        return -1;
    }

    function filterSocialMediaOptions(socialMediaChannels, socialMediaOptions) {
        const socialMediaChannelsArray = socialMediaChannels.split(', ');
        const filteredSocialMediaOptions = socialMediaOptions.filter((option) => {
          return socialMediaChannelsArray.includes(option.value);
        });
        return filteredSocialMediaOptions;
    }
    
    useEffect(() => {
        if (campaign.id) {
            try {
                setValue("socialMediaChannels",filterSocialMediaOptions(campaign['socialMediaChannels'], validationService.socailOptions));
                setValue("payout",validationService.payOptions[findIndexWithValue(1, validationService.payOptions)]);
                setValue("audienceAge", validationService.ageOptions[findIndexWithValue(campaign['audienceAge'], validationService.ageOptions)]);
                setValue("audienceGender",validationService.genderOptions[findIndexWithValue(campaign['audienceGender'], validationService.genderOptions)]);
                setValue("audienceLanguage", validationService.LanguageOptions[findIndexWithValue(campaign['audienceLanguage'], validationService.LanguageOptions)]);
                setValue("minFollowers", validationService.followersOptions[findIndexWithValue(campaign['minFollowers'], validationService.followersOptions)]);
                setValue("paymentMethod", validationService.paymentMethodOptions[findIndexWithValue(campaign.billing['paymentMethod'], validationService.paymentMethodOptions)]);
                setValue("dealType", validationService.dealTypeOptions[0]);
                setValue("totalDealsAvailable",validationService.dealsOptions[findIndexWithValue(campaign.billing['totalDealsAvailable'], validationService.dealsOptions)]);
                setValue("contentRequirement", campaign["contentRequirement"]);
                setValue("engageRate", campaign["engageRate"]);
                setValue("inspiration", campaign["inspiration"]);
                setValue("locations", campaign["location"]);
                setValue("title", campaign["title"]);
                setValue("totalBudget", campaign.billing["totalBudget"]);
                setValue("budgetPerInfluencer", campaign.billing["budgetPerInfluencer"]);
                setValue("reachEstimation", campaign.billing["reachEstimation"]);
            } catch (e) {
                console.log("error", e);
            }
            
        }
    }, [campaign]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            //reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

   

    function validateFormData(formData, requiredFields) {
        console.log(formData);
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

    console.log(validationService.payOptions[findIndexWithValue(1, validationService.payOptions)])

    const onSubmit = async (data, e) => {
        setLoading(true);
        e.preventDefault();
        setLoading(false);
        data = {
            ...data,
            audienceGender: data.audienceGender?.value,
            audienceAge: data.audienceAge?.value,
            audienceLanguage: data.audienceLanguage?.value,
            socialMediaChannels: data.socialMediaChannels?.map(item => item?.value).join(', '),
            minFollowers: data.minFollowers?.value,
            "merchantId": user.user.id,
            billingId: campaign.billing.id
        };
        let requiredFields = [
            "audienceAge",
            "audienceGender",
            "audienceLanguage",
            "contentRequirement",
            "engageRate",
            "inspiration",
            "locations",
            "minFollowers",
            "socialMediaChannels",
            "title",
            "payout"
        ];
        let validatedFormData = validateFormData(data, requiredFields);
        setErrors(validatedFormData);
        if (Object.entries(validatedFormData).length < 1) {
            if (index < 1) {
                setIndex(1);
                return;
            } else {
                requiredFields = [
                    ...requiredFields,
                    "paymentMethod",
                    'budgetPerInfluencer',
                    'totalBudget',
                    'reachEstimation',
                    "dealType",
                    "totalDealsAvailable"
                ]
                data = {
                    ...data,
                    dealType: data.dealType?.value,
                    paymentMethod: data.paymentMethod?.value,
                    totalDealsAvailable: data.totalDealsAvailable?.value,
                };
                validatedFormData = validateFormData(data, requiredFields);
                setErrors(validatedFormData);
                delete data.payout;
                if (Object.entries(validatedFormData).length < 1) {
                    try {
                        const response = await dev.put(`/campaign/${campaign.id}`, data, {
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

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    

    return (
        <>
            <Loader loading={loading} />
{campaign?.id  &&  <Grid container sx={{ backgroundColor: '#F9F9F9', height: '100%' }}>
            
             
            <FormSubmitDialog modal={modal} onClose={handleClose} />
            <HeaderWrapper>
                <HeaderText text="Campaign Management" />
            </HeaderWrapper>

            {index < 2 && (
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
                                backgroundColor: '#FFFFFF',
                                mt: '20px',
                                padding: '30px 0px',
                                borderRadius: '7px',
                                boxShadow:
                                    '0px 8px 24px rgba(168, 180, 208, 0.1)',
                            }}
                        >
                            <Box sx={{ textAlign: 'center', width: '100%' }}>
                                <HeaderText text="Create Campaign" />
                            </Box>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                mt="30px"
                            >
                                <Grid
                                    item
                                    sm={4}
                                    md={3}
                                    textAlign={'center'}
                                    sx={{
                                        borderBottom: '1px solid #18171C',
                                        pb: '15px',
                                    }}
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Box
                                            sx={{
                                                borderRadius: '50%',
                                                border: `1px dashed ${index === 0
                                                        ? '#6c5ffc'
                                                        : '#74829C'
                                                    }`,
                                                boxSizing: 'border-box',
                                                padding: '6px 11px 6px 10px',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                fontFamily: "'IBM Plex Sans'",
                                                color: `${index === 0
                                                        ? '#6c5ffc'
                                                        : '#74829C'
                                                    }`,
                                                textAlign: 'left',
                                                marginRight: '10px',
                                                fontWeight: 600,
                                            }}
                                        >
                                            1
                                        </Box>
                                        <SubHeaderText
                                            text="Campaign Info  "
                                            color={
                                                index === 0
                                                    ? '#6c5ffc'
                                                    : '#74829C'
                                            }
                                            customstyle={{
                                                fontWeight: 600,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    sm={4}
                                    md={3}
                                    textAlign={'center'}
                                    sx={{
                                        borderBottom: '1px solid #B0B0B0',
                                        pb: '15px',
                                    }}
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Box
                                            sx={{
                                                borderRadius: '50%',
                                                border: `1px dashed ${index === 1
                                                        ? '#6c5ffc'
                                                        : '#74829C'
                                                    }`,
                                                boxSizing: 'border-box',
                                                padding: '6px 11px 6px 10px',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                fontFamily: "'IBM Plex Sans'",
                                                color: `${index === 1
                                                        ? '#6c5ffc'
                                                        : '#74829C'
                                                    }`,
                                                textAlign: 'left',
                                                marginRight: '10px',
                                                fontWeight: 600,
                                            }}
                                        >
                                            2
                                        </Box>
                                        <SubHeaderText
                                            text="Billing Info "
                                            color={
                                                index === 1
                                                    ? '#6c5ffc'
                                                    : '#74829C'
                                            }
                                            customstyle={{
                                                fontWeight: 600,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignContent={'center'}
                                justifyContent="left"
                                direction="row"
                                alignItems="center"
                                mt="33px"
                            >
                                {index === 0 && (
                                    <>
                                        <WrapperStandardTextField>
                                            <CustomizedInputsStyled
                                                required={true}
                                                label="Campaign Title"
                                                error={errors['title']}
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
                                                    placeholder={'Title'}
                                                    type={'text'}
                                                    inputProps={{
                                                        'aria-label': 'Title',
                                                    }}
                                                    required
                                                    error={!!errors['title']}
                                                    helperText={
                                                        errors['title']
                                                            ? errors['title']
                                                                .message
                                                            : ''
                                                    }
                                                    {...register('title')}
                                                />
                                            </CustomizedInputsStyled>
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <SubHeaderText
                                                text="How will you pay Influencer? *"
                                                color="#282F53"
                                                customstyle={{ fontWeight: 600 }}
                                                error={errors["payout"]}
                                            />
                                                <CustomSelect
                                                defaultValue={validationService.payOptions[findIndexWithValue(1, validationService.payOptions)]}
                                                onChange={onChangeHandler}
                                                options={validationService.payOptions}
                                                name="payout"
                                            />
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <CustomizedInputsStyled
                                                required={true}
                                                label="Example / Inspo"
                                                error={errors['inspiration']}
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
                                                    placeholder={'Example'}
                                                    type={'text'}
                                                    inputProps={{
                                                        'aria-label': 'Example',
                                                    }}
                                                    required
                                                    error={!!errors['inspiration']}
                                                    helperText={
                                                        errors['inspiration']
                                                            ? errors['inspiration']
                                                                .message
                                                            : ''
                                                    }
                                                    {...register('inspiration')}
                                                />
                                            </CustomizedInputsStyled>
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField
                                            md={12}
                                            lg={12}
                                            style={{
                                                mt: '20px',
                                                mb: '5px',
                                            }}
                                        >
                                            <HeaderText
                                                text="Eligibility"
                                                color="#282F53"
                                            />
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField
                                            md={12}
                                            lg={12}
                                        >
                                            <SubHeaderText
                                                text="Social Media Channels *"
                                                color="#282F53"
                                                customstyle={{ fontWeight: 600 }}
                                                error={errors["socialMediaChannels"]}
                                                
                                            />
                                            <CustomSelect
                                                multi={true}
                                                defaultValue={filterSocialMediaOptions(campaign['socialMediaChannels'], validationService.socailOptions)}    
                                                onChange={onChangeHandler}
                                                options={validationService.socailOptions}
                                                name="socialMediaChannels"
                                            />
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <CustomizedInputsStyled
                                                required={true}
                                                label="Location"
                                                error={errors['locations']}
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
                                                    placeholder={
                                                        'Location'
                                                    }
                                                    type={'text'}
                                                    inputProps={{
                                                        'aria-label':
                                                            'Location',
                                                    }}
                                                    required
                                                    error={!!errors['locations']}
                                                    helperText={
                                                        errors['locations']
                                                            ? errors['locations']
                                                                .message
                                                            : ''
                                                    }
                                                    {...register('locations')}
                                                />
                                            </CustomizedInputsStyled>
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <SubHeaderText
                                                text="Audience Language *"
                                                color="#282F53"
                                                customstyle={{ fontWeight: 600 }}
                                                error={errors['audienceLanguage']}
                                            />
                                                <CustomSelect
                                                    defaultValue={validationService.LanguageOptions[findIndexWithValue(campaign['audienceLanguage'], validationService.LanguageOptions)]}
                                                onChange={onChangeHandler}
                                                options={validationService.LanguageOptions}
                                                name="audienceLanguage"
                                            />
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <SubHeaderText
                                                text="Audience Gender *"
                                                color="#282F53"
                                                customstyle={{ fontWeight: 600 }}
                                                error={errors['audienceGender']}
                                            />
                                                <CustomSelect
                                                defaultValue={validationService.genderOptions[findIndexWithValue(campaign['audienceGender'], validationService.genderOptions)]}
                                                onChange={onChangeHandler}
                                                options={validationService.genderOptions}
                                                name="audienceGender"
                                            />
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <SubHeaderText
                                                text="Audience Age *"
                                                color="#282F53"
                                                customstyle={{ fontWeight: 600 }}
                                                error={errors['audienceAge']}
                                            />
                                                <CustomSelect
                                                defaultValue={validationService.ageOptions[findIndexWithValue(campaign['audienceAge'], validationService.ageOptions)]}
                                                onChange={onChangeHandler}
                                                options={validationService.ageOptions}
                                                name="audienceAge"
                                            />
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField
                                            md={12}
                                            lg={12}
                                            style={{
                                                mt: '20px',
                                                mb: '5px',
                                            }}
                                        >
                                            <HeaderText
                                                text="Goals"
                                                color="#282F53"
                                            />
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <CustomizedInputsStyled
                                                required={true}
                                                label="Content Required (Stories, posts, etc.)"
                                                error={errors['contentRequirement']}
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
                                                    placeholder={
                                                        'Stories'
                                                    }
                                                    type={'text'}
                                                    inputProps={{
                                                        'aria-label':
                                                            'Stories',
                                                    }}
                                                    required
                                                    error={!!errors['contentRequirement']}
                                                    helperText={
                                                        errors['contentRequirement']
                                                            ? errors['contentRequirement']
                                                                .message
                                                            : ''
                                                    }
                                                    {...register('contentRequirement')}
                                                />
                                            </CustomizedInputsStyled>
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <SubHeaderText
                                                text="Min. Followers *"
                                                color="#282F53"
                                                customstyle={{ fontWeight: 600 }}
                                                error={errors['minFollowers']}
                                            />
                                                <CustomSelect
                                                    defaultValue={validationService.followersOptions[findIndexWithValue(campaign['minFollowers'], validationService.followersOptions)]}
                                                onChange={onChangeHandler}
                                                options={validationService.followersOptions}
                                                name="minFollowers"
                                            />
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <CustomizedInputsStyled
                                                required={true}
                                                label="Engage Rate"
                                                error={errors['engageRate']}
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
                                                    placeholder={'Engage Rate'}
                                                    type={'text'}
                                                    inputProps={{
                                                        'aria-label':
                                                            'Engage Rate',
                                                        onKeyDown:
                                                            validationService.onKeyDownNumber,
                                                    }}
                                                    required
                                                    error={!!errors['engageRate']}
                                                    helperText={
                                                        errors['engageRate']
                                                            ? errors['engageRate']
                                                                .message
                                                            : ''
                                                    }
                                                    {...register('engageRate')}
                                                />
                                            </CustomizedInputsStyled>
                                        </WrapperStandardTextField>

                                        <WrapperStandardTextField
                                            md={12}
                                            lg={12}
                                        >
                                            <LoadingButton
                                                variant="contained"
                                                loading={loading}
                                                type="submit"
                                                sx={{
                                                    backgroundColor: '#6c5ffc',
                                                    color: '#FFFFFF',
                                                    textTransform: 'capitalize',
                                                    mt: '20px',
                                                }}
                                            >
                                                Next
                                            </LoadingButton>
                                        </WrapperStandardTextField>
                                    </>
                                )}
                                {index === 1 && (
                                    <>
                                        <WrapperStandardTextField
                                            md={12}
                                            lg={12}
                                            style={{ mb: '20px' }}
                                        >
                                            <HeaderText
                                                text="Billing"
                                                color="#282F53"
                                            />
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <SubHeaderText
                                                text="Payout Method"
                                                color="#282F53"
                                                customstyle={{ fontWeight: 600 }}
                                                error={errors["paymentMethod"]}
                                            />
                                                <CustomSelect
                                                defaultValue={validationService.paymentMethodOptions[findIndexWithValue(campaign.billing['paymentMethod'], validationService.paymentMethodOptions)]}
                                                onChange={onChangeHandler}
                                                options={validationService.paymentMethodOptions}
                                                name="paymentMethod"
                                            />
                                        </WrapperStandardTextField>

                                        <WrapperStandardTextField>
                                            <CustomizedInputsStyled
                                                required={true}
                                                label="Max. Budget per influencer"
                                                error={errors['budgetPerInfluencer']}
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
                                                    placeholder={'1000 $'}
                                                    type={'text'}
                                                    inputProps={{
                                                        'aria-label': '1000 $',
                                                        onKeyDown:
                                                            validationService.onKeyDownNumber,
                                                    }}
                                                    required
                                                    error={
                                                        !!errors['budgetPerInfluencer']
                                                    }
                                                    helperText={
                                                        errors['budgetPerInfluencer']
                                                            ? errors[
                                                                'budgetPerInfluencer'
                                                            ].message
                                                            : ''
                                                    }
                                                    {...register('budgetPerInfluencer')}
                                                />
                                            </CustomizedInputsStyled>
                                        </WrapperStandardTextField>

                                        
                                        <WrapperStandardTextField>
                                            <CustomizedInputsStyled
                                                required={true}
                                                label="Total Budget for Campaign"
                                                error={errors['totalBudget']}
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
                                                    placeholder={'2000 $'}
                                                    type={'text'}
                                                    inputProps={{
                                                        'aria-label': '2000 $',
                                                        onKeyDown:
                                                            validationService.onKeyDownNumber,
                                                    }}
                                                    required
                                                    error={
                                                        !!errors['totalBudget']
                                                    }
                                                    helperText={
                                                        errors['totalBudget']
                                                            ? errors[
                                                                'totalBudget'
                                                            ].message
                                                            : ''
                                                    }
                                                    {...register(
                                                        'totalBudget',
                                                    )}
                                                />
                                            </CustomizedInputsStyled>
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <CustomizedInputsStyled
                                                required={true}
                                                label="Reach Estimation at Bottom"
                                                error={errors['reachEstimation']}
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
                                                    placeholder={'Estimation'}
                                                    type={'text'}
                                                    inputProps={{
                                                        'aria-label':
                                                            'Estimation',
                                                        onKeyDown:
                                                            validationService.onKeyDownNumber,
                                                    }}
                                                    required
                                                    error={
                                                        !!errors['reachEstimation']
                                                    }
                                                    helperText={
                                                        errors['reachEstimation']
                                                            ? errors[
                                                                'reachEstimation'
                                                            ].message
                                                            : ''
                                                    }
                                                    {...register('reachEstimation')}
                                                />
                                            </CustomizedInputsStyled>
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <SubHeaderText
                                                text="Deal Type"
                                                color="#282F53"
                                                customstyle={{ fontWeight: 600 }}
                                                error={errors['dealType']}
                                            />
                                                <CustomSelect
                                                defaultValue={validationService.dealTypeOptions[0]}
                                                onChange={onChangeHandler}
                                                options={validationService.dealTypeOptions}
                                                name="dealType"
                                            />
                                        </WrapperStandardTextField>
                                        <WrapperStandardTextField>
                                            <SubHeaderText
                                                text="Total Available Deals"
                                                color="#282F53"
                                                customstyle={{ fontWeight: 600 }}
                                                error={errors['totalDealsAvailable']}
                                            />
                                                <CustomSelect
                                                defaultValue={validationService.dealsOptions[findIndexWithValue(campaign.billing['totalDealsAvailable'], validationService.dealsOptions)]}
                                                onChange={onChangeHandler}
                                                options={validationService.dealsOptions}
                                                name="totalDealsAvailable"
                                            />
                                        </WrapperStandardTextField>
                                        
                                        <WrapperStandardTextField
                                            md={12}
                                            lg={12}
                                        >
                                            <LoadingButton
                                                variant="contained"
                                                type="submit"
                                                loading={loading}
                                                sx={{
                                                    backgroundColor: '#6c5ffc',
                                                    color: '#FFFFFF',
                                                    textTransform: 'capitalize',
                                                    mt: '20px',
                                                }}
                                            >
                                                Proceed to Checkout
                                            </LoadingButton>
                                        </WrapperStandardTextField>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            )}
            {index === 2 && (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        backgroundColor: '#FFFFFF',
                        mt: '20px',
                        padding: '30px 0px',
                        borderRadius: '7px',
                        boxShadow: '0px 8px 24px rgba(168, 180, 208, 0.1)',
                        height: '70vh',
                    }}
                >
                    <Grid
                    
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    
                    >
                        <Grid item xs="12" textAlign={"center"}>
                            <CheckCircleRoundedIcon
                                sx={{
                                    color: '#01AB3B',
                                    width: '40px',
                                    height: '40px',
                                }}
                            />
                        </Grid>
                        <Grid item xs="12" mt="20px" mb="10px" textAlign={"center"}>
                            <HeaderText text="Thank You for Updating the Campaign" />
                        </Grid>
                        <Grid item xs="12" textAlign={"center"}>
                            <SubHeaderText text="The payment link will be shared you soon" />
                        </Grid>
                        <Grid
                            item
                            sx={{
                                mt: '20px',
                            }}
                        >
                            <PrimaryBtn
                                text="Go Back"
                                fullWidth={true}
                                onClick={() => navigate('/campaign-records')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>}
        </>
    );
};

export default UpdateCampaign;
