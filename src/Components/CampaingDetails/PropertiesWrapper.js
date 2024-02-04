import { Grid } from '@mui/material';
import SubHeaderText from '../Text/SubHeaderText';
const PropertiesWrapper = ({
    xs = '12',
    sm = '6',
    md = '4',
    lg = 'auto',
    label = 'label',
    value = null,
    children = null,
}) => {
    return (
        <Grid
            item
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            sx={{
                mt: '20px',
            }}
        >
            <SubHeaderText
                text={label}
                color="#212529"
                customstyle={{ fontWeight: 600, mb: '9px' }}
            />
            {children ? (
                children
            ) : (
                <SubHeaderText text={value} color="#212529" />
            )}
        </Grid>
    );
};

export default PropertiesWrapper;
