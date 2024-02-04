import paypal_logo from '../assets/paypal_logo.png';
import stripe_logo from '../assets/stripe_logo.png';
import logos_mastercard from '../assets/logos_mastercard.png';
import { GetCountries, GetLanguages } from 'react-country-state-city';

const onKeyDownNumber = (event) => {
    const allowedChars = /^[0-9]+$/;
    if (!allowedChars.test(event.key) && event.keyCode !== 8) {
        event.preventDefault();
    }
};

const onKeyDownText = (event) => {
    const allowedChars = /^[A-Za-z]+$/;
    if (
        !allowedChars.test(event.key) &&
        event.keyCode !== 8 &&
        event.keyCode !== 32
    ) {
        event.preventDefault();
    }
};

const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);

    // Define months mapping
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    // Extract date components
    const year = dateObject.getFullYear();
    const month = months[dateObject.getMonth()];
    const day = dateObject.getDate();

    // Format the output string
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
};

const genderOptions = [
    {
        value: 'Male',
        label: 'Male',
    },
    {
        value: 'Female',
        label: 'Female',
    },
];

const socailOptions = [
    {
        value: 'Facebook',
        label: 'Facebook',
    },
    {
        value: 'Instagram',
        label: 'Instagram',
    },
    {
        value: 'Tiktok',
        label: 'Tiktok',
    },
];

const paymentMethodOptions = [
    {
        value: 'Bank Transfer',
        label: 'Bank Transfer',
    },
    {
        value: 'Cheque',
        label: 'Cheque',
    },
];

const dealTypeOptions = [
    {
        value: 'Discount',
        label: 'Discount',
    },
    {
        value: 'Bogo',
        label: 'Bogo',
    },
];

const dealsOptions = [
    {
        value: 1,
        label: '1 Deals Available',
    },
    {
        value: 2,
        label: '2 Deals Available',
    },
    {
        value: 3,
        label: '3 Deals Available',
    },
    {
        value: 4,
        label: '4 Deals Available',
    },
    {
        value: 5,
        label: '5 Deals Available',
    },
    {
        value: 6,
        label: '6 Deals Available',
    },
    {
        value: 7,
        label: '7 Deals Available',
    },
    {
        value: 8,
        label: '8 Deals Available',
    },
    {
        value: 9,
        label: '9 Deals Available',
    },
    {
        value: 10,
        label: '10 Deals Available',
    },
];

const followersOptions = [
    {
        value: 10000,
        label: 'Min 10,000 Followers',
    },
    {
        value: 20000,
        label: 'Min 20,000 Followers',
    },
];

const miniPayoutOptions = [
    {
        value: 10000,
        label: '$10000',
    },
    {
        value: 20000,
        label: '$20000',
    },
    {
        value: 30000,
        label: '$30000',
    },
    {
        value: 40000,
        label: '$40000',
    },
    {
        value: 50000,
        label: '$50000',
    },
    {
        value: 60000,
        label: '$60000',
    },
];

const LicensedOptions = [
    {
        value: true,
        label: 'Licensed',
    },
    {
        value: false,
        label: 'Not licensed',
    },
];

const ContentCategoryOptions = [
    {
        value: 'Fitness and Health',
        label: 'Fitness and Health',
    },
];

const PlatformsCategoryOptions = [
    {
        value: 1,
        label: 'Instagram',
    },
    {
        value: 2,
        label: 'Tiktok',
    },
    {
        value: 3,
        label: 'Snapchat',
    },
];

const ContentNeededOptions = [
    {
        value: 'Stories',
        label: 'Stories',
    },
    {
        value: 'Reel',
        label: 'Reel',
    },
    {
        value: 'Posts',
        label: 'Posts',
    },
];

const CampaignTypeOptions = [
    {
        value: 'Barter',
        label: 'Barter',
    },
    {
        value: 'Paid',
        label: 'Paid',
    },
];

const PaymentOptions = [
    {
        value: 'Bank Transfer',
        label: 'Bank Transfer',
    },
    {
        value: 'Payment Through Link',
        label: 'Payment Through Link',
    },
    {
        value: 'Online Payment',
        label: 'Online Payment',
    },
];

const ageOptions = [
    {
        value: 18,
        label: 'up to 18 years',
    },
    {
        value: 25,
        label: 'up to 25 years',
    },
    {
        value: 40,
        label: 'up to 40 years',
    },
];
const payOptions = [
    {
        value: 1,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={paypal_logo} width="20px" />{' '}
                <span style={{ marginLeft: '10px' }}>Paypal</span>
            </div>
        ),
    },
    {
        value: 2,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={stripe_logo} width="20px" />{' '}
                <span style={{ marginLeft: '10px' }}>Stripe</span>
            </div>
        ),
    },
    {
        value: 3,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logos_mastercard} width="20px" />{' '}
                <span style={{ marginLeft: '10px' }}>Mastercard</span>
            </div>
        ),
    },
];

const LanguageOptions = await GetLanguages().then((result) => {
    const arr = result.map((language) => {
        return { label: language.name, value: language.name };
    });
    return [{ label: 'English(Default)', value: 'English' }, ...arr];
});

export default {
    onKeyDownNumber,
    onKeyDownText,
    formatDate,
    payOptions,
    LanguageOptions,
    genderOptions,
    ageOptions,
    followersOptions,
    socailOptions,
    dealsOptions,
    paymentMethodOptions,
    dealTypeOptions,
    LicensedOptions,
    ContentCategoryOptions,
    miniPayoutOptions,
    PlatformsCategoryOptions,
    ContentNeededOptions,
    CampaignTypeOptions,
    PaymentOptions,
};
