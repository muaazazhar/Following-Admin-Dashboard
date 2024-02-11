import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import WrapperStandardTextField from '../Wrapper/WrapperStandardTextField';
import HeaderText from '../Text/HeaderText';
import {
    Box,
    Button,
    Chip,
    Stack,
    TextField,
    Typography,
    Modal,
    Snackbar,
    Alert,
} from '@mui/material';
import SubHeaderText from '../Text/SubHeaderText';
import CustomSelect from '../Input/CustomSelect';
import validationService from '../../services/validationService';

const SocialMedia = ({
    onChangeHandler,
    errors,
    socialMediaVal,
    socialMediaOptions,
    hashtags,
    setHastags,
    description,
    setDescription,
    brandAccount,
    setBrandAccount,
    linkToAttach,
    setLinkToAttach,
    specificText,
    setSpecificText,
    content,
    setContent,
    setPlatform,
}) => {
    const [hashtag, setHastag] = useState('');
    const [openAddTags, setOpenAddTags] = useState(false);
    const [error, setError] = useState('');
    const [errorBar, setErrorBar] = useState(false);
    const [showHashTags, setShowHashTags] = useState(false);
    const [contentNeededOptions, setContentNeededOptions] = useState([]);
    const [once, setOnce] = useState(false);

    const handleAddTags = () => {
        if (hashtag) {
            setHastags([...hashtags, `#${hashtag}`]);
            setHastag('');
            setError('');
            setOpenAddTags(false);
        } else {
            setErrorBar(true);
            setError('Please write a proper name for a hashtag to be added');
        }
    };

    const handleTagDelete = (tag) => {
        const temp = hashtags.filter((element) => element !== tag);
        setHastags(temp);
    };

    const handleSocialMediaChanges = () => {
        if (socialMediaVal && !content) {
            setContent(contentNeededOptions[0]);
            setPlatform(socialMediaVal['label'].toLowerCase());
            switch (socialMediaVal['label'].toLowerCase()) {
                case 'instagram':
                    setContentNeededOptions(
                        validationService.ContentNeededOptions,
                    );
                    setShowHashTags(true);
                    break;
                default:
                    setContentNeededOptions([
                        {
                            value: 'shortvideo',
                            label: 'Short Video',
                        },
                    ]);
                    setShowHashTags(false);
                    break;
            }
        }
    };

    const handleContentChange = (e) => {
        setContent(e);
    };

    useEffect(() => {
        handleSocialMediaChanges();
    });
    return (
        <>
            {socialMediaVal && (
                <>
                    <WrapperStandardTextField
                        lg={12}
                        style={{ paddingRight: '10px', paddingTop: '20px' }}
                    >
                        <HeaderText text="Eligibilities" color="#282F53" />
                    </WrapperStandardTextField>
                    <WrapperStandardTextField
                        style={{ paddingRight: '10px', paddingTop: '20px' }}
                    >
                        <SubHeaderText
                            text="Platform*"
                            color="#282F53"
                            customstyle={{
                                fontWeight: 600,
                            }}
                            error={errors['platform']}
                        />
                        <CustomSelect
                            onChange={onChangeHandler}
                            placeholder="Select Platform"
                            options={socialMediaOptions}
                            name="platform"
                            disabled
                            value={socialMediaVal}
                            defaultValue={socialMediaVal}
                        />
                    </WrapperStandardTextField>
                    <WrapperStandardTextField
                        style={{ paddingRight: '10px', paddingTop: '20px' }}
                    >
                        <SubHeaderText
                            text="Content Needed*"
                            color="#282F53"
                            customstyle={{
                                fontWeight: 600,
                            }}
                            error={errors['content_needed']}
                        />
                        <CustomSelect
                            onChange={handleContentChange}
                            placeholder="Select Platform"
                            options={contentNeededOptions}
                            name="content_needed"
                            defaultValue={content}
                            value={content}
                            multi={showHashTags}
                            disabled={!showHashTags}
                        />
                    </WrapperStandardTextField>

                    {showHashTags ? (
                        <WrapperStandardTextField
                            lg={12}
                            style={{ paddingRight: '0px', paddingTop: '20px' }}
                        >
                            <SubHeaderText
                                customstyle={{ fontWeight: 600 }}
                                text="Hashtags"
                                required={true}
                                color="#282F53"
                                error={errors['hashtags']}
                            />
                            <Stack
                                direction="row"
                                spacing={2}
                                style={{
                                    border: '1px solid #E9EDF4',
                                    padding: '10px 20px',
                                    position: 'relative',
                                }}
                            >
                                {hashtags.length ? (
                                    <>
                                        {hashtags.map((tag) => (
                                            <Chip
                                                sx={{ borderRadius: '10px' }}
                                                label={tag}
                                                onDelete={() =>
                                                    handleTagDelete(tag)
                                                }
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <Chip
                                        label="No tags added yet"
                                        sx={{ borderRadius: '10px' }}
                                    />
                                )}
                                <Button
                                    variant={'contained'}
                                    sx={{
                                        backgroundColor: 'black',
                                        textTransform: 'none',
                                        position: 'absolute',
                                        right: '20px',
                                    }}
                                    onClick={() => setOpenAddTags(true)}
                                    startIcon={<AddIcon />}
                                >
                                    Add
                                </Button>
                            </Stack>
                        </WrapperStandardTextField>
                    ) : (
                        <WrapperStandardTextField
                            lg={12}
                            style={{ paddingRight: '0px', paddingTop: '20px' }}
                        >
                            <SubHeaderText
                                customstyle={{ fontWeight: 600 }}
                                text="Specific Text"
                                color="#282F53"
                            />
                            <TextField
                                fullWidth
                                value={specificText}
                                onChange={(e) =>
                                    setSpecificText(e.target.value)
                                }
                                sx={{
                                    color: '#808080',
                                    fontSize: '14px',
                                    lineHeight: '21px',
                                }}
                                placeholder="Specific Text"
                            />
                        </WrapperStandardTextField>
                    )}
                    <Modal
                        open={openAddTags}
                        onClose={() => setOpenAddTags(false)}
                        sx={{ display: 'flex' }}
                    >
                        <Box
                            sx={{
                                margin: '0 auto',
                                justifySelf: 'center',
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                width: { md: '50%', xs: '80%' },
                                padding: '1rem',
                                position: 'relative',
                            }}
                        >
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: '1rem' }}
                            >
                                Add A New Tag
                            </Typography>
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <TextField
                                    label="Hashtag"
                                    value={hashtag}
                                    onChange={(e) => setHastag(e.target.value)}
                                    required
                                    sx={{ width: '80%' }}
                                />
                                <Button
                                    variant={'contained'}
                                    sx={{
                                        backgroundColor: 'black',
                                        textTransform: 'none',
                                    }}
                                    onClick={handleAddTags}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={errorBar}
                        autoHideDuration={5000}
                        onClose={() => setErrorBar(false)}
                        message={error}
                    >
                        <Alert
                            onClose={() => setErrorBar(false)}
                            severity="error"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {error}
                        </Alert>
                    </Snackbar>
                    <WrapperStandardTextField
                        lg={12}
                        style={{ paddingRight: '0px', paddingTop: '20px' }}
                    >
                        <SubHeaderText
                            customstyle={{ fontWeight: 600 }}
                            text="Description"
                            color="#282F53"
                            error={
                                errors[`${socialMediaVal['label']}_description`]
                            }
                        />
                        <TextField
                            fullWidth
                            sx={{
                                color: '#808080',
                                fontSize: '14px',
                                lineHeight: '21px',
                            }}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            multiline
                            required
                            rows={4} // Set the number of rows based on your design
                            placeholder="e.g “We want content creators to portray as if they are customers and review the experience in an euthentic way”"
                        />
                    </WrapperStandardTextField>
                    <WrapperStandardTextField
                        lg={12}
                        style={{ paddingRight: '0px', paddingTop: '20px' }}
                    >
                        <SubHeaderText
                            customstyle={{ fontWeight: 600 }}
                            text="Brand Account"
                            color="#282F53"
                        />
                        <TextField
                            fullWidth
                            sx={{
                                color: '#808080',
                                fontSize: '14px',
                                lineHeight: '21px',
                            }}
                            value={brandAccount}
                            onChange={(e) => setBrandAccount(e.target.value)}
                            placeholder="e.g “We want content creators to portray as if they are customers and review the experience in an euthentic way”"
                        />
                    </WrapperStandardTextField>
                    {!showHashTags && (
                        <WrapperStandardTextField
                            lg={12}
                            style={{ paddingRight: '0px', paddingTop: '20px' }}
                        >
                            <SubHeaderText
                                customstyle={{ fontWeight: 600 }}
                                text="Link to Attach"
                                color="#282F53"
                            />
                            <TextField
                                fullWidth
                                sx={{
                                    color: '#808080',
                                    fontSize: '14px',
                                    lineHeight: '21px',
                                }}
                                value={linkToAttach}
                                onChange={(e) =>
                                    setLinkToAttach(e.target.value)
                                }
                                placeholder={`${socialMediaVal['label']} Video Link`}
                            />
                        </WrapperStandardTextField>
                    )}
                </>
            )}
        </>
    );
};

export default SocialMedia;
