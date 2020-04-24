import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            minHeight: '100vh',
            backgroundColor: theme.palette.grey[100],
        },
        header: {
            padding: theme.spacing(3, 2),
            marginBottom: 'auto',
            backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            width: '100%',
            textAlign: 'center',
        },
        main: {
            padding: '0px',
        },
        progress: {
            width: '100%',
            position: 'fixed',
            top: '0px',
            zIndex: 1500,
        },
        paper: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        navigation: {
            width: '100%',
            position: 'relative',
        },
        navigationContent: {
            padding: 'auto',
            textAlign: 'center',
            position: 'relative',
            marginTop: '40%',
            marginBottom: '35%',
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        dropzone: {
            minHeight: 'inherit!important',
        },
        select: {
            width: '100%',
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        gridContainer: {
            margin: theme.spacing(3, 0, 2),
        },
        gridList: {
            // flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        gridListRoot: {
            margin: 'auto',
            width: '80%',
            padding: '2px',
        },
        gridListTileImage: {
            top: '0%',
            left: '0%',
            width: '100%',
            height: '100%',
            position: 'relative',
            transform: 'none',
        },
        title: {
            color: theme.palette.primary.light,
        },
        titleBar: {
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        footer: {
            padding: theme.spacing(3, 2),
            marginTop: 'auto',
            backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
            width: '100%',
            textAlign: 'center',
        },
    }),
);
