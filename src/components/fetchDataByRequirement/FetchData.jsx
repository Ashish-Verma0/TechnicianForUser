import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FetchData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [keyword, setKeyWord] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8500/api/tech/all/tech?keyword=${location.state}`
      );
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  let result = [];

  for (let i = 0; i < data.length; i++) {
    let a = data[i].skills[0].split(",");
    if (a.includes(keyword)) {
      result.push(data[i]);
    }
  }

  const moveToNext = (id) => {
    navigate("/tech/profile", { state: id });
  };
  return (
    <>
      <div
        className="input-group rounded"
        style={{
          width: "70%",
          margin: "auto",
          marginTop: "2%",
          //   height: "100px",
        }}
      >
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search By Requiremwnt"
          aria-label="Search"
          aria-describedby="search-addon"
          value={keyword}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <span className="input-group-text border-0" id="search-addon">
          <button className="btn btn primary">Search</button>
        </span>
      </div>
      <div
        style={{
          width: "70%",
          margin: "auto",
          marginTop: "2%",
          height: "100px",
        }}
      >
        <h2 style={{ textAlign: "center", marginTop: "3%" }}>
          Your Selected Requirement
        </h2>

        {result?.length > 0
          ? result?.map((elem) => {
              const { _id, JobTitle, skills, description, phone, adhar } = elem;
              // if (user.pinCode === pinCode || JobTitle === location?.state){}
              return (
                <div
                  className="list-item"
                  key={_id}
                  onClick={() => moveToNext(_id)}
                >
                  <div className="list-item-image">
                    <img src={`http://localhost:8500/${adhar}`} alt="Item" />
                  </div>
                  <div
                    className="list-item-content"
                    style={{ maxWidth: "70%" }}
                  >
                    <h3 className="list-item-title">{JobTitle}</h3>
                    <p className="list-item-description">{skills}</p>
                    <p className="list-item-description">{description}</p>
                    <p className="list-item-description">{phone}</p>
                  </div>
                </div>
              );
            })
          : data?.map((elem) => {
              const { _id, JobTitle, skills, description, phone, adhar } = elem;

              return (
                <div
                  className="list-item"
                  key={_id}
                  onClick={() => moveToNext(_id)}
                >
                  <div className="list-item-image">
                    <img src={`http://localhost:8500/${adhar}`} alt="Item" />
                  </div>
                  <div
                    className="list-item-content"
                    style={{ maxWidth: "70%" }}
                  >
                    <h3 className="list-item-title">{JobTitle}</h3>
                    <p className="list-item-description">{skills}</p>
                    <p className="list-item-description">{description}</p>
                    <p className="list-item-description">{phone}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default FetchData;
