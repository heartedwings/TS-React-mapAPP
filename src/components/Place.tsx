import React, { useState, useEffect, useRef } from "react";
// import { GoogleApiWrapper, Map } from 'google-maps-react';
import { useHistory } from "react-router-dom";
import { Geocoder } from "./Geocoder";
import "./../CSS/App.css";

// interface Geo {
//   address: string;
// }

// navigator.geolocation.getCurrentPosition
const ErrorText = () => (
  <p className="App-error-text">geolocation IS NOT available</p>
);

export function Place() {
  const history = useHistory();
  // const handÚleLink = (path: any) => history.push(path);

  const [isAvailable, setAvailable] = useState<any>(false),
    [position, setPosition] = useState<any>({
      latitude: null,
      longitude: null,
    }),
    [watchStatus, setWatchStatus] = useState<any>({
      isWatching: false,
      watchId: null,
    }),
    [place, setPlace] = useState<string>(""),
    [searchList, setSearchList] = useState<any>([]);

  // 入力した住所を取得 value!!
  const inputPlace = (e: any) => {
    setPlace(e.target.value);
    console.log(e.target.value);
  };

  // const newSearchList = [...searchList, place];
  //   setSearchList(newSearchList);
  //   setPlace("");

  const search = () => {
    if (place !== "") {
      // Google Maps APIのジオコーダを使います。
       const google = window.google
      let geo = new google.maps.Geocoder();

      geo.geocode(
        {
          address: place,
          region: "jp",
          //  latLng: LatLng,
          //  bounds: LatLngBounds,
          //  language: string,
          //  country: string,
        },

        function (results, status) {
          let idokeido = "";
          // OK : レスポンスには有効な GeocoderResponse が含まれています。ジオコードが成功したことを示します。
          if (status == google.maps.GeocoderStatus.OK) {
            //緯度を取得します。
            let ido = results![0].geometry.location.lat();
            //経度を取得します。
            let keido = results![0].geometry.location.lng();

            console.log("緯度 : " + ido);
            console.log("経度 : " + keido);

            // idokeido += "■ 緯度：" + ido + "\n　経度：" + keido + "\n";
          } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
            alert("住所が見つかりませんでした。");
          } else if (status == google.maps.GeocoderStatus.ERROR) {
            alert("サーバ接続に失敗しました。");
          } else if (status == google.maps.GeocoderStatus.INVALID_REQUEST) {
            alert("リクエストが無効でした。");
          } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            alert("リクエストの制限回数を超えました。");
          } else if (status == google.maps.GeocoderStatus.REQUEST_DENIED) {
            alert("サービスが使えない状態でした。");
          } else if (status == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
            alert("原因不明のエラーが発生しました。");
          }

          //緯度・経度の結果表示をします。
          // document.getElementById('idokeidoOutput').value = idokeido;
          const newSearchList = [...searchList, idokeido];
          setSearchList(newSearchList);
          setPlace("");
        }
      );
    }
  };



  // useEffectが実行されているかどうかを判定するために用意しています
  //lat:緯度, lng:軽度, Map:スペース(-), record_no:レコード番号
  const isFirstRef = useRef(true);

  useEffect(() => {
    isFirstRef.current = false;
    if ("geolocation" in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);

  const getCurrentPosition = () => {
    // 現在の位置情報を取得
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });
  };

  /*
   * 監視を開始します
   */
  const startWatchPosition = () => {
    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });

    setWatchStatus({ isWatching: true, watchId });
  };

  /*
   * 監視を停止します
   */
  const stopWatchPosition = (watchStatus: any) => {
    navigator.geolocation.clearWatch(watchId);
    setWatchStatus({ isWatching: false, watchId });
  };

  // useEffect実行前であれば、"Loading..."という呼び出しを表示させます
  if (isFirstRef.current) return <div className="App">Loading...</div>;

  const { isWatching, watchId } = watchStatus;

  // 住所から経度緯度検索 Reactのライブラリreact-geocode

  const searchPlace = searchList.map((list: any, index: any) => (
    <div key={index}>{list}</div>
  ));

  return (
    <div className="App">
      <div className="main">
        <h2>Geolocation API Sample</h2>
        {!isFirstRef && !isAvailable && <ErrorText />}
        {isAvailable && (
          <div>
            <button onClick={getCurrentPosition}>Get Current Position</button>
            {isWatching ? (
              <button onClick={() => stopWatchPosition(watchStatus)}>
                Stop Watch Position
              </button>
            ) : (
              <button onClick={startWatchPosition}>Start Watch Position</button>
            )}
            <div>
              <h3>Position</h3>
              <div>
                latitude: {position.latitude}
                <br />
                longitude: {position.longitude}
              </div>
            </div>
            <div>
              <h3>Watch Mode</h3>
              <p>Watch Status: {isWatching ? "Watching" : "Not Watching"}</p>
              <p>Watch ID: {watchId}</p>
            </div>
          </div>
        )}

        <hr />

        {/* <div onLoad={initialize}> */}
        <div>
          {/* <h2>住所から検索</h2>
          <input type="text" value={place} onChange={inputPlace} />
          <button onClick={search}>検索する</button>
          <div>{searchPlace}</div>
          <div>latitude : </div>
          <div>longitude : </div> */}
          {/* <div>{idokeido}</div> */}

          <Geocoder/>
        </div>
      </div>
    </div>
  );
}

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyDqIaKCNpzJ-svGUEpO0354pil78uEI9O0"
// })(Place);

<script
  type="text/javascript"
  src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDqIaKCNpzJ-svGUEpO0354pil78uEI9O0"
></script>;
