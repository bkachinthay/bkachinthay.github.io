import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import Paper from 'material-ui/Paper';

import LayouBody from 'components/LayoutBody';
import SCrollView from 'components/ScrollView';
import ShowText from 'components/ShowText';

class RankList extends Component {
  static propTypes = {
    layoutBodyStyle: PropTypes.object.isRequired,
    emptyListText: PropTypes.string.isRequired,
    rowRenderer: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(e) {
    this.setState({
      scrollTop: e.target.scrollTop,
    });
  }

  render() {
    const {
      layoutBodyStyle,
      emptyListText,
      rowRenderer,
      rowCount,
      rowHeight,
    } = this.props;

    if (rowCount === 0) {
      return <ShowText text={emptyListText} />;
    }

    const wrapperStyle = {
      paddingBottom: layoutBodyStyle.marginBottom,
      maxHeight: 210,
    };

    return (
      <SCrollView onScroll={this.handleScroll} fullHeight>
        <LayouBody fullHeight>
          <AutoSizer>
            {({ height, width }) => (
              <div style={wrapperStyle}>
                <Paper
                  square
                  style={{
                    width,
                    position: 'relative',
                  }}
                >
                  <List
                    autoHeight
                    height={height}
                    width={width}
                    scrollTop={this.state.scrollTop}
                    rowCount={rowCount}
                    rowRenderer={rowRenderer}
                    rowHeight={rowHeight}
                  />
                </Paper>
              </div>
            )}
          </AutoSizer>
        </LayouBody>
      </SCrollView>
    );
  }
}

RankList.propTypes = {
  layoutBodyStyle: PropTypes.object.isRequired,
  emptyListText: PropTypes.string.isRequired,
  rowRenderer: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
};

export default RankList;
