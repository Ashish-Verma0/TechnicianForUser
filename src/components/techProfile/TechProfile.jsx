import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./TechProfile.css";
import BookingModel from "../bookTechnician/BookingModel";
const TechProfile = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const [model, setModel] = useState(false);
  const getProfile = async () => {
    try {
      const res = await axios(
        `http://localhost:8500/api/tech/${location?.state}`
      );

      //   console.log(res?.data?.data);
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleModel = () => {
    return setModel(!model);
  };

  return (
    <>
      <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "150px", zIndex: "1" }}
                    />
                    <MDBBtn
                      outline
                      color="dark"
                      style={{ height: "36px", overflow: "visible" }}
                    >
                      Edit profile
                    </MDBBtn>
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography tag="h5">{`${data?.firstName} ${data?.lastName}`}</MDBTypography>
                    <MDBCardText>{data?.city}</MDBCardText>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-1 h5">
                        {data?.phone}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Phone
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">
                        {data?.email}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Email
                      </MDBCardText>
                    </div>
                    {/* <div>
                      <MDBCardText className="mb-1 h5">478</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div> */}
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <MDBCardText className="font-italic mb-1">
                        {data?.description}
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Skills</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <MDBCardText className="font-italic mb-1">
                        {data?.skills}
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Comment Post</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="d-flex ">
                        <div
                          className="form-outline me-3"
                          style={{ width: "24rem" }}
                        >
                          <input
                            type="text"
                            id="form1"
                            className="form-control"
                          />
                        </div>
                        <button type="button" className="btn btn-primary h-25">
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary h-25"
                      onClick={handleModel}
                    >
                      Book Technician
                    </button>
                    {model ? (
                      <BookingModel
                        hide={() => setModel(false)}
                        id={location?.state}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
};

export default TechProfile;
