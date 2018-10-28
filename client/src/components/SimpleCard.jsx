import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Typography,
} from '@material-ui/core';
import {
  ThumbUp,
  ThumbDown,
  ThumbDownOutlined,
  ThumbUpOutlined,
  FormatQuote,
} from '@material-ui/icons';
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
    updateQuote: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      quote: this.getQuote(),
      likeIsChecked: false,
      dislikeIsChecked: false,
    }
  };

  getQuote = () => {
    const { quotes } = this.props;
    return quotes[Math.random() * quotes.length | 0];
  };

  incrementLikes = (id) => {
    let quote = JSON.parse(JSON.stringify(this.state.quote));
    quote.likes += 1;
    delete quote._id;
    this.props.updateQuote({ id, quote: { quote } });
  };

  decrementLikes = (id) => {
    let quote = JSON.parse(JSON.stringify(this.state.quote));
    quote.likes -= 1;
    delete quote._id;
    this.props.updateQuote({ id, quote: { quote } });
  };


  render() {
    const { classes } = this.props;
    const { quote, likeIsChecked, dislikeIsChecked } = this.state;
    return (
      <Card className={classes.card} id="quote-box" style={{ height: '50%', width: '45%' }}>
        <CardContent>
          <Typography variant="h5" component="h2" id="text">
            <FormatQuote/>
            {quote.quote}
            <FormatQuote/>
          </Typography>
          <Typography className={classes.pos} color="textSecondary" id="author">
            {quote.author}
          </Typography>
        </CardContent>
        <CardActions>
          <div style={{ width: '50%', display: 'flex' }}>
            <FacebookShareButton quote={quote.quote} url="https://fathomless-brushlands-72371.herokuapp.com/">
              <FacebookIcon size={32} round={true} style={{float: 'left'}}/>
            </FacebookShareButton>
            <TwitterShareButton
              title={quote.quote}
              via={quote.author}
              hashtags={['quote']}
              url="https://fathomless-brushlands-72371.herokuapp.com/">
              <TwitterIcon size={32} round={true}/>
            </TwitterShareButton>
            <LinkedinShareButton title={quote.quote} url="https://fathomless-brushlands-72371.herokuapp.com/">
              <LinkedinIcon size={32} round={true}/>
            </LinkedinShareButton>
            <WhatsappShareButton title={quote.quote} url="https://fathomless-brushlands-72371.herokuapp.com/">
              <WhatsappIcon size={32} round={true}/>
            </WhatsappShareButton>
            <EmailShareButton subject={quote.quote} url="https://fathomless-brushlands-72371.herokuapp.com/">
              <EmailIcon size={32} round={true}/>
            </EmailShareButton>
          </div>
          <div style={{width: '50%'}}>
            <Checkbox
              checked={this.state.likeIsChecked}
              checkedIcon=<ThumbUp/>
            icon= <ThumbUpOutlined/>
            onChange={() => {
            const flag = !likeIsChecked;
            this.setState({likeIsChecked: flag, dislikeIsChecked: false})
          }}
            />
            <Checkbox
              checked={this.state.dislikeIsChecked}
              checkedIcon=<ThumbDown/>
            icon= <ThumbDownOutlined/>
            onChange={() => {
            const flag = !dislikeIsChecked;
            this.setState({dislikeIsChecked: flag, likeIsChecked: false})
          }}
            />
            {
              likeIsChecked
                ? quote.likes + 1
                : (dislikeIsChecked
                     ? quote.likes - 1
                     : quote.likes)
            } likes

            <Button
              size="medium"
              id="new-quote"
              style={{float: 'right'}}
              color="primary"
              variant="contained"
              onClick={() => {
                if (likeIsChecked === true) this.incrementLikes(quote._id);
                if (dislikeIsChecked === true) this.decrementLikes(quote._id);
                this.setState(this.getInitialState);
              }}
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