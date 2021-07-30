import {
  Box, makeStyles,
} from '@material-ui/core'
import colors from '../constants/colors'
import PropTypes from 'prop-types'

export default function Blocks({ blocks }) {
  const classes = useStyles();

  return <>
    {blocks?.loading ? 'Loading...' : blocks?.list?.map(block => {
      return <Box className={classes.boxDetails} key={block?.attributes?.index}>
        <Box fontWeight="bold" className={classes.textDetails}>{String(block?.id).padStart(3, '0')}</Box>
        <Box>{block?.attributes?.data}</Box>
      </Box>
    })}
    {!blocks?.list?.length && !blocks?.error && !blocks?.loading && 'No results'}
    {blocks?.error && !blocks?.loading && 'Error requesting blocks'}
  </>
}

const useStyles = makeStyles((theme) => ({
 boxDetails: {
   display: 'flex',
   flexDirection: 'column',
   padding: '8px',
   borderRadius: '2px',
   background: 'rgba(0, 0, 0, 0.12)',
   marginBottom: '4px'
 },
  textDetails: {
   color: colors.text2,
   fontSize: theme.typography.pxToRem(10),
  }
}));

Blocks.propTypes = {
  blocks: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.bool,
    list: PropTypes.array,
  }).isRequired,
};
