import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push, replace } from 'react-router-redux';
import { Helmet } from 'react-helmet';
import map from 'lodash/map';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import SwipeableViews from 'react-swipeable-views';

import IconButton from 'material-ui/IconButton';
import Tabs, { Tab } from 'material-ui/Tabs';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from 'material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ViewContainer from 'components/ViewContainer';
import LayoutAppBar from 'components/LayoutAppBar';
import LayoutBody from 'components/LayoutBody';
import ShowText from 'components/ShowText';
import MainActionButton from 'components/MainActionButton';
import List from 'components/List';
import ListItem from 'components/ListItem';
import MatchItem from 'components/MatchItem';
import AddMatch from 'components/AddMatch';

import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAddMatchDialog,
  makeSelectLadderName,
  makeSelectMatches,
  makeSelectPlayers,
  makeSelectRankedPlayers,
} from './selectors';
import {
  addMatch,
  setAddMatchDialogState,
  openEditLadderForm,
} from './actions';

const RANKING_ITEM_HEIGHT = 65;
const MATCH_ITEM_HEIGHT = 90;

const pages = ['ranking', 'matches'];

const styles = {
  root: {
    maxWidth: '100%', // tabs should strech to full width
  },
  autoSizerContainer: {
    flex: '1 1 auto',
  },
};

const layoutBodyStyle = {
  marginBottom: 60,
};

class LadderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.handleSaveMatch = this.handleSaveMatch.bind(this);
    this.handleMatchClick = this.handleMatchClick.bind(this);
  }

  handleMenu(e) {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleIndexChange(i) {
    const { replaceRoute, match: { params } } = this.props;
    const page = pages[i];
    replaceRoute(`/ladder/${params.id}/${page}`);
  }

  handleSaveMatch(payload) {
    const { handleAddMatch, match: { params } } = this.props;
    const index = parseInt(params.id, 10);
    handleAddMatch(Object.assign(payload, { index }));
  }

  handleMatchClick(match) {
    this.props.setAddMatchDialog(match);
  }

  render() {
    const { anchorEl } = this.state;
    const {
      classes,
      pushRoute,
      match: { params },
      setAddMatchDialog,
      showAddMatch,
      ladderName,
      matches,
      players,
      rankedPlayers,
      openEditLadderFormState,
    } = this.props;

    const tabIndex = params.page ? pages.indexOf(params.page) : 0;
    const appBarLeft = (
      <IconButton
        onClick={() => pushRoute('/ladders')}
        color="inherit"
      >
        <CloseIcon />
      </IconButton>
    );

    const appBarRight = (
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
          <MenuItem onClick={() => openEditLadderFormState(params.id)}>Edit Ladder</MenuItem>
          <MenuItem>Settings</MenuItem>
        </Menu>
      </div>
    );

    const appBarTabs = (
      <Tabs
        onChange={(e, i) => this.handleIndexChange(i)}
        value={tabIndex}
        indicatorColor="secondary"
        textColor="inherit"
        fullWidth
      >
        <Tab value={0} classes={{ root: classes.root }} label="Ranking" />
        <Tab value={1} classes={{ root: classes.root }} label="Matches" />
      </Tabs>
    );

    let body;
    let mainActionButton = (<MainActionButton
      onClick={() => setAddMatchDialog(true)}
    />);
    if (players.length) {
      body = (
        <div className={classes.autoSizerContainer}>
          <AutoSizer disableWidth>
            {({ height }) => {
              const style = { height };
              return (
                <SwipeableViews
                  slideStyle={style}
                  index={tabIndex}
                  onChangeIndex={this.handleIndexChange}
                >
                  <List
                    layoutBodyStyle={layoutBodyStyle}
                    emptyListText="Add players to begin!"
                    rowCount={rankedPlayers.length}
                    rowHeight={RANKING_ITEM_HEIGHT}
                    rowRenderer={({ index, key }) => {
                      const player = rankedPlayers[index];
                      return (
                        <ListItem
                          key={key}
                          title={player.name}
                          description={player.description}
                          avatarSrc={player.avatarSrc}
                          infoComponent={<div>Score {player.score}</div>}
                        />
                      );
                    }}
                  />
                  <List
                    layoutBodyStyle={layoutBodyStyle}
                    emptyListText="Add Matches to begin!"
                    rowCount={matches.length}
                    rowHeight={MATCH_ITEM_HEIGHT}
                    rowRenderer={({ index, key }) => {
                      const match = matches[index];
                      return (
                        <MatchItem
                          key={key}
                          match={match}
                          onMatchClick={this.handleMatchClick}
                        />
                      );
                    }}
                  />
                </SwipeableViews>
              );
            }}
          </AutoSizer>
        </div>
      );
    } else {
      body = (
        <LayoutBody>
          <ShowText text="Failed to load Ladder Details!" />
        </LayoutBody>
      );
      mainActionButton = null;
    }

    return (
      <div>
        <Helmet>
          <title>Ladder Detail</title>
          <meta name="description" content="ladder detail" />
        </Helmet>
        <ViewContainer>
          <LayoutAppBar
            title={ladderName}
            iconElementRight={appBarRight}
            iconElementLeft={appBarLeft}
            tabs={appBarTabs}
          />
          {body}
          {mainActionButton}
        </ViewContainer>
        <AddMatch
          open={showAddMatch}
          handleClose={() => setAddMatchDialog()}
          handleSaveMatch={this.handleSaveMatch}
          playerList={map(players, (player) => ({
            value: player.name,
            label: player.name,
          }))}
        />
      </div>
    );
  }
}

LadderDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  pushRoute: PropTypes.func.isRequired,
  replaceRoute: PropTypes.func.isRequired,
  openEditLadderFormState: PropTypes.func.isRequired,
  handleAddMatch: PropTypes.func.isRequired,
  setAddMatchDialog: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  showAddMatch: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.object.isRequired,
  ]),
  ladderName: PropTypes.string.isRequired,
  matches: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  rankedPlayers: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  showAddMatch: makeSelectAddMatchDialog(),
  ladderName: makeSelectLadderName(),
  matches: makeSelectMatches(),
  players: makeSelectPlayers(),
  rankedPlayers: makeSelectRankedPlayers(),
});

const withConnect = connect(
  mapStateToProps, {
    pushRoute: push,
    replaceRoute: replace,
    handleAddMatch: addMatch,
    setAddMatchDialog: setAddMatchDialogState,
    openEditLadderFormState: openEditLadderForm,
  }
);

const withSaga = injectSaga({ key: 'ladderDetail', saga });
const withReducer = injectReducer({ key: 'ladderDetail', reducer });

export default compose(
  withStyles(styles),
  withSaga,
  withReducer,
  withConnect,
)(LadderDetail);
