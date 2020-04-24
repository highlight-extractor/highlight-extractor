import React from 'react';
import { Link } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../muiStyles';

const Header: React.FC = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <header className={classes.header}>
                <Container maxWidth="xs">
                    <Typography variant="h5" color="textSecondary">
                        <Link href={'/'}>{'Highlight Extractor'}</Link>
                    </Typography>
                </Container>
            </header>
        </React.Fragment>
    );
};

export default Header;
