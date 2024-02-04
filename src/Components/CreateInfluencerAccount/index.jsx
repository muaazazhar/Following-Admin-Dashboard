import {
    Box,
    Grid,
    IconButton,
    InputAdornment,
    InputBase,
    styled,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { object, string } from 'zod';
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
import { useNavigate } from 'react-router-dom';
import FormSubmitDialog from '../Popups/formSubmitDialog';
import authService from '../../services/authService';
import validationService from '../../services/validationService';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CreateInfluencerAccount = () => {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [userList, setUserList] = useState([]);
    const [errors, setErrors] = useState({});
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const [modal, setModal] = useState({ open: false });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const renderPasswordValue = (value) => {
        return showPassword ? value : '*'.repeat(value.length);
    };

    const handleClose = () => {
        if (modal.error) {
            setModal({ ...modal, open: false });
        } else {
            setModal({ ...modal, open: false });
            navigate('/influencer-records');
        }
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

    useEffect(() => {}, []);

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

        if (authService.validateEmail(formData.email)) {
            errors[`email_${index}`] = {
                message: authService.validateEmail(formData.email),
            };
        }
        if (authService.validatePassword(formData.password)) {
            errors[`password_${index}`] = {
                message: authService.validatePassword(formData.password),
            };
        }
        return errors;
    }

    const onSubmit = async (data, e) => {
        setLoading(true);
        e.preventDefault();
        setLoading(false);
        data = {
            ...data,
            username: data.email,
            contentCategory: data.contentCategory?.value,
            isLicensed: data.isLicensed,
            city: 'Islamabad',
        };
        console.log(data);
        if (data.socail_link_0) {
            data = { ...data, facebook: data.socail_link_0 };
        }
        if (data.socail_link_1) {
            data = { ...data, instagram: data.socail_link_1 };
        }
        if (data.socail_link_2) {
            data = { ...data, tiktok: data.socail_link_2 };
        }
        let requiredFields = [
            'username',
            'email',
            'name',
            'password',
            'phoneNumber',
            'isLicensed',
            'contentCategory',
            'city',
            "socail_link_0"
        ];
        let validatedFormData = validateFormData(data, requiredFields);
        data = { ...data, isLicensed: data.isLicensed?.value };
        setErrors(validatedFormData);
        console.log(validatedFormData);
        console.log(data);
        if (Object.entries(validatedFormData).length < 1) {
            try {
                const response = await dev.post('/signup', data, {
                    headers: {
                        token: user.token,
                    },
                });
                if (response.data) {
                    setIndex(2);
                    setLoading(false);
                    setModal({
                        text: 'Go Back',
                        open: true,
                        title: 'Verification In progress!',
                        description:
                            'Usually, the process takes 24 hrs. We will notify you as soon as your account will be verified.',
                    });
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
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            //reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onError = (errors, e) => console.log(errors, e);

    return (
        <Grid container sx={{ backgroundColor: '#F9F9F9', height: '100%' }}>
            <Loader loading={loading} />
            <FormSubmitDialog modal={modal} onClose={handleClose} />
            <HeaderWrapper>
                <HeaderText text="Influencer Management" />
            </HeaderWrapper>
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
                            boxShadow: '0px 8px 24px rgba(168, 180, 208, 0.1)',
                        }}
                    >
                        <Box sx={{ textAlign: 'center', width: '100%' }}>
                            <HeaderText text="Create Influencer Account" />
                        </Box>
                        <Grid
                            container
                            alignContent={'center'}
                            justifyContent="left"
                            direction="row"
                            alignItems="center"
                            mt="33px"
                        >
                            <WrapperStandardTextField>
                                <CustomizedInputsStyled
                                    label="Full Name"
                                    error={errors['name']}
                                    required={true}
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
                                        placeholder={'Full Name'}
                                        type={'text'}
                                        inputProps={{
                                            'aria-label': 'Name',
                                            onKeyDown:
                                                validationService.onKeyDownText,
                                        }}
                                        required
                                        error={!!errors['name']}
                                        helperText={
                                            errors['name']
                                                ? errors['name'].message
                                                : ''
                                        }
                                        {...register('name')}
                                    />
                                </CustomizedInputsStyled>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField>
                                <CustomizedInputsStyled
                                    label="Phone ( w/OTP)"
                                    error={errors['phoneNumber']}
                                    required={true}
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
                                        placeholder={'+971 ---'}
                                        type={'text'}
                                        inputProps={{
                                            'aria-label': 'phoneNumber',
                                        }}
                                        required
                                        error={!!errors['phoneNumber']}
                                        helperText={
                                            errors['phoneNumber']
                                                ? errors['phoneNumber'].message
                                                : ''
                                        }
                                        {...register('phoneNumber')}
                                    />
                                </CustomizedInputsStyled>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField>
                                <CustomizedInputsStyled
                                    label="Email"
                                    error={errors['email']}
                                    required={true}
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
                                        placeholder={'Email'}
                                        type={'email'}
                                        inputProps={{
                                            'aria-label': 'Email',
                                            autocomplete: 'new-email',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }}
                                        required
                                        error={!!errors['email']}
                                        helperText={
                                            errors['email']
                                                ? errors['email'].message
                                                : ''
                                        }
                                        {...register('email')}
                                    />
                                </CustomizedInputsStyled>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField>
                                <CustomizedInputsStyled
                                    label="Password"
                                    error={errors['password']}
                                    required={true}
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
                                        placeholder={'*****************'}
                                        //type={"password"}
                                        inputProps={{
                                            'aria-label': 'Password',
                                            autocomplete: 'new-password',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }}
                                        required
                                        error={!!errors['password']}
                                        helperText={
                                            errors['password']
                                                ? errors['password'].message
                                                : ''
                                        }
                                        {...register('password')}
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                    sx={{ mr: '5px' }}
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </CustomizedInputsStyled>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField>
                                <SubHeaderText
                                    customstyle={{ fontWeight: 600 }}
                                    text="Minimum Payout"
                                    required={true}
                                    color="#282F53"
                                    error={errors['minimumPayout']}
                                />
                                <CustomSelect
                                    onChange={onChangeHandler}
                                    placeholder="$1000"
                                    options={
                                        validationService.miniPayoutOptions
                                    }
                                    name="minimumPayout"
                                />
                            </WrapperStandardTextField>
                            <WrapperStandardTextField style={{ padding:"0px",marginTop:"19px"}}>
                                <div style={{ backgroundColor: "#FCFFF0", margin:"0px 26px", padding:"10px 14px" }}>
                                <CustomizedInputsStyled
                                    label="Influencer Score"
                                    error={errors['influencerScore']}
                                        
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
                                        placeholder={'12000'}
                                        type={'text'}
                                        inputProps={{
                                            'aria-label': '12000',
                                        }}
                                        required
                                        error={!!errors['influencerScore']}
                                        helperText={
                                            errors['influencerScore']
                                                ? errors['influencerScore'].message
                                                : ''
                                        }
                                        {...register('influencerScore')}
                                    />
                                    </CustomizedInputsStyled>
                                    </div>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField
                                md={12}
                                lg={12}
                                style={{ mt: '0px', mb: '5px', pt:"0px" }}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <SubHeaderText
                                        customstyle={{ fontWeight: 600 }}
                                        text="Social Media Links"
                                        color="#282F53"
                                    />
                                    <Box>
                                        <SubHeaderText
                                            text="+Add Social Link"
                                            color="#6c5ffc"
                                            customstyle={{fontWeight: 600}}
                                        />
                                    </Box>
                                </Grid>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField md={12} lg={12}>
                                <CustomizedInputsStyled hideLable={true} error={errors['socail_link_0']}>
                                    <InputBase
                                        fullWidth
                                        sx={{
                                            ml: 2,
                                            flex: 1,
                                            color: '#808080',
                                            fontSize: '14px',
                                            lineHeight: '21px',
                                        }}
                                        placeholder={'https://www.'}
                                        type={'text'}
                                        inputProps={{
                                            'aria-label': 'Social Media Links',
                                        }}
                                        required
                                        error={!!errors['socail_link_0']}
                                        helperText={
                                            errors['socail_link_0']
                                                ? errors['socail_link_0']
                                                      .message
                                                : ''
                                        }
                                        {...register('socail_link_0')}
                                    />
                                </CustomizedInputsStyled>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField md={12} lg={12}>
                                <CustomizedInputsStyled hideLable={true}>
                                    <InputBase
                                        fullWidth
                                        sx={{
                                            ml: 2,
                                            flex: 1,
                                            color: '#808080',
                                            fontSize: '14px',
                                            lineHeight: '21px',
                                        }}
                                        placeholder={'https://www.'}
                                        type={'text'}
                                        inputProps={{
                                            'aria-label': 'Social Media Links',
                                        }}
                                        required
                                        error={!!errors['socail_link_1']}
                                        helperText={
                                            errors['socail_link_1']
                                                ? errors['socail_link_1']
                                                      .message
                                                : ''
                                        }
                                        {...register('socail_link_1')}
                                    />
                                </CustomizedInputsStyled>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField md={12} lg={12}>
                                <CustomizedInputsStyled hideLable={true}>
                                    <InputBase
                                        fullWidth
                                        sx={{
                                            ml: 2,
                                            flex: 1,
                                            color: '#808080',
                                            fontSize: '14px',
                                            lineHeight: '21px',
                                        }}
                                        placeholder={'https://www.'}
                                        type={'text'}
                                        inputProps={{
                                            'aria-label': 'Social Media Links',
                                        }}
                                        required
                                        error={!!errors['socail_link_2']}
                                        helperText={
                                            errors['socail_link_2']
                                                ? errors['socail_link_2']
                                                      .message
                                                : ''
                                        }
                                        {...register('socail_link_2')}
                                    />
                                </CustomizedInputsStyled>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField>
                                <SubHeaderText
                                    customstyle={{ fontWeight: 600 }}
                                    text="Licensed or Not"
                                    required={true}
                                    color="#282F53"
                                    error={errors['isLicensed']}
                                />
                                <CustomSelect
                                    onChange={onChangeHandler}
                                    placeholder="Licensed"
                                    options={validationService.LicensedOptions}
                                    name="isLicensed"
                                />
                            </WrapperStandardTextField>
                            <WrapperStandardTextField>
                                <SubHeaderText
                                    customstyle={{ fontWeight: 600 }}
                                    text="Content Category"
                                    required={true}
                                    color="#282F53"
                                    error={errors['contentCategory']}
                                />
                                <CustomSelect
                                    onChange={onChangeHandler}
                                    placeholder="Select Category"
                                    options={
                                        validationService.ContentCategoryOptions
                                    }
                                    name="contentCategory"
                                />
                            </WrapperStandardTextField>
                            <WrapperStandardTextField md={12} lg={12}>
                                <CustomizedInputsStyled
                                    height={'100%'}
                                    label="Audience Details"
                                    error={errors['details']}
                                >
                                    <InputBase
                                        fullWidth
                                        multiline
                                        rows={4}
                                        sx={{
                                            ml: 2,
                                            flex: 1,
                                            color: '#808080',
                                            fontSize: '14px',
                                            lineHeight: '21px',
                                        }}
                                        placeholder={'Detail...'}
                                        type={'text'}
                                        inputProps={{
                                            'aria-label': 'Detail...',
                                        }}
                                        required
                                        error={!!errors['details']}
                                        helperText={
                                            errors['details']
                                                ? errors['details'].message
                                                : ''
                                        }
                                        {...register('details')}
                                    />
                                </CustomizedInputsStyled>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField md={12} lg={12}>
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
                                    Create
                                </LoadingButton>
                            </WrapperStandardTextField>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};
export default CreateInfluencerAccount;
