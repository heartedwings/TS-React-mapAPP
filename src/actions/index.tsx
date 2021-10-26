// reducersで更新処理をする際の判別や、処理に使うデータを加工する関数(ActionCreator)の工場
export const SETLOGINUSER = 'setLoginUser';
export const DELETELOGINUSER = 'deleteLoginUser';
export const MAPLIST = 'mapList';
export const DELETEMAPLIST = 'deleteMapList';
export const POSITIONLIST = 'positionList';

export const setLoginUser = (user:any) =>({ // ログインユーザー情報のセット
    type: SETLOGINUSER,
    loginUser:user
})

export const deleteLoginUser = () =>({ // ログインユーザー情報の削除
    type: DELETELOGINUSER,
})

export const mapList = (Item:any) =>({
    type: MAPLIST,
    Item: Item
})

export const positionList = (Posi:any) =>({
    type: MAPLIST,
    Posi: Posi
})


export const deleteMapList = (index:any) =>({
    type: DELETEMAPLIST,
    index: index
})