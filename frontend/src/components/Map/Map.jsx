import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useState, useRef, useCallback, useContext } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { PermMedia, Room, Star } from "@material-ui/icons";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import "./map.css";
import storage from "../../firebase";
import { AuthContext } from "../../context/auth/AuthContext";
import { CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

function Map({ friend }) {
  const { user } = useContext(AuthContext);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(1);
  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(); //for geocoder
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 35.85692327117018,
    longitude: 139.2924985918451,
    zoom: 4.5,
  });

  // for firebase storage
  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/map/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setImg((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: img, label: "img" }]);
    setLoading(true);
  };

  //Get All My Pin
  useEffect(() => {
    const getPins = async () => {
      const id = friend ? friend._id : user._id;
      try {
        const myPins = await axios.get("posts/" + id, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setPins(myPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      userId: user._id,
      username: user.username,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      lng: newPlace.lng,
      img,
    };

    try {
      const res = await axios.post("/posts", newPin, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setPins([...pins, res.data]);
      setImg(null);
      setNewPlace(null);
      setUploaded(0);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //Set a id for popup when click the Room icon
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      lng: longitude,
    });
  };

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  return (
    <ReactMapGL //All Map View
      ref={mapRef}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle="mapbox://styles/takumakamio/cksnga7i00trn18nwda4vpmg0"
      onDblClick={handleAddClick}
    >
      <Geocoder //Search bar
        mapRef={mapRef}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={handleGeocoderViewportChange}
        collapsed="true"
        position="top-right"
      />
      {pins.map((p) => (
        <>
          <Marker
            latitude={p.lat}
            longitude={p.lng}
            offsetLeft={viewport.zoom * -2}
            offsetTop={viewport.zoom * -4}
          >
            <Room // Pin
              style={{
                fontSize: viewport.zoom * 4,
                color: p.username === user ? "tomato" : "slateblue",
                cursor: "pointer",
              }}
              onClick={() => handleMarkerClick(p._id, p.lat, p.lng)}
            />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup
              latitude={p.lat}
              longitude={p.lng}
              closeButton={true}
              closeOnClick={false}
              anchor="left"
              onClose={() => setCurrentPlaceId(null)}
            >
              <Card className="card">
                <CardHeader title={p.title} />
                <CardMedia className="media" image={p.img.img} />
                <CardContent>
                  <div className="cardInfo">
                    <label>Review</label>
                    <p className="desc">{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {Array(p.rating).fill(<Star className="star" />)}
                    </div>
                    <label>Information</label>
                    <span className="username">
                      <b>{p.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            </Popup>
          )}
        </>
      ))}

      {newPlace && user && (
        <Popup // For Upload
          latitude={newPlace.lat}
          longitude={newPlace.lng}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={() => setNewPlace(null)}
        >
          <div>
            <form>
              <div>
                <label htmlFor="file" className="shareOption">
                  <PermMedia htmlColor="tomato" className="shareIcon" />
                  <div className="shareImgContainer">
                    {img ? (
                      <div>添付完了</div>
                    ) : (
                      <div>写真を添付してください</div>
                    )}
                  </div>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </label>
              </div>
              <label>地名</label>
              <input
                placeholder="(例) 東京タワー"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>コメント</label>
              <input
                placeholder="(例) 展望台からの景色"
                onChange={(e) => setDesc(e.target.value)}
              />
              <label>レート</label>
              <select onChange={(e) => setStar(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {uploaded === 1 ? (
                <button
                  type="submit"
                  className="submitButton"
                  onClick={handleSubmit}
                >
                  Add Pin
                </button>
              ) : (
                <button
                  className="submitButton"
                  onClick={handleUpload}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    " Upload"
                  )}
                </button>
              )}
            </form>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default Map;
