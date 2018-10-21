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
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

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
    marginTop: 10,
    marginBottom: 12,
    textAlign: 'right',
  },
};

class SimpleCard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    quotes: PropTypes.array.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      quote: {},
    };
  }

  componentDidMount () {
    this.getQuote();
  }

  getQuote = () => {
    const {quotes} = this.props;
    const quote = quotes[ Math.random() * quotes.length | 0 ];
    this.setState({quote});
  };

  render () {
    const {classes} = this.props;
    return (
      <Card className={classes.card} id="quote-box" style={{height: '50%', width: '45%'}}>
        <CardContent>
          <Typography variant="h5" component="h2" id="text">
            <FormatQuote/>
            {this.state.quote.quote}
            <FormatQuote/>
          </Typography>
          <Typography className={classes.pos} color="textSecondary" id="author">
            {this.state.quote.author}
          </Typography>
        </CardContent>
        <CardActions>
          <div style={{width: '50%', display: 'flex'}}>
            <FacebookShareButton quote={this.state.quote.quote} url="http://www.google.ro">
              <FacebookIcon size={32} round={true} style={{float: 'left'}}/>
            </FacebookShareButton>
            <TwitterShareButton
              title={this.state.quote.quote}
              via={this.state.quote.author}
              hashtags={[ 'quote' ]}
              url="http://www.google.ro">
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <LinkedinShareButton title={this.state.quote.quote} url="http://www.google.ro">
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <WhatsappShareButton title={this.state.quote.quote} url="http://www.google.ro">
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <EmailShareButton subject={this.state.quote.quote} url="http://www.google.ro">
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
          </div>
          <div style={{width: '50%'}}>
            <Button
              size="medium"
              id="new-quote"
              style={{float: 'right'}}
              color="primary"
              variant="contained"
              onClick={this.getQuote}
            >
              Next
            </Button>
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(SimpleCard);