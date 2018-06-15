/**
 *
 * Ladders
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import MoreVert from '@material-ui/icons/MoreVert';
import PeopleIcon from '@material-ui/icons/People';
import { withStyles } from 'material-ui/styles';

import ViewContainer from 'components/ViewContainer';
import LayoutAppBar from 'components/LayoutAppBar';
import ScrollView from 'components/ScrollView';
import LayoutBody from 'components/LayoutBody';
import ShowText from 'components/ShowText';
import ListItem from 'components/ListItem';

import { makeSelectLadders } from './selectors';
// import messages from './messages';

const styles = {
  container: {
    minHeight: '100vh',
  },
  content: {
    marginTop: '70px',
    padding: '20px 10px',
    minHeight: 'calc(100% - 100px)',
  },
};

// const ladders = [
//   {
//     name: 'Abcde',
//     description: 'some ladder',
//     avatarSrc: '',
//   }, {
//     name: 'Abcde',
//     description: 'some ladder',
//     avatarSrc: '',
//   }, {
//     name: 'Abcde',
//     description: 'some ladder',
//     avatarSrc: '',
//   }, {
//     name: 'Abcde',
//     description: 'some ladder',
//     avatarSrc: '',
//   },
// ];

export class Ladders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleMenu(e) {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleLadderClick(ladder, i) {
    const { pushRoute } = this.props;
    pushRoute(`/ladder/${i}`);
  }

  render() {
    const { anchorEl } = this.state;
    const { pushRoute, ladders } = this.props;

    const iconElementRight = (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'menu-appbar' : null}
          aria-haspopup
          onClick={this.handleMenu}
          color="inherit"
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => pushRoute('/ladder/add')}>Add Ladder</MenuItem>
          <MenuItem>Settings</MenuItem>
        </Menu>
      </div>
    );

    return (
      <div>
        <Helmet>
          <title>Ladders</title>
          <meta name="description" content="list of ladders" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <ViewContainer>
          <LayoutAppBar
            title={'My Ladders'}
            iconElementRight={iconElementRight}
          />
          <ScrollView>
            <LayoutBody>
              <Paper square>
                {ladders.map((ladder, i) => (
                  <ListItem
                    key={`ladder-${ladder.ladderName}`}
                    title={ladder.ladderName}
                    description={ladder.description}
                    infoComponent={<div><PeopleIcon />{ladder.players.length}</div>}
                    handleClick={() => this.handleLadderClick(ladder, i)}
                  />))}
              </Paper>
              {ladders.length === 0 && <ShowText text="No Ladders" />}
            </LayoutBody>
          </ScrollView>
        </ViewContainer>
      </div>
    );
  }
}

Ladders.propTypes = {
  pushRoute: PropTypes.func.isRequired,
  ladders: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ladders: makeSelectLadders(),
});

const withConnect = connect(mapStateToProps, { pushRoute: push });

export default compose(
  withStyles(styles),
  withConnect,
)(Ladders);
