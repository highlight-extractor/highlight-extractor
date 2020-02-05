import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// TODO have a better unified theme across the app
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        root: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(8),
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        gridContainer: {
            margin: '0px',
        },
        gridListRoot: {
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
        dropzone: {
            minHeight: 'inherit!important',
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }),
);
