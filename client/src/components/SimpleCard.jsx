import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { FormatQuote } from '@material-ui/icons';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


function SimpleCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} id="quote-box" style={{ width: '40%' }}>
      <CardContent>
        <Typography variant="headline" component="h2" id="text">
        <FormatQuote/>
          {props.quote}
        <FormatQuote/>
        </Typography>
        <Typography className={classes.pos} color="textSecondary" id="author">
          {props.author}
        </Typography>
      </CardContent>
      <CardActions>
        <div style={{ width: '50%' }}>
          <Button
            size="small"
            id="tweet-quote"
            style={{ float: 'left' }}
          >
            Learn More
          </Button>
        </div>
        <div style={{ width: '50%' }}>
         <Button
           size="medium"
            id="new-quote"
            style={{ float: 'right' }}
           color="primary"
            variant="raised"
          >
            Next
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleCard);