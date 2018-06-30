import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import CloseIcon from '@material-ui/icons/Close';

import ShowText from 'components/ShowText';
import ViewContainer from 'components/ViewContainer';
import LayoutAppBar from 'components/LayoutAppBar';
import ScrollView from 'components/ScrollView';
import LayoutBody from 'components/LayoutBody';
import LadderDetail from './LadderDetail';

const AddLadder = ({
    goBack,
    addNewPlayer,
    playerList,
    ladderName,
    changeLadderName,
    addLadder,
    match,
  }) => {
  const ladderId = 1;
  const ladder = {};
  const id = match.params.id;
  const appBarLeft = (
    <IconButton
      color="inherit"
      onClick={goBack}
    >
      <CloseIcon />
    </IconButton>
  );

  let title;
  if (ladderId) {
    title = 'Edit Ladder';
  } else {
    title = 'Add Ladder';
  }

  let appBarRight;
  let body;

  if (ladder) {
    appBarRight = (
      <Button
        onClick={() => addLadder(id)}
        color="inherit"
      >
        {'SAVE'}
      </Button>
    );
    body = (<LadderDetail
      ladder={ladder}
      ladderName={ladderName}
      changeLadderName={changeLadderName}
      addNewPlayer={addNewPlayer}
      playerList={playerList}
    />);
  } else if (ladderId) {
    body = (<ShowText text={'Ladder not found!'} />);
  }

  return (
    <div>
      <Helmet>
        <title>Add LAdder</title>
        <meta name="description" content="add ladder" />
      </Helmet>
      <ViewContainer>
        <LayoutAppBar
          title={title}
          iconElementLeft={appBarLeft}
          iconElementRight={appBarRight}
        />
        <ScrollView>
          <LayoutBody>
            {body}
          </LayoutBody>
        </ScrollView>
      </ViewContainer>
    </div>
  );
};

AddLadder.defaultProps = {
  playerList: [],
};

AddLadder.propTypes = {
  goBack: PropTypes.func.isRequired,
  ladderName: PropTypes.string.isRequired,
  changeLadderName: PropTypes.func.isRequired,
  addNewPlayer: PropTypes.func.isRequired,
  playerList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  })),
  addLadder: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default AddLadder;
