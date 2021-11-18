/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import "./../CSS/MyPage.css";
import { useForm } from "react-hook-form";
import { deleteMapList } from "../actions";

const mapImage = {
  width: "20%",
};
const userSelector = (state: any) => {
//   console.log(state.StoreState.loginUser);
  return state.StoreState.loginUser;
};
const listSelector = (state: any) => {
//   console.log("listSelector");
//   console.log(state.StoreState.mapList);
console.log(state);

  return state.StoreState.mapList;
};

type valData = {
  name: string;
  addNumber: string;
  address: string;
  latitude: string;
  longitude: string;
  image: string;
};

export const MyPage: () => JSX.Element = () => {
  const getUser = useSelector(userSelector);
//   console.log(getUser);
  const getList = useSelector(listSelector);
//   console.log(getList);

  const dispatch = useDispatch();

  const
    [name, setName] = useState<string>(""),
    [addNumber, setAddNumber] = useState<string>(""),
    [address, setAddress] = useState<string>(""),
    [image, setImage] = useState<string>(""),
    [lists, setLists] = useState<any>([]),
    [lists2, setLists2] = useState<any>([]),
    [latitude, setLatitude] = useState<string>(""), //経度
    [longitude, setLongitude] = useState<string>(""), //緯度
    {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm<valData>();

    // // useEffect (() => {実行したい処理},[依存変数の配列])
    // useEffect ( () => {
    //   console.log('useEffectが実行されました！');
      
    //   lists.length !== 0 && setLists (getList)
    // }, [getList])



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

  const inputName = (e: any) => {
    setName(e.target.value);
    console.log(e.target.value);
  };
  const inputAddNumber = (e: any) => {
    setAddNumber(e.target.value);
    console.log(e.target.value);
  };
  const inputAddress = (e: any) => {
    setAddress(e.target.value);
    console.log(e.target.value);
  };
  const inputLatitude = (e: any) => {
    setLatitude(e.target.value);
    console.log(e.target.value);
  };
  const inputLongitude = (e: any) => {
    setLongitude(e.target.value);
    console.log(e.target.value);
  };
  const inputImage = (e: any) => {
    // setImage(e.target.value);
    // console.log(e.target.value);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log(e.target.result);
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateList = () => {
    console.log(getList);
    // console.log(getList[0]);
    console.log("aaa");

    firebase
      .firestore()
      .collection(`users/${getUser.uid}/Lists`)
      .doc(getList[0].id)
      // .doc()
      .update({
        ...getList[0],

        name:name,
        addNumber: addNumber,
        address: address,
        latitude: latitude,
        longitude: longitude,
        image: image,
      });
  };

  const addMapList = () => {
    firebase
    .firestore()
    .collection(`users/${getUser.uid}/Lists`)
    .add({
      name:"",
      addNumber: "",
      address: "",
      latitude: "",
      longitude: "",
      image: "",
    });

    // console.log(getUser.uid);
  };

  const addMap = (data: valData) => {
    console.log(data);
    const newMapA = [
      ...lists,
      {
        name:name,
        addNumber: addNumber,
        address: address,
        image: image,
        latitude: latitude,
        longitude: longitude,
      },
    ];
    setLists(newMapA);
    updateList();
    addMapList();
    // console.log(addMapList);
    // console.log(updateList);

    setName("")
    setAddNumber("");
    setAddress("");
    setLatitude("");
    setLongitude("");
    setImage("");
  };



  const deleteMap = (index: any) => {
    // const newMapD = [...getList];
    // newMapD.splice(index, 1);
    // setLists(newMapD);

    const copyMapList2 = lists2.concat()
    copyMapList2.splice ( index, 1 )
    setLists2(copyMapList2)

    dispatch ( deleteMapList(index) )

    // console.log(newMapD);
  };



  const allLists = getList.map((list: any, index: any) => (
    <div className="box" key={index}>
      <p>場所名 : {list.name}</p>
      <p>〒 {list.addNumber}</p>
      <p>{list.address}</p>
      <p>{list.latitude}</p>
      <p>{list.longitude}</p>
      <p>
        <img style={mapImage} src={list.image} />
      </p>
      <div className="button">
        <button className="button" onClick={ () => deleteMap(index) }>
          削除
        </button>
      </div>
    </div>
  ));

  const myPro = (
      <div>
    {/* <div>{getUser.displayName}</div> */}
    <div>
      {/* <img src={getUser.photoURL}></img> */}
    </div>
    </div>
  )

  return (
    <div>
      <div>
        <h3>MyPage</h3>
      </div>
      <div className="container">
        <div>
        <div>
            場所 :&nbsp;
            <input
              {...register("name", {
                required: "文字が入力されていません",
              })}
              type="text"
              value={name}
              onChange={inputName}
            />
            <div>{errors.name && "場所を入力してください"}</div>
          </div>

          <div>
            郵便番号 :&nbsp;
            <input
              {...register("addNumber", {
                required: "文字が入力されていません",
                pattern: {
                  value: /^[0-9]{3}-[0-9]{4}$/,
                  message: "xxx-xxxxの形式で入力してください",
                },
              })}
              type="text"
              value={addNumber}
              onChange={inputAddNumber}
            />
            <div>{errors.addNumber && errors.addNumber.message}</div>
          </div>

          <div>
            住所 :&nbsp;
            <input
              {...register("address", { required: true })}
              type="text"
              value={address}
              onChange={inputAddress}
            />
            <div>{errors.address && "住所を入力してください"}</div>
          </div>

          <div>
            緯度 :&nbsp;
            <input
              {...register("longitude", { required: true })}
              type="text"
              value={longitude}
              onChange={inputLongitude}
            />
            <div>{errors.longitude && "設定したい場所の緯度を入力して下さい"}</div>
          </div>

          <div>
            経度 :&nbsp;
            <input
              {...register("latitude", { required: true })}
              type="text"
              value={latitude}
              onChange={inputLatitude}
            />
            <div>{errors.latitude && "設定したい場所の経度を入力して下さい"}</div>
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
            <button onClick={handleSubmit(addMap)}>追加</button>
          </div>
        </div>

        <div>{myPro}</div>
      </div>

      <hr />

        <div>{allLists}</div>
    </div>
  );
};
