import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const getBlocksFromNodeStart = (node) => {
  return {
    type: types.GET_BLOCKS_FROM_NODE_START,
    node,
  };
};

const getBlocksFromNodeSuccess = (node, res) => {
  return {
    type: types.GET_BLOCKS_FROM_NODE_SUCCESS,
    node,
    res,
  };
};

const getBlocksFromNodeFailure = (node) => {
  return {
    type: types.GET_BLOCKS_FROM_NODE_FAILURE,
    node,
  };
};

export function getBlocksFromNode(node) {
  return async (dispatch) => {
    try {
      dispatch(getBlocksFromNodeStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      const json = await res.json();

      dispatch(getBlocksFromNodeSuccess(node, json));
    } catch (err) {
      dispatch(getBlocksFromNodeFailure(node));
    }
  };
}
