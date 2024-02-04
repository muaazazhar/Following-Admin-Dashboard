import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import HeaderText from '../Text/HeaderText';
import SubHeaderText from '../Text/SubHeaderText';
import WrapperStandardTextField from '../Wrapper/WrapperStandardTextField';
import CustomSelect from '../Input/CustomSelect';
import validationService from '../../services/validationService';
import PreLabel from '../Text/PreLabel';

const CampaignStep4 = ({
    onChangeHandler,
    errors,
    register,
    setRequiredFields,
    setIndex,
}) => {
    useEffect(() => {
        setRequiredFields([
            'campaign_type',
            'payment_type',
            'contentCategory',
            'campaign_description',
        ]);
    }, []);

    return (
        <>
            <HeaderText text="Create Campaign" color="#282F53" />
            <WrapperStandardTextField
                lg={12}
                style={{ paddingRight: '10px', paddingTop: '20px' }}
            >
                <PreLabel label={'Influencer Content Type'} />
            </WrapperStandardTextField>
            <WrapperStandardTextField
                style={{ paddingRight: '10px', paddingTop: '20px' }}
            >
                <SubHeaderText
                    text="Select Campaign Type*"
                    color="#282F53"
                    customstyle={{
                        fontWeight: 600,
                    }}
                    error={errors['campaign_type']}
                />
                <CustomSelect
                    onChange={onChangeHandler}
                    placeholder="Campaign Type"
                    options={validationService.CampaignTypeOptions}
                    name="campaign_type"
                />
            </WrapperStandardTextField>
            <WrapperStandardTextField
                style={{ paddingRight: '10px', paddingTop: '20px' }}
            >
                <SubHeaderText
                    text="Payment Type*"
                    color="#282F53"
                    customstyle={{
                        fontWeight: 600,
                    }}
                    error={errors['payment_type']}
                />
                <CustomSelect
                    onChange={onChangeHandler}
                    placeholder="Select Platform"
                    name="payment_type"
                    options={validationService.PaymentOptions}
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
                <SubHeaderText
                    customstyle={{ fontWeight: 600 }}
                    text="Description"
                    color="#282F53"
                    error={errors['campaign_description']}
                />
                <TextField
                    fullWidth
                    sx={{
                        color: '#808080',
                        fontSize: '14px',
                        lineHeight: '21px',
                    }}
                    multiline
                    rows={4} // Set the number of rows based on your design
                    error={!!errors['campaign_description']}
                    placeholder="e.g “We want content creators to portray as if they are customers and review the experience in an euthentic way”"
                    {...register('campaign_description')}
                />
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
                        mt: '30px',
                    }}
                >
                    Next Step
                </LoadingButton>
            </WrapperStandardTextField>
        </>
    );
};

export default CampaignStep4;
