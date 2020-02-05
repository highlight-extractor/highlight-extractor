import React from 'react';
import { GridListTile } from '@material-ui/core';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { useStyles } from '../muiStyles';
import { HighlightProps, VideoHighlight } from '../store/commons/highlightCommons';

const pad = (num: number, leftSize: number, rightSize = 0): string => {
    let tens = 1;
    for (let i = 0; i < leftSize; i += 1) tens *= 10;
    const d = Math.floor(num % tens);
    const f = (num - Math.floor(num)).toFixed(rightSize);

    let s = d + '' + (rightSize === 0 ? '' : f.substr(1));
    const size = rightSize === 0 ? leftSize : leftSize + 1 + rightSize;
    while (s.length < size) s = '0' + s;

    return s;
};

const getTitle = ({ meanScorePrediction, timestamp }: VideoHighlight): string => {
    const h = timestamp;
    const ms = h % 1000;
    const s = (h / 1000) % 60;
    const m = (h / 60000) % 60;
    return `[${pad(h / 3600000, 2)}:${pad(m, 2)}:${pad(s, 2)}.${pad(ms, 3)}] ${pad(meanScorePrediction, 1, 2)}`;
};

const Highlight = ({ key, highlight }: HighlightProps): React.ReactElement => {
    const classes = useStyles();
    const { imageUrl } = highlight;
    const title = getTitle(highlight);
    return (
        <GridListTile
            key={key}
            classes={{
                root: classes.gridListRoot,
                imgFullHeight: classes.gridListTileImage,
                imgFullWidth: classes.gridListTileImage,
            }}
        >
            <img src={imageUrl} alt={title} />
            <GridListTileBar
                title={title}
                classes={{
                    root: classes.titleBar,
                    title: classes.title,
                }}
                actionIcon={
                    <IconButton
                        aria-label={`download ${title}`}
                        onClick={(): Window | null => window.open(imageUrl, '_blank')}
                    >
                        <CloudDownloadIcon className={classes.title} />
                    </IconButton>
                }
            />
        </GridListTile>
    );
};

export default Highlight;
