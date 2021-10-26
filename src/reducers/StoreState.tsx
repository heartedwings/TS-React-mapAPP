import firebase from "firebase/compat/app";
import {
  SETLOGINUSER,
  DELETELOGINUSER,
  MAPLIST,
  POSITIONLIST,
  DELETEMAPLIST,
} from "../actions";

const initialState = {
  loginUser: null,
  mapList: [],
  positionList: [],
};

export const StoreState = (state = initialState, action: any) => {
  // documentの指定idのやつの中にある一部の値だけ更新
  switch (action.type) {
    case SETLOGINUSER:
      return { ...state, loginUser: action.loginUser };

    case DELETELOGINUSER:
      return { ...state, loginUser: null, mapList: [] };

    case MAPLIST:
      let newMapList = state.mapList.slice();
      // console.log(newMapList);
      newMapList = action.Item;
      // console.log(newMapList);
      return { ...state, mapList: newMapList };

    case POSITIONLIST:
      let newPositionList = state.mapList.slice();
      // console.log(newMapList);
      newPositionList = action.Posi;
      // console.log(newMapList);
      return { ...state, positionList: newPositionList };

    // -----------------------------------------------------------------------

    // case DELETEMAPLIST: {
    //   const copyMapList = state.mapList.concat() // コピー
    //   console.log(copyMapList);

    //   copyMapList.splice(action.index, 1)

    //   firebase.firestore()
    //         .collection(`users/${state.loginUser.uid}/Lists`)
    //         .doc (copyMapList[0].id) // 自動ID => copyCart[0].id
    //         .update ( copyMapList[0] )
    //         console.log ( state.mapList );
    //         console.log(state.loginUser.uid);

    //         return { ...state, mapList:copyMapList}
    // }

    default:
      return state;
  }
};
