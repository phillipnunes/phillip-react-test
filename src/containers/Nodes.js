import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as nodesActions from "../actions/nodes";
import * as blocksActions from "../actions/blocks";
import Node from "../components/Node";
import { Typography, Box } from "@material-ui/core";

export class Nodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedNodeURL: null,
    };
    this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this);
  }

  componentDidMount() {
    this.props.nodesActions.checkNodeStatuses(this.props.nodes.list);
  }

  hasDataFetched(node) {
    const hasData = this.props.nodes.list.filter(it => it.name === node.name && it.blocks.list.length > 0)

    return !!hasData.length
  }

  getBlocks(node) {
    node.url !== this.state.expandedNodeURL && !this.hasDataFetched(node) && this.props.blocksActions.getBlocksFromNode(node)
  }

  toggleNodeExpanded(node) {
    this.setState({
      expandedNodeURL:
        node.url === this.state.expandedNodeURL ? null : node.url,
    });

    this.getBlocks(node)
  }

  render() {
    const { nodes } = this.props;
    return (
      <Box paddingTop={7}>
        <Typography variant="h4" component="h1">
          <strong style={{ color: "#000" }}>Nodes</strong>
        </Typography>
        {nodes.list.map((node) => (
          <Node
            node={node}
            blocks={node?.blocks}
            key={node.url}
            expanded={node.url === this.state.expandedNodeURL}
            toggleNodeExpanded={this.toggleNodeExpanded}
          />
        ))}
      </Box>
    );
  }
}

Nodes.propTypes = {
  nodesActions: PropTypes.object.isRequired,
  blocksActions: PropTypes.object.isRequired,
  nodes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    nodes: state.nodes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nodesActions: bindActionCreators(nodesActions, dispatch),
    blocksActions: bindActionCreators(blocksActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nodes);
