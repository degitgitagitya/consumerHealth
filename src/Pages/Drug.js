import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Topbar from "../Components/Topbar";
import styled from "styled-components";
import Footer from "../Components/Footer";

const CardImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 15px;
  border: 1px solid #f1f1f1;
  width: 300px;
  height: 400px;
  padding: 1rem;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

function Drug() {
  const [body, setBody] = useState([]);

  const fetchObat = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_API_URL}/drug`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setBody(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchObat();
  }, []);

  return (
    <div>
      <Topbar></Topbar>
      <Container>
        <div className="d-flex mt-3 flex-wrap justify-content-around">
          {body.map((data) => {
            return (
              <div className="p-1">
                <Card key={data.id}>
                  <CardImage
                    src="https://m.economictimes.com/thumb/msid-71344481,width-1200,height-900,resizemode-4,imgsize-523232/1.jpg"
                    alt="drug-image"
                  ></CardImage>
                  <h4 className="mt-3">{data.name}</h4>
                  <hr />
                  <p>{data.information}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default Drug;
