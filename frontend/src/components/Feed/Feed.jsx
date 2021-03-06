import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import Post from "../Post/Post";
import axios from "axios";
import { Search } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import "./feed.css";

const Feed = ({ friendId, allPosts }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      let res;
      if (friendId) {
        res = await axios.get("/posts/profile/" + friendId);
      } else if (allPosts) {
        res = await axios.get("/posts");
      } else {
        res = await axios.get("/posts/timeline/" + user._id);
      }

      setPosts(res.data);
    };
    fetchPosts();
  }, [friendId, user?._id]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const titleFilter = posts.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(titleFilter);
    }
  };

  const handleCategoriesFilter = (event) => {
    const searchWord = event.target.value;
    const categoriesFilter = posts.filter((value) => {
      return value.categories.includes(searchWord);
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(categoriesFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  return (
    <div className="feed">
      {posts.length !== 0 ? (
        <>
          <div className="searchbar">
            {!wordEntered ? (
              <Search className="searchIcon" />
            ) : (
              <CloseIcon
                id="clearBtn"
                className="searchIcon"
                onClick={clearInput}
              />
            )}
            <input
              placeholder="Search"
              value={wordEntered}
              className="searchInput"
              onChange={handleFilter}
            />
          </div>
          <div className="categoriesWrapper">
            <label className="categorieLabel">???????????????</label>
            <select
              onChange={handleCategoriesFilter}
              className="categoriesOption"
            >
              <option value="??????">??????</option>
              <option value="?????????">?????????</option>
              <option value="??????">??????</option>
              <option value="??????">??????</option>
              <option value="??????">??????</option>
              <option value="??????">??????</option>
              <option value="??????">??????</option>
            </select>
          </div>
          {filteredData.length !== 0 && (
            <div className="feedWrapper">
              {filteredData.slice(0, 15).map((p) => (
                <Post key={p._id} post={p} />
              ))}
            </div>
          )}
          {filteredData.length === 0 && (
            <div className="feedWrapper">
              {posts.map((p) => (
                <Post key={p._id} post={p} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="noConversationText">
          ?????????????????????????????????????????????????????????
        </div>
      )}
    </div>
  );
};

export default Feed;
