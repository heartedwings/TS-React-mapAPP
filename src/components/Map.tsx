import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import "./../CSS/App2.css";

// googleMapsApiKey 取得したAPIキーを指定
// mapContainerStyle でheightをvh、widthを%で指定することにより、マップ領域を動的に表示
// Marker を使うことによりマップ上の指定した位置にマーカーを配置
// MarkerLabel の場合はテキストに加えてフォントの指定が可能
// - 「マーカーに数字を振る」みたいな使い方が適していそう
// InfoWindow を使うことによりマップ上の指定した位置にバルーンを配置
// Circle を使うことによりマップ上に指定の位置・半径・スタイルのサークルを配置
// 画像ファイル全般を許可する場合 image/*
// - <input>タグにrequiredを指定すると、ファイルの選択が必須になる

const mapStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 35.6940975,
  lng: 140.018837,
};

const positionMyHouse = {
  lat: 35.6940975,
  lng: 140.018837,
};

const positionMyParentsHouse = {
  lat: 35.724625,
  lng: 139.920596,
};

//埼玉県行田市城西2-6-26
const positionYuri = {
  lat: 36.13278,
  lng: 139.45238,
};

const positionPlace = {
  lat: 0,
  lng: 0,
};

const balloon = {
  background: "white",
  fontSize: 6,
};

const mapImage = {
  width: "20%",
};

const listSelector = (state: any) => {
  //   console.log("listSelector");
  //   console.log(state.StoreState.mapList);
  // console.log(state);
  return state.StoreState.mapList;
};

const positonoSelector = (state:any) => {
  // console.log(state.StoreState.positionList);
  console.log(state);
  return state.StoreState.positionList;
}

export const Map: () => JSX.Element = () => {
  const getList = useSelector(listSelector);
  const getPosition = useSelector(positonoSelector)
;
  const
    [addNumber, setAddNumber] = useState<string>(""),
    [address, setAddress] = useState<string>(""),
    [image, setImage] = useState<string>(""),
    [lists, setLists] = useState<any>([]),
    [size, setSize] = useState<undefined | google.maps.Size>(undefined),
    [selected, setSelected] = useState<any>(null),
    [latitude, setLatitude] = useState<any>(""), //経度
    [longitude, setLongitude] = useState<any>(""), //緯度
    [LArray, setLArray] = useState<any>([]);

// useEffect (() => {実行したい処理},[依存変数の配列])
    useEffect ( () => {
      console.log('useEffectが実行されました！');
      
      lists.length !== 0 && setLists (getList)
      console.log(getList);
      // const newArray = latObjAllay.map ( ( a1:any, index:any ) => {
      //   const newObj = Object.assign ( { lng:0 }, a1 )
      //   newObj.lng = lngObjAllay.filter ( ( a2:any, ij:any ) => ij === index )[0].lng
      //   return newObj
      // })
    }, [getList])

  // 郵便番号入力後、住所自動入力
  // 郵便番号検索API
  // fetch(url, { mode: "cors" }) CORS (Cross-Origin Resource Sharing) なリクエストを送る。 CORSのプロトコルに沿わない場合（必要なヘッダが無いなど）にはエラーとなる。
  // CORSとは、別オリジンのリソースへアクセス(＝ クロスサイトHTTPリクエスト)できるようにするためのルール、手法。
  // 外部のリソースは、JSONPLACEHOLDERを利用してfetchメソッドでpostsデータを取得します。
  useEffect(() => {
    if (addNumber) {
      fetch(`https://api.zipaddress.net/?zipcode=${addNumber}`, {
        mode: "cors",
      })
        .then((result) => {
          return result.json();
        })
        .then((result) => {
          setAddress(result.data?.fullAddress || "");
        });
    }
  }, [addNumber]);


  const inputAddNumber = (e: any) => {
    setAddNumber(e.target.value);
    console.log(e.target.value);
  };
  const inputAddress = (e: any) => {
    setAddress(e.target.value);
    console.log(e.target.value);
  };
  const inputImage = (e: any) => {
    // setImage(e.target.value);
    // console.log(e.target.value);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target.result);
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const inputLatitude = (e: any) => {
    setLatitude(e.target.value);
    console.log(e.target.value);
  };
  const inputLongitude = (e: any) => {
    setLongitude(e.target.value);
    console.log(e.target.value);
  };

  const addList = () => {
    const newList = [
      ...lists,
      {
        addNumber: addNumber,
        address: address,
        image: image,
        latitude: latitude,
        longitude: longitude,
      },
    ];
    setLists(newList);
    setAddNumber("");
    setAddress("");
    setImage("");
    setLatitude("");
    setLongitude("");
    console.log(newList);
  };

  const infoWindowOptions = {
    pixelOffset: size,
  };

  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };

  const allLists = getList.map((list: any, index: any) => (
    <div key={index}>
      <div>{list.addNumber}</div>
      <div>{list.address}</div>
      <div>{list.latitude}</div>
      <div>{list.longitude}</div>
      <div>
        <img style={mapImage} src={list.image} />
      </div>
      {/* <button onClick={deleteTodo}>削除</button> */}
    </div>
  ));





  
  let matchAllLatObj = {lat:0} 
  let matchAllLngObj = {lng:0}
  let latObjAllay = [] //{lat:0} を配列へ
  let lngObjAllay = [] //{lng:0} を配列へ
  let matchAllObj = { lat:0, lng:0 }
  let matchAllArray = [ { lat:0, lng:0 } ];

  // const matchArr = matchAllArray[0]
  // console.log(matchArr);
  

  const matchLatitude = getList.map((list: any) => list.latitude);
  // console.log(matchLatitude); //配列からlatitudeの値を取り出す。

  const matchLongitude = getList.map((list: any) => list.longitude);
  // console.log(matchLongitude); //配列からlatitudeの値を取り出す。

  
  let a = []
  let latitudeArray = []
  for (let i = 0; i < matchLatitude.length; i++) {
    // console.log(matchLatitude[i]); //オブジェクト取り出し
    a.push ( {lat:matchLatitude[i]} )
    // latitudeArray.push ( {lat:matchLatitude[i]})
    // console.log(latitudeArray);//Latitudeの配列
    // console.log(a);//Latitudeの配列 (本物！！！！！)  
  // latitudeArray.forEach ( (latElm:any) => {
  //   // console.log (latElm)
  // });
  
}
// console.log(a)
for (let ii = 0; ii < a.length; ii++) {
  // console.log(a[ii]); //オブジェクト取り出し
  // console.log(a[ii].lat * 1); //オブジェクト取り出し
  matchAllLatObj.lat = a[ii].lat * 1
  // console.log(matchAllLatObj.lat);
latObjAllay.push ( {lat:matchAllLatObj.lat } )
  // console.log(latObjAllay);
  // console.log(latObjAllay[0], latObjAllay[1]);
}
for ( let iii = 0; iii < latObjAllay.length; iii++) {
  matchAllObj.lat = latObjAllay[iii]
  // console.log (matchAllObj.lat);
  // matchAllArray.push (matchAllObj.lat)
  // console.log(matchAllArray);
  const latList =  matchAllArray.map ( obj => obj.lat );
  // console.log(latList);
  
  
}



let longitudeArray = []
for (let j = 0; j < matchLongitude.length; j++) {
  // console.log(matchLongitude[j]); //オブジェクト取り出し
  longitudeArray.push ( {lng:matchLongitude[j]} )
  // console.log(longitudeArray);//Longitudeの配列

  // longitudeArray.forEach ( (lonElm:any) => {
  //   // console.log (lonElm)
  // });
}

for (let jj = 0; jj < longitudeArray.length; jj++) {
// console.log( longitudeArray[jj] ); //オブジェクト取り出し
// console.log( longitudeArray[jj].lng * 1 );
matchAllLngObj.lng = longitudeArray[jj].lng * 1
// console.log(matchAllLngObj.lng);
  // console.log(matchAllLngObj);
  lngObjAllay.push ( {lng:matchAllLngObj.lng } )
  // console.log(lngObjAllay);
  // console.log(lngObjAllay[0], lngObjAllay[1]);
  
}
for ( let jjj = 0; jjj < lngObjAllay.length; jjj++) {
  matchAllObj.lng = lngObjAllay[jjj]
  // console.log(matchAllObj.lng);
  // matchAllArray.push (matchAllObj.lng)
  
}

// let final = Object.assign (latObjAllay, lngObjAllay)
// console.log (final);


// // console.log(matchAllArray);
// const newArray = latObjAllay.map ( ( a1:any, index:any ) => {
//   a1.lng = lngObjAllay.filter ( ( a2:any, ij:any ) => ij === index )[0].lng
//   return a1
// })
// console.log ( newArray );

// const newArray2 = [];
// for ( let oneij = 0; oneij < newArray.length; oneij++ ) {
//   console.log(newArray[oneij])
//   newArray2.push (newArray[oneij])
// }

// const lngObjAllays = [ {lng:200}, {lng:300}, {lng:400} ]
// const latObjAllays = [ {lat:10}, {lat:20}, {lat:30} ]

const newArray = latObjAllay.map ( ( a1:any, index:any ) => {
  const newObj = Object.assign ( { lng:0 }, a1 )
  newObj.lng = lngObjAllay.filter ( ( a2:any, ij:any ) => ij === index )[0].lng
  
  return newObj
})

// for ( let oneij = 0; oneij < newArray.length; oneij++ ) {
//   console.log(newArray[oneij])
//   console.log(newArray[oneij].lat)
//   console.log(newArray[oneij].lng)
// }

// const addLArray = () => {
//   const newArr = [
//     ...LArray,
//     {
//       lat: latitude,
//       lng: longitude,
//     },
//   ];
//   setLArray(newArr);
//   console.log(newArr);
  
// }

// const marker = new google.maps.Marker ({
//   position : newArray
// })

console.log(newArray);


// const positionPlace = newArray

const positionPlace = newArray.map( (place:any, index:any) => (
  <div key={index}>
    <p>{place.lat}</p>
    <p>{place.lng}</p>
  </div>
));

// const positionPlace = newArray2

// const positionPlace = newArray.map( ( p: any, index:any ) => (
//   <Marker
//     key={index}
//     position={{
//       lat: p.lat,
//       lng: p.lng,

//     }}
//     // onMouseOver={() => {
//     //   setSelected({
//     //     lat: p.lat,
//     //     lng: p.lng,
//     // });
//     // }}
//   />
// ))





// const array = newArray.forEach (function (itcdem, index, array) {
//   console.log(item, index);
// })
// console.log(array);



// var geocoder = new google.maps.Geocoder(); geocoder.getLatLng(address：'千葉県市川市', callback:function);

// 　callback_function(latlng) { //処理を記述 }





  return (
    <div>

      <div>
        <h2>私のお気に入り MAP</h2>
      </div>

      <div>{ positionPlace }</div>
      {/* <div>{ newArray }</div> */}
      
      {/* <div>
        郵便番号 :
        <input type="text" value={addNumber} onChange={inputAddNumber} />
      </div>

      <div>
        住所 : <input type="text" value={address} onChange={inputAddress} />
      </div>

      <div>
        緯度 : <input type="text" value={longitude} onChange={inputLongitude} />
      </div>

      <div>
        経度 : <input type="text" value={latitude} onChange={inputLatitude} />
      </div>

      <div>
        <label htmlFor="upload" className="upload-label">
          ファイルを選択
          <input
            type="file"
            id="upload"
            src={image}
            onChange={inputImage}
            name="example"
            accept=".png, .jpg, .jpeg, .pdf, .doc"
          />
        </label>
      </div>

      <div>
        <button onClick={addList}>追加</button>
      </div> */}


      <LoadScript
        googleMapsApiKey="AIzaSyDqIaKCNpzJ-svGUEpO0354pil78uEI9O0"
        onLoad={() => createOffsetSize()}
      >
        <GoogleMap mapContainerStyle={mapStyle} center={center} zoom={11}>
          {/* <Marker
            position={positionMyHouse} //ここ
            onMouseOver={() => {
              setSelected(positionMyHouse); //ここ
              // マウスオーバーで<InfoWindow>が描画。
            }}
          /> */}
          {/* <Marker
            position={positionMyParentsHouse} //ここ
            onMouseOver={() => {
              setSelected(positionMyParentsHouse); //ここ
              // マウスオーバーで<InfoWindow>が描画。
            }}
          /> */}
          <Marker
            position={positionYuri} //ここ
            onMouseOver={() => {
              setSelected(positionYuri); //ここ
              // マウスオーバーで<InfoWindow>が描画。
            }}
          />
          
          {/* <Marker
            defaultPosition={newArray}
          /> */}
          

          { newArray.map( ( p: any, index:any ) => (
                <Marker
                  key={index}
                  position={{
                    lat: p.lat,
                    lng: p.lng,

                  }}
                  // onMouseOver={() => {
                  //   setSelected({
                  //     lat: p.lat,
                  //     lng: p.lng,
                  // });
                  // }}
                />
              ))
            }

{/* {positionPlace} */}


          {selected ? (
            <InfoWindow
              position={positionMyHouse} //ここ
              options={infoWindowOptions}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div style={balloon}>
                <h1>我が家</h1>
                <div>{allLists[2]}</div>
              </div>
            </InfoWindow>
          ) : null}

          {selected ? (
            <InfoWindow
              position={positionMyParentsHouse} //ここ
              options={infoWindowOptions}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div style={balloon}>
                <h1>実家</h1>
                <div>{allLists[0]}</div>
              </div>
            </InfoWindow>
          ) : null}

{/* {selected ? (
            <InfoWindow
              position={positionYuri} //ここ
              options={infoWindowOptions}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div style={balloon}>
                <h1>ゆり家</h1>
                <div>{allLists}</div>
              </div>
            </InfoWindow>
          ) : null} */}

{/* {selected
            ? newArray.map( ( place: any, index:any ) => (
                <InfoWindow
                  key={index}
                  position={{
                    lat: place.lat,
                    lng: place.lng,
                  }}
                  options={infoWindowOptions}
                  onCloseClick={() => {
                    setSelected(null);
                  }}
                >
                  <div style={balloon}>
                <h1>色々</h1>
                <div>データ</div>
              </div>
            </InfoWindow>
              ))
            : null} */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
