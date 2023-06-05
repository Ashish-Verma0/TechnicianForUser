import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const array = [
    // {
    //   title: "Technician",
    //   desc: "Many expert Technician like :- Sound Teachnician,Watch Teachnician,Mobile",
    //   img: "",
    // },
    {
      title: "Electrician",
      desc: "How Are you",
      img: "",
    },
    {
      title: "Mechanic",
      desc: "Many expert Mechanic like :- Sound Mechanic,Watch Mechanic,Mobile Mechanic,Car Mechanic,Bike Mechanic,Ac Mechanic,Cooler Mechanic,freeze Mechanic,Motor Mechanic,Washing machine Mechanic,Tv Mechanic,mixture Mechanic",
      img: "",
    },
    {
      title: "Plumber",
      desc: "How Are you",
      img: "",
    },
    {
      title: "Guard",
      desc: "How Are you",
      img: "",
    },
    {
      title: "Coaching Teacher",
      desc: "How Are you",
      img: "",
    },
    {
      title: "Cleaning",
      desc: "How Are you",
      img: "",
    },
    {
      title: "Cooking ",
      desc: "How Are you",
      img: "",
    },
  ];

  const moveToNext = (data) => {
    navigate("/requirement", { state: data });
  };
  return (
    <div
      style={{
        width: "70%",
        margin: "auto",
        marginTop: "2%",
        height: "100px",
      }}
    >
      <h2 style={{ textAlign: "center", marginTop: "3%" }}>
        Select Your Requirement
      </h2>
      {array?.map((elem) => {
        const { title, desc, img } = elem;
        return (
          <div
            className="list-item"
            key={title}
            onClick={() => moveToNext(title)}
          >
            <div className="list-item-image">
              <img src={img} alt="Item" />
            </div>
            <div className="list-item-content">
              <h3 className="list-item-title">{title}</h3>
              <p className="list-item-description">{desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
