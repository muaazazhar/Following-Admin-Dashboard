import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import WrapperStandardTextField from '../Wrapper/WrapperStandardTextField';
import SocialMedia from './socialMedia';

const CampaignStep3 = ({
    setIndex,
    socialMediaChannels,
    errors,
    onChangeHandler,
    register,
}) => {
    const [step, setStep] = useState(0);
    const [socialMediaVal, setSocialMediaVal] = useState(null);
    const [socialMediaOptions, setSocialMediaOptions] = useState([]);

    const handleStepChange = () => {
        setStep((prevStep) => {
            setSocialMediaVal(socialMediaOptions[prevStep + 1]);
            return prevStep + 1;
        });
    };

    const setSelectOptions = () => {
        const temp = [...socialMediaOptions];
        socialMediaChannels.forEach((element, index) => {
            if (index === 0) {
                setSocialMediaVal({
                    value: index + 1,
                    label: element.charAt(0).toUpperCase() + element.slice(1),
                });
            }
            temp.push({
                value: index + 1,
                label: element.charAt(0).toUpperCase() + element.slice(1),
            });
        });
        setSocialMediaOptions(temp);
    };

    useEffect(() => {
        setSelectOptions();
    }, [socialMediaChannels]);

    return (
        <>
            <SocialMedia
                errors={errors}
                socialMediaVal={socialMediaVal}
                onChangeHandler={onChangeHandler}
                register={register}
                socialMediaOptions={socialMediaOptions}
            />
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
                {socialMediaChannels.length > 1 &&
                step < socialMediaChannels.length ? (
                    <LoadingButton
                        variant="contained"
                        sx={{
                            backgroundColor: '#272727',
                            color: '#FFFFFF',
                            textTransform: 'capitalize',
                            mt: '30px',
                        }}
                        onClick={handleStepChange}
                    >
                        Next Step
                    </LoadingButton>
                ) : (
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
                )}
            </WrapperStandardTextField>
        </>
    );
};

export default CampaignStep3;
