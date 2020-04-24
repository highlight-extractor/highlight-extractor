import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../muiStyles';

const Footer: React.FC = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <footer className={classes.footer}>
                <Container maxWidth="xs">
                    <Typography variant="body2" color="textSecondary">
                        {'Copyright \u00A9 '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
