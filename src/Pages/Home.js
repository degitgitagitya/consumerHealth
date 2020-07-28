import React, { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import Topbar from "../Components/Topbar";
import styled from "styled-components";
import commaNumber from "comma-number";
import Footer from "../Components/Footer";

const CardCovid = styled.div`
  width: 30%;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  height: 6rem;
  padding-top: 1rem;
  text-align: center;
  border-radius: 10px;
`;

const TitleCardCovid = styled.div`
  width: 100%;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  height: 3rem;
  padding-top: 0.6rem;
  border-radius: 0 0 10px 10px;
`;

function Home() {
  const [newsList, setNewsList] = useState([]);

  const [index, setIndex] = useState(0);

  const [dataCovid, setDataCovid] = useState({
    NewConfirmed: 204606,
    TotalConfirmed: 16251807,
    NewDeaths: 4104,
    TotalDeaths: 648621,
    NewRecovered: 134985,
    TotalRecovered: 9396854,
  });

  const [allResult, setAllResult] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    fetchNews();
    fetchData();
  }, []);

  const fetchNews = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "__cfduid=d61e104e8702d50862a9be546a7767c881595859813"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "http://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=1c3660e5c51c47c3ad5e8e5cca4b1252",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setNewsList(result.articles);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://api.covid19api.com/summary", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAllResult(result.Countries);
        setDataCovid(result.Global);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <Topbar></Topbar>
      <Container>
        <Carousel className="mt-2" activeIndex={index} onSelect={handleSelect}>
          {newsList.slice(0, 5).map((data, index) => {
            return (
              <Carousel.Item key={index}>
                <a target="_blank" href={data.url} rel="noopener noreferrer">
                  <img
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "600px",
                    }}
                    src={data.urlToImage}
                    alt="First slide"
                  />
                  <Carousel.Caption className="bg-dark shadow">
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                  </Carousel.Caption>
                </a>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <hr className="mt-3" />
        <h3>Coronavirus Information</h3>
        <div className="row">
          <div className="card w-100 p-2 pb-3">
            <h5 className="text-center mt-2">Data Global</h5>
            <select
              onChange={(e) => {
                let temp = allResult.filter(
                  (data) => data.CountryCode === e.target.value
                )[0];

                setDataCovid(temp);
              }}
              className="form-control"
            >
              <option value="">Select Country</option>
              {allResult.map((data) => {
                return (
                  <option key={data.CountryCode} value={data.CountryCode}>
                    {data.Country}
                  </option>
                );
              })}
            </select>
            <hr />
            <div className="d-flex justify-content-between">
              {console.log(dataCovid)}
              <CardCovid bg="#fff5f5" color="#e53e3e">
                <h4>{commaNumber(dataCovid.TotalConfirmed)}</h4>
                <TitleCardCovid bg="#fed7d7" color="#e53e3e">
                  <h5>Total Confirmed</h5>
                </TitleCardCovid>
              </CardCovid>
              <CardCovid bg="#f0fff4" color="#38a169">
                <h4>{commaNumber(dataCovid.TotalRecovered)}</h4>
                <TitleCardCovid bg="#c6f6d5" color="#38a169">
                  <h5>Total Recovered</h5>
                </TitleCardCovid>
              </CardCovid>
              <CardCovid bg="#edf2f7" color="#718096">
                <h4>{commaNumber(dataCovid.TotalDeaths)}</h4>
                <TitleCardCovid bg="#e2e8f0" color="#718096">
                  <h5>Total Deaths</h5>
                </TitleCardCovid>
              </CardCovid>
            </div>
          </div>
        </div>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer></Footer>
    </div>
  );
}

export default Home;
