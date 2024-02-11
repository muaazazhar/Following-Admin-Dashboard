import { useEffect, useRef, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import WrapperStandardTextField from '../Wrapper/WrapperStandardTextField';
import SocialMedia from './socialMedia';
import FormSubmitDialog from '../Popups/formSubmitDialog';

const CampaignStep3 = ({
    setIndex,
    socialMediaChannels,
    errors,
    onChangeHandler,
    register,
    socialMediaChannelsData,
    setSocialMediaChannelsData,
}) => {
    const [step, setStep] = useState(0);
    const [socialMediaVal, setSocialMediaVal] = useState(null);
    const [socialMediaOptions, setSocialMediaOptions] = useState([]);
    const [showError, setShowError] = useState(false);
    const [hashtags, setHastags] = useState([]);
    const [description, setDescription] = useState('');
    const [brandAccount, setBrandAccount] = useState('');
    const [linkToAttach, setLinkToAttach] = useState('');
    const [specificText, setSpecificText] = useState('');
    const [content, setContent] = useState('');
    const [platform, setPlatform] = useState('');
    const refSubmitbtn = useRef(null);

    const handleStepChange = () => {
        let socialMediaCheck =
            platform === socialMediaChannels[step] &&
            description &&
            content &&
            brandAccount;
        if (socialMediaChannels[step] === 'instagram') {
            socialMediaCheck = socialMediaCheck && hashtags.length;
        } else {
            socialMediaCheck = socialMediaCheck && specificText && linkToAttach;
        }

        if (socialMediaCheck) {
            const tempObj = {
                platform,
                hashtags:
                    hashtags.length > 1 ? hashtags.join(', ') : hashtags[0],
                specificText,
                description,
                content,
                brandAccount,
                linkToAttach,
            };
            if (!hashtags.length) delete tempObj['hashtags'];
            Object.entries(tempObj).forEach(([key, val]) => {
                if (!tempObj[key]) delete tempObj[key];
            });

            setSocialMediaChannelsData([...socialMediaChannelsData, tempObj]);
            setDescription('');
            setPlatform('');
            setContent('');
            setSpecificText('');
            setLinkToAttach('');
            setBrandAccount('');
            setHastags([]);

            if (step === socialMediaChannels.length - 1) {
                refSubmitbtn.current.click();
            } else {
                setStep((prevStep) => {
                    setSocialMediaVal(socialMediaOptions[prevStep + 1]);
                    return prevStep + 1;
                });
            }
        } else {
            setShowError({
                error: true,
                open: true,
                title: `Please fill in all the fields for ${socialMediaChannels[step]}`,
            });
        }
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
            <FormSubmitDialog
                modal={showError}
                onClose={() => setShowError(false)}
            />
            <SocialMedia
                step={step}
                hashtags={hashtags}
                setHastags={setHastags}
                description={description}
                setDescription={setDescription}
                brandAccount={brandAccount}
                setBrandAccount={setBrandAccount}
                linkToAttach={linkToAttach}
                setLinkToAttach={setLinkToAttach}
                specificText={specificText}
                setSpecificText={setSpecificText}
                setPlatform={setPlatform}
                content={content}
                setContent={setContent}
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
                <LoadingButton
                    variant="contained"
                    type="submit"
                    ref={refSubmitbtn}
                    sx={{
                        display: 'none',
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

export default CampaignStep3;
