import { Box, Grid, InputBase, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import HeaderText from '../Text/HeaderText';
import CustomizedInputsStyled from '../Text/StandardTextField';
import SubHeaderText from '../Text/SubHeaderText';
import WrapperStandardTextField from '../Wrapper/WrapperStandardTextField';
import CustomSelect from '../Input/CustomSelect';
import validationService from '../../services/validationService';
import PreLabel from '../Text/PreLabel';
import ig_icon from '../../assets/ig_icon.png';
import in_icon from '../../assets/in_icon.png';
import tt_icon from '../../assets/tt_icon.png';
import sc_icon from '../../assets/sc_icon.png';
import yt_icon from '../../assets/yt_icon.png';
import info_light from '../../assets/info_light.png';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

const CampaignStep1 = ({
    onChangeHandler,
    errors,
    register,
    setRequiredFields,
    setPayoutType,
    payoutType,
    socialMediaChannels,
    setSocialMediaChannels,
}) => {
    useEffect(() => {
        setRequiredFields([
            'audienceAge',
            'audienceGender',
            'audienceLanguage',
            'contentCategory',
            'message',
            'socialMediaChannels',
            'title',
        ]);
    }, []);

    const handleSocialMediaChannels = (name) => {
        let temp = [];
        if (socialMediaChannels?.includes(name)) {
            temp = socialMediaChannels.filter((smc) => smc !== name);
            setSocialMediaChannels(temp);
        } else {
            if (socialMediaChannels?.length) {
                setSocialMediaChannels([...socialMediaChannels, name]);
            } else {
                setSocialMediaChannels([name]);
            }
        }
    };

    return (
        <>
            <HeaderText text="Create Campaign" color="#282F53" />
            <WrapperStandardTextField
                lg={12}
                style={{ paddingRight: '0px', paddingTop: '20px' }}
            >
                <Grid container spacing={2} alignItems="center" direction="row">
                    <Grid item xs={6}>
                        <PreLabel label={'Campaign Id'} />
                        <CustomizedInputsStyled
                            color="#272727"
                            required={true}
                            label="ID"
                            error={errors['id']}
                        >
                            <InputBase
                                fullWidth
                                disabled
                                sx={{
                                    ml: 2,
                                    flex: 1,
                                    color: '#808080',
                                    fontSize: '14px',
                                    lineHeight: '21px',
                                }}
                                placeholder={'Id'}
                                type={'text'}
                                value={'123445'}
                                inputProps={{
                                    'aria-label': 'Title',
                                }}
                                required
                                error={!!errors['id']}
                                helperText={
                                    errors['id'] ? errors['id'].message : ''
                                }
                                {...register('id')}
                            />
                        </CustomizedInputsStyled>
                    </Grid>
                    <Grid item xs={6}>
                        <PreLabel label={'Campaign Title'} />
                        <CustomizedInputsStyled
                            color="#272727"
                            required={true}
                            label="Please Enter Campaign Title"
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
                                        ? errors['title'].message
                                        : ''
                                }
                                {...register('title')}
                            />
                        </CustomizedInputsStyled>
                    </Grid>
                </Grid>
            </WrapperStandardTextField>
            <WrapperStandardTextField
                style={{ paddingRight: '10px', paddingTop: '20px' }}
            >
                <PreLabel label={'Age'} />
                <SubHeaderText
                    text="Influencer age *"
                    color="#282F53"
                    customstyle={{
                        fontWeight: 600,
                    }}
                    error={errors['audienceAge']}
                />
                <CustomSelect
                    onChange={onChangeHandler}
                    placeholder="Select Age"
                    options={validationService.ageOptions}
                    name="audienceAge"
                />
            </WrapperStandardTextField>
            <WrapperStandardTextField
                style={{ paddingRight: '0px', paddingTop: '20px' }}
            >
                <PreLabel label={'Gender'} />
                <SubHeaderText
                    text="Influencer gender *"
                    color="#282F53"
                    customstyle={{
                        fontWeight: 600,
                    }}
                    error={errors['audienceGender']}
                />
                <CustomSelect
                    onChange={onChangeHandler}
                    placeholder="Select Gender"
                    options={validationService.genderOptions}
                    name="audienceGender"
                />
            </WrapperStandardTextField>

            <WrapperStandardTextField
                lg={12}
                style={{ paddingRight: '0px', paddingTop: '20px' }}
            >
                <PreLabel label={'Content Category'} />
                <SubHeaderText
                    customstyle={{ fontWeight: 600 }}
                    text="Influencer Content Category"
                    required={true}
                    color="#282F53"
                    error={errors['contentCategory']}
                />
                <CustomSelect
                    onChange={onChangeHandler}
                    placeholder="Select Content Category"
                    options={validationService.ContentCategoryOptions}
                    name="contentCategory"
                />
            </WrapperStandardTextField>
            <WrapperStandardTextField
                lg={12}
                style={{ paddingRight: '0px', paddingTop: '20px' }}
            >
                <PreLabel label={'Message/Theme?'} />
                <CustomizedInputsStyled
                    color="#272727"
                    required={true}
                    label="What message / theme do you want to portray?"
                    error={errors['message']}
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
                        placeholder={'Your Message'}
                        type={'text'}
                        inputProps={{
                            'aria-label': 'Your Message',
                        }}
                        required
                        error={!!errors['message']}
                        helperText={
                            errors['message'] ? errors['message'].message : ''
                        }
                        {...register('message')}
                    />
                </CustomizedInputsStyled>
            </WrapperStandardTextField>
            <WrapperStandardTextField
                lg={12}
                style={{ paddingRight: '0px', paddingTop: '20px' }}
            >
                <PreLabel label={'Campaign Enrolment Type'} />
                <SubHeaderText
                    text="Choose Your Enrolment Type "
                    color="#272727"
                    customstyle={{
                        fontWeight: 600,
                    }}
                    error={errors['payout']}
                    required={true}
                />
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    mt="20px"
                >
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        ml="5px"
                        onClick={() => setPayoutType('In-store / Walk-in')}
                    >
                        {payoutType === 'In-store / Walk-in' ? (
                            <CheckCircleOutlineRoundedIcon
                                fontSize="large"
                                sx={{ color: '#01AB3B' }}
                            />
                        ) : (
                            <RadioButtonUncheckedRoundedIcon
                                fontSize="large"
                                sx={{ color: '#272727' }}
                            />
                        )}
                        <SubHeaderText
                            text="In-store / Walk-in"
                            color="#272727"
                            customstyle={{ margin: '0px 3px 0px 5px' }}
                        />
                    </Box>
                    <img src={info_light} width={'11px'} />
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        ml="40px"
                        onClick={() => setPayoutType('PR Delivery')}
                    >
                        {payoutType !== 'In-store / Walk-in' && payoutType ? (
                            <CheckCircleOutlineRoundedIcon
                                fontSize="large"
                                sx={{ color: '#01AB3B' }}
                            />
                        ) : (
                            <RadioButtonUncheckedRoundedIcon
                                fontSize="large"
                                sx={{ color: '#272727' }}
                            />
                        )}
                        <SubHeaderText
                            text="PR Delivery"
                            color="#272727"
                            customstyle={{ margin: '0px 3px 0px 5px' }}
                        />
                    </Box>
                    <img src={info_light} width={'11px'} />
                </Grid>
            </WrapperStandardTextField>
            <WrapperStandardTextField
                lg={12}
                style={{ paddingRight: '0px', paddingTop: '20px' }}
            >
                <PreLabel label={'Platforms'} />
                <SubHeaderText
                    text="Select Platforms for Campaign "
                    color="#272727"
                    customstyle={{
                        fontWeight: 600,
                    }}
                    error={errors['socialMediaChannels']}
                    required={true}
                />
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    mt="20px"
                    columnGap={8}
                    rowGap={8}
                >
                    <Box
                        justifyContent={'center'}
                        alignItems="center"
                        sx={{
                            padding: '10px',
                            borderRadius: '20px',
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #e7e5e5',
                            boxSizing: 'border-box',
                            height: '176px',
                            width: '176px',
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="end"
                        >
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                    handleSocialMediaChannels('instagram')
                                }
                            >
                                {socialMediaChannels?.includes('instagram') ? (
                                    <CheckCircleOutlineRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#01AB3B' }}
                                    />
                                ) : (
                                    <RadioButtonUncheckedRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#272727' }}
                                    />
                                )}
                            </span>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            mt="7px"
                        >
                            <img src={ig_icon} width={'60px'} />
                            <SubHeaderText
                                text="Instagram"
                                color="#272727"
                                customstyle={{
                                    lineHeight: '21px',
                                    fontWeight: 600,
                                }}
                            />
                        </Grid>
                    </Box>
                    <Box
                        justifyContent={'center'}
                        alignItems="center"
                        sx={{
                            padding: '10px',
                            borderRadius: '20px',
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #e7e5e5',
                            boxSizing: 'border-box',
                            height: '176px',
                            width: '176px',
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="end"
                        >
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                    handleSocialMediaChannels('tiktok')
                                }
                            >
                                {socialMediaChannels?.includes('tiktok') ? (
                                    <CheckCircleOutlineRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#01AB3B' }}
                                    />
                                ) : (
                                    <RadioButtonUncheckedRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#272727' }}
                                    />
                                )}
                            </span>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            mt="7px"
                        >
                            <img src={tt_icon} width={'60px'} />
                            <SubHeaderText
                                text="TikTok"
                                color="#272727"
                                customstyle={{
                                    lineHeight: '21px',
                                    fontWeight: 600,
                                }}
                            />
                        </Grid>
                    </Box>
                    <Box
                        justifyContent={'center'}
                        alignItems="center"
                        sx={{
                            padding: '10px',
                            borderRadius: '20px',
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #e7e5e5',
                            boxSizing: 'border-box',
                            height: '176px',
                            width: '176px',
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="end"
                        >
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                    handleSocialMediaChannels('snapchat')
                                }
                            >
                                {socialMediaChannels?.includes('snapchat') ? (
                                    <CheckCircleOutlineRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#01AB3B' }}
                                    />
                                ) : (
                                    <RadioButtonUncheckedRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#272727' }}
                                    />
                                )}
                            </span>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            mt="7px"
                        >
                            <img src={sc_icon} width={'60px'} />
                            <SubHeaderText
                                text="Snapchat"
                                color="#272727"
                                customstyle={{
                                    lineHeight: '21px',
                                    fontWeight: 600,
                                }}
                            />
                        </Grid>
                    </Box>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            padding: '10px',
                            borderRadius: '20px',
                            backgroundColor: '#cecece',
                            border: '1px solid #e7e5e5',
                            boxSizing: 'border-box',
                            height: '176px',
                            width: '176px',
                        }}
                    >
                        <Tooltip title="This will be added in the near future">
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <img src={in_icon} width={'60px'} />
                                <SubHeaderText
                                    text="Linkedin"
                                    color="#272727"
                                    customstyle={{ fontWeight: 600 }}
                                />
                            </Grid>
                        </Tooltip>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            padding: '10px',
                            borderRadius: '20px',
                            backgroundColor: '#cecece',
                            border: '1px solid #e7e5e5',
                            boxSizing: 'border-box',
                            height: '176px',
                            width: '176px',
                        }}
                    >
                        <Tooltip title="This will be added in the near future">
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <img src={yt_icon} width={'60px'} />
                                <SubHeaderText
                                    text="Youtube"
                                    color="#272727"
                                    customstyle={{ fontWeight: 600 }}
                                />
                            </Grid>
                        </Tooltip>
                    </Grid>
                </Grid>
            </WrapperStandardTextField>

            <WrapperStandardTextField md={12} lg={12}>
                <LoadingButton
                    variant="contained"
                    type="submit"
                    sx={{
                        backgroundColor: '#272727',
                        color: '#FFFFFF',
                        textTransform: 'capitalize',
                        mt: '30px',
                    }}
                >
                    Next Step
                </LoadingButton>
            </WrapperStandardTextField>
        </>
    );
};

export default CampaignStep1;
