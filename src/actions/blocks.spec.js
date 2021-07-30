import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./blocks";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("should fetch the blocks from current node", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ id: "001" });
        },
      })
    );
    await ActionCreators.getBlocksFromNode(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.GET_BLOCKS_FROM_NODE_START,
        node,
      },
      {
        type: ActionTypes.GET_BLOCKS_FROM_NODE_SUCCESS,
        node,
        res: { id: "001" },
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the blocks from current node", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.getBlocksFromNode(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.GET_BLOCKS_FROM_NODE_START,
        node,
      },
      {
        type: ActionTypes.GET_BLOCKS_FROM_NODE_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});
