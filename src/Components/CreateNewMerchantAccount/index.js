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
import FormSubmitDialog from '../Popups/formSubmitDialog';
import validationService from '../../services/validationService';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleMapPicker from '../MapPicker';
import full_map from '../../assets/full_map.png';

const registerSchema = object({
    name: string()
        .nonempty('Name is required')
        .max(32, 'Name must be less than 100 characters'),
});

const CreateNewMerchantAccount = () => {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [userList, setUserList] = useState([]);
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState({ open: false });
    const navigate = useNavigate();

    const handleClickOpen = (data) => {
        setModal(data);
    };

    const handleClose = () => {
        if (modal.error) {
            setModal({ ...modal, open: false });
        } else {
            setModal({ ...modal, open: false });
            navigate('/user-management-module');
        }
        setLoading(false);
    };

    const options = [
        {
            value: 1,
            label: 1,
        },
        {
            value: 2,
            label: 2,
        },
        {
            value: 3,
            label: 3,
        },
        {
            value: 4,
            label: 4,
        },
    ];
    const [noOfUsers, setNoOfUsers] = useState(options[0]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        dev.get(`/roles`, {
            headers: {
                token: user.token,
            },
        })
            .then((response) => {
                setRoles(
                    response.data.roles.map((data) => {
                        return { label: data.name, value: data.id };
                    }),
                );
                setNoOfUsers(options[0]);
            })
            .catch((error) => console.log(error));
    }, []);

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
        if (name === 'no_of_users') setNoOfUsers(e);
    };

    const handleFormChange = (event) => {
        console.log(event);
        if (event?.target?.name) {
            const { [event.target.name]: tmp, ...rest } = errors;
            setErrors(rest);
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            //reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    useEffect(() => {
        if (noOfUsers.value > 0) {
            setUserList(
                Array(noOfUsers.value).fill({
                    email: '',
                    password: '',
                    showPassword: false,
                    roleId: roles.length ? roles[0].value : 3,
                }),
            );
        }
    }, [noOfUsers]);

    function validateFormData(formData) {
        console.log(formData);
        let errors = {};
        // Define the required fields
        const requiredFields = [
            'merchantLogo',
            'name',
            'address',
            'contactName',
            'contactNumber',
            'merchantTradeLicense',
            'merchantAdditionalDocuments',
            'merchantContract',
            'setupFees',
            'annualFees',
            'latitude',
            'longitude',
        ];

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

        userList.forEach((user, index) => {
            if (authService.validateEmail(user.email)) {
                errors[`email_${index}`] = {
                    message: authService.validateEmail(user.email),
                };
            }
            if (authService.validatePassword(user.password)) {
                errors[`password_${index}`] = {
                    message: authService.validatePassword(user.password),
                };
            }
        });

        return errors;
    }

    const onSubmit = async (data, e) => {
        setLoading(true);
        e.preventDefault();

        data = { ...data, latitude: '53.641777', longitude: '-1.785193' };
        delete data.no_of_users;
        delete data.user_role_0;
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (data[key] instanceof FileList) {
                // Check if it's a FileList (multiple files)
                if (data[key].length > 0) {
                    // Append only the first file from the FileList
                    formData.append(key, data[key][0]);
                }
            } else if (data[key] instanceof File) {
                // Check if it's a single File
                formData.append(key, data[key]);
            } else {
                // For non-File data, simply append it
                formData.append(key, data[key]);
            }
        });
        const validatedFormData = validateFormData(data);
        setErrors(validatedFormData);
        if (Object.entries(validatedFormData).length < 1) {
            try {
                const response = await dev.post('/merchant', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token: user.token,
                    },
                });
                const merchant = response.data.merchant;
                if (merchant.id) {
                    const result = await dev.post(
                        `/merchant/${merchant.id}/merchantUser`,
                        { users: userList },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                token: user.token,
                            },
                        },
                    );
                    if (result) {
                        setLoading(false);
                        setModal({
                            open: true,
                            title: 'Merchant Created Successfully',
                        });
                    }
                }
            } catch (error) {
                // Handle errors
                console.error('Error:', error);
                setLoading(false);
                setModal({ error: true, open: true, title: error });
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

    const updateUserProperty = (index, property, value) => {
        let newArr = userList.map((item, i) => {
            if (index == i) {
                return { ...item, [property]: value };
            } else {
                return item;
            }
        });
        setUserList(newArr);
    };

    return (
        <Grid container sx={{ height: '100%' }}>
            <FormSubmitDialog modal={modal} onClose={handleClose} />
            <Loader loading={loading} />
            <HeaderWrapper>
                <HeaderText
                    text="User Management"
                    color="#272727"
                    style={{
                        fontWeight: 700,
                        fontSize: '32px',
                        lineHeight: '32px',
                    }}
                />
            </HeaderWrapper>
            <Grid xs={12}>
                <form
                    onSubmit={handleSubmit(onSubmit, onError)}
                    //onInput={handleFormChange}
                    id="user-form"
                    noValidate
                    autoComplete="on"
                >
                    <Grid
                        xs={12}
                        sx={{
                            padding: '30px 0px 30px 0px',
                        }}
                    >
                        <Box sx={{ textAlign: 'start', width: '100%' }}>
                            <HeaderText text="Create Merchant Account" />
                        </Box>
                        <Grid
                            container
                            alignContent={'center'}
                            justifyContent="left"
                            direction="row"
                            alignItems="start"
                            mt="33px"
                        >
                            <WrapperStandardTextField>
                                <CustomizedInputsStyled
                                    required={true}
                                    label="Logo"
                                    error={errors['merchantLogo']}
                                    type="file"
                                >
                                    <SubHeaderText
                                        customstyle={{
                                            flex: 1,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            '&:hover': {
                                                color: '#282f53',
                                                fontWeight: 800,
                                            },
                                        }}
                                        color="#495057"
                                        text={
                                            watch('merchantLogo')?.length
                                                ? watch('merchantLogo')[0]?.name
                                                : 'Select Image Type File'
                                        }
                                    />
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*"
                                        required
                                        error={!!errors['merchantLogo']}
                                        helperText={
                                            errors['merchantLogo']
                                                ? errors['merchantLogo'].message
                                                : ''
                                        }
                                        {...register('merchantLogo')}
                                    />
                                </CustomizedInputsStyled>

                                <CustomizedInputsStyled
                                    required={true}
                                    label="Name"
                                    error={errors['name']}
                                    mt="10px"
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
                                        placeholder={'Name'}
                                        type={'text'}
                                        inputProps={{
                                            'aria-label': 'Name',
                                            inputMode: 'text',
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

                                <CustomizedInputsStyled
                                    required={true}
                                    label="Address"
                                    error={errors['country']}
                                    mt="10px"
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
                                        inputProps={{ 'aria-label': 'Country' }}
                                        required
                                        error={!!errors['country']}
                                        helperText={
                                            errors['country']
                                                ? errors['country'].message
                                                : ''
                                        }
                                        {...register('country')}
                                    />
                                </CustomizedInputsStyled>
                                <CustomizedInputsStyled
                                    required={true}
                                    label="Address"
                                    hideLable={true}
                                    error={errors['city']}
                                    mt="28px"
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
                                        inputProps={{ 'aria-label': 'City' }}
                                        required
                                        error={!!errors['city']}
                                        helperText={
                                            errors['city']
                                                ? errors['city'].message
                                                : ''
                                        }
                                        {...register('city')}
                                    />
                                </CustomizedInputsStyled>
                                <CustomizedInputsStyled
                                    required={true}
                                    label="Area"
                                    hideLable={true}
                                    error={errors['area']}
                                    mt="30px"
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
                                        placeholder={'Area'}
                                        type={'text'}
                                        inputProps={{ 'aria-label': 'Area' }}
                                        required
                                        error={!!errors['area']}
                                        helperText={
                                            errors['area']
                                                ? errors['area'].message
                                                : ''
                                        }
                                        {...register('area')}
                                    />
                                </CustomizedInputsStyled>
                                <img
                                    src={full_map}
                                    width={'100%'}
                                    style={{ marginTop: '25px' }}
                                />
                            </WrapperStandardTextField>
                            <WrapperStandardTextField
                                style={{ paddingRight: '50px' }}
                            >
                                <CustomizedInputsStyled
                                    required={true}
                                    label="Contact Name"
                                    error={errors['contactName']}
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
                                        placeholder={'Contact Name'}
                                        type={'text'}
                                        inputProps={{
                                            'aria-label': 'Contact Name',
                                            onKeyDown:
                                                validationService.onKeyDownText,
                                        }}
                                        required
                                        error={!!errors['contactName']}
                                        helperText={
                                            errors['contactName']
                                                ? errors['contactName'].message
                                                : ''
                                        }
                                        {...register('contactName')}
                                    />
                                </CustomizedInputsStyled>
                                <CustomizedInputsStyled
                                    required={true}
                                    label="Contact Person Contact Number"
                                    error={errors['contactNumber']}
                                    mt="10px"
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
                                        placeholder={'Contact Number'}
                                        type={'text'}
                                        inputProps={{
                                            'aria-label': 'Contact Number',
                                            inputMode: 'text',
                                            maxLength: 14,
                                            onKeyDown:
                                                validationService.onKeyDownNumber,
                                        }}
                                        required
                                        error={!!errors['contactNumber']}
                                        helperText={
                                            errors['contactNumber']
                                                ? errors['contactNumber']
                                                      .message
                                                : ''
                                        }
                                        {...register('contactNumber')}
                                    />
                                </CustomizedInputsStyled>

                                <CustomizedInputsStyled
                                    required={true}
                                    label="Trade License Upload"
                                    error={errors['merchantTradeLicense']}
                                    type="file"
                                    mt={'10px'}
                                >
                                    <SubHeaderText
                                        customstyle={{
                                            flex: 1,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            '&:hover': {
                                                color: '#282f53',
                                                fontWeight: 800,
                                            },
                                        }}
                                        color="#495057"
                                        text={
                                            watch('merchantTradeLicense')
                                                ?.length
                                                ? watch(
                                                      'merchantTradeLicense',
                                                  )[0]?.name
                                                : 'Select Image Type File'
                                        }
                                    />
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*,application/pdf"
                                        required
                                        error={!!errors['merchantTradeLicense']}
                                        helperText={
                                            errors['merchantTradeLicense']
                                                ? errors['merchantTradeLicense']
                                                      .message
                                                : ''
                                        }
                                        {...register('merchantTradeLicense')}
                                    />
                                </CustomizedInputsStyled>

                                <CustomizedInputsStyled
                                    required={true}
                                    label="Additional Documents Upload"
                                    error={
                                        errors['merchantAdditionalDocuments']
                                    }
                                    type="file"
                                    mt="10px"
                                >
                                    <SubHeaderText
                                        customstyle={{
                                            flex: 1,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            '&:hover': {
                                                color: '#282f53',
                                                fontWeight: 800,
                                            },
                                        }}
                                        color="#495057"
                                        text={
                                            watch('merchantAdditionalDocuments')
                                                ?.length
                                                ? watch(
                                                      'merchantAdditionalDocuments',
                                                  )[0]?.name
                                                : 'Select Image Type File'
                                        }
                                    />
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*,application/pdf"
                                        required
                                        error={
                                            !!errors[
                                                'merchantAdditionalDocuments'
                                            ]
                                        }
                                        helperText={
                                            errors[
                                                'merchantAdditionalDocuments'
                                            ]
                                                ? errors[
                                                      'merchantAdditionalDocuments'
                                                  ].message
                                                : ''
                                        }
                                        {...register(
                                            'merchantAdditionalDocuments',
                                        )}
                                    />
                                </CustomizedInputsStyled>

                                <CustomizedInputsStyled
                                    required={true}
                                    label="Contract Upload"
                                    error={errors['merchantContract']}
                                    type="file"
                                    mt="10px"
                                >
                                    <SubHeaderText
                                        customstyle={{
                                            flex: 1,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            '&:hover': {
                                                color: '#282f53',
                                                fontWeight: 800,
                                            },
                                        }}
                                        color="#495057"
                                        text={
                                            watch('merchantContract')?.length
                                                ? watch('merchantContract')[0]
                                                      ?.name
                                                : 'Select Image Type File'
                                        }
                                    />
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*,application/pdf"
                                        required
                                        error={!!errors['merchantContract']}
                                        helperText={
                                            errors['merchantContract']
                                                ? errors['merchantContract']
                                                      .message
                                                : ''
                                        }
                                        {...register('merchantContract')}
                                    />
                                </CustomizedInputsStyled>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField
                                md={12}
                                lg={12}
                                style={{
                                    mt: '60px',
                                    padding: '25px',
                                    borderRadius: '7px',
                                    backgroundColor: '#272727',
                                    border: '1px solid #272727',
                                    boxSizing: 'border-box',
                                }}
                            >
                                <HeaderText
                                    text="Payment Rates"
                                    color="#FFFFFF"
                                />
                            </WrapperStandardTextField>
                            <WrapperStandardTextField
                                style={{
                                    paddingRight: { md: '0px', lg: '10px' },
                                }}
                            >
                                <CustomizedInputsStyled
                                    required={true}
                                    label="Setup Fees"
                                    error={errors['setupFees']}
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
                                        placeholder={'Setup Fees'}
                                        type="text"
                                        inputProps={{
                                            'aria-label': 'Setup Fees',
                                            inputMode: 'text',
                                            maxLength: 7,
                                            onKeyDown:
                                                validationService.onKeyDownNumber,
                                        }}
                                        required
                                        error={!!errors['setupFees']}
                                        helperText={
                                            errors['setupFees']
                                                ? errors['setupFees'].message
                                                : ''
                                        }
                                        {...register('setupFees')}
                                    />
                                </CustomizedInputsStyled>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField
                                style={{
                                    paddingRight: '0px',
                                }}
                            >
                                <CustomizedInputsStyled
                                    required={true}
                                    label="Annual Fees"
                                    error={errors['annualFees']}
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
                                        placeholder={'Annual Fees'}
                                        type="text"
                                        inputProps={{
                                            'aria-label': 'Annual Fees',
                                            inputMode: 'text',
                                            maxLength: 7,
                                            onKeyDown:
                                                validationService.onKeyDownNumber,
                                        }}
                                        required
                                        error={!!errors['annualFees']}
                                        helperText={
                                            errors['annualFees']
                                                ? errors['annualFees'].message
                                                : ''
                                        }
                                        {...register('annualFees')}
                                    />
                                </CustomizedInputsStyled>
                            </WrapperStandardTextField>
                            <WrapperStandardTextField
                                md={12}
                                lg={12}
                                style={{
                                    mt: '10px',
                                    mb: '5px',
                                }}
                            >
                                <HeaderText
                                    text="User to be Created"
                                    color="#282F53"
                                />
                            </WrapperStandardTextField>
                            <WrapperStandardTextField
                                lg={12}
                                style={{
                                    paddingRight: '0px',
                                }}
                            >
                                <SubHeaderText
                                    required={true}
                                    text="Select No of Users"
                                    color="#282F53"
                                    customstyle={{ fontWeight: 600 }}
                                />
                                <CustomSelect
                                    defaultValue={options[0]}
                                    onChange={onChangeHandler}
                                    options={options}
                                    name="no_of_users"
                                />
                            </WrapperStandardTextField>
                        </Grid>
                    </Grid>
                    <WrapperStandardTextField
                        md={12}
                        lg={12}
                        style={{
                            padding: '25px',
                            borderRadius: '7px',
                            backgroundColor: '#272727',
                            border: '1px solid #272727',
                            boxSizing: 'border-box',
                        }}
                    >
                        <HeaderText
                            text="Details of Selected Users"
                            color="#FFFFFF"
                        />
                    </WrapperStandardTextField>
                    {userList.map((user, index) => {
                        return (
                            <Grid
                                xs={12}
                                sx={{
                                    backgroundColor: '#FFFFFF',
                                    mt: index ? '20px' : '10px',
                                    padding: '20px 25px',
                                    borderRadius: '7px',
                                    backgroundColor: '#fff',
                                    border: '1px solid #e7e5e5',
                                    boxSizing: 'border-box',
                                }}
                            >
                                <Grid
                                    container
                                    alignContent={'center'}
                                    justifyContent="left"
                                    direction="row"
                                    alignItems="center"
                                >
                                    <WrapperStandardTextField
                                        style={{
                                            paddingRight: {
                                                md: '0px',
                                                lg: '10px',
                                            },
                                        }}
                                    >
                                        <CustomizedInputsStyled
                                            required={true}
                                            label="Email"
                                            error={errors[`email_${index}`]}
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
                                                type={`email`}
                                                inputProps={{
                                                    'aria-label': 'Email',
                                                }}
                                                required
                                                onChange={(e) =>
                                                    updateUserProperty(
                                                        index,
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </CustomizedInputsStyled>
                                    </WrapperStandardTextField>
                                    <WrapperStandardTextField
                                        style={{
                                            paddingRight: {
                                                md: '0px',
                                                lg: '0px',
                                            },
                                        }}
                                    >
                                        <CustomizedInputsStyled
                                            required={true}
                                            label="Password"
                                            error={errors[`password_${index}`]}
                                        >
                                            <InputBase
                                                autoComplete={false}
                                                fullWidth
                                                sx={{
                                                    ml: 2,
                                                    flex: 1,
                                                    color: '#808080',
                                                    fontSize: '14px',
                                                    lineHeight: '21px',
                                                }}
                                                placeholder={'Password'}
                                                type={
                                                    userList[index].showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() =>
                                                                updateUserProperty(
                                                                    index,
                                                                    'showPassword',
                                                                    !userList[
                                                                        index
                                                                    ]
                                                                        .showPassword,
                                                                )
                                                            }
                                                            onMouseDown={
                                                                handleMouseDownPassword
                                                            }
                                                            edge="end"
                                                            sx={{ mr: '5px' }}
                                                        >
                                                            {userList[index]
                                                                .showPassword ? (
                                                                <VisibilityOff />
                                                            ) : (
                                                                <Visibility />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{
                                                    autocomplete:
                                                        'new-password',
                                                    form: {
                                                        autocomplete: 'off',
                                                    },
                                                }}
                                                onChange={(e) =>
                                                    updateUserProperty(
                                                        index,
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                        </CustomizedInputsStyled>
                                    </WrapperStandardTextField>
                                    <WrapperStandardTextField
                                        lg={12}
                                        style={{
                                            paddingRight: {
                                                md: '0px',
                                                lg: '10px',
                                            },
                                        }}
                                    >
                                        <SubHeaderText
                                            text="Role of Account"
                                            color="#282F53"
                                            customstyle={{ fontWeight: 600 }}
                                        />
                                        <CustomSelect
                                            onChange={(data) =>
                                                updateUserProperty(
                                                    index,
                                                    'roleId',
                                                    data.value,
                                                )
                                            }
                                            options={roles}
                                            name={`user_role_${index}`}
                                            placeholder="Select Role"
                                        />
                                    </WrapperStandardTextField>
                                    {index === noOfUsers.value - 1 && (
                                        <WrapperStandardTextField
                                            md={12}
                                            lg={12}
                                        >
                                            <LoadingButton
                                                variant="contained"
                                                type="submit"
                                                loading={loading}
                                                sx={{
                                                    backgroundColor: '#272727',
                                                    color: '#FFFFFF',
                                                    textTransform: 'capitalize',
                                                    mt: '20px',
                                                }}
                                            >
                                                Create
                                            </LoadingButton>
                                        </WrapperStandardTextField>
                                    )}
                                </Grid>
                            </Grid>
                        );
                    })}
                </form>
            </Grid>
        </Grid>
    );
};

export default CreateNewMerchantAccount;
