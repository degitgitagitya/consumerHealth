import React, { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import Topbar from "../Components/Topbar";

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
        setDataCovid(result.Global);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <Topbar></Topbar>
      <Container>
        <Carousel activeIndex={index} onSelect={handleSelect}>
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
          <div className="card w-100 p-2">
            <h5>Data Global</h5>
            <hr />
            <div>New Confirm : {dataCovid.NewConfirmed}</div>
            <div>Total Confirm : {dataCovid.TotalConfirmed}</div>
            <div>New Deaths : {dataCovid.NewDeaths}</div>
            <div>Total Deaths : {dataCovid.TotalDeaths}</div>
            <div>New Recovered : {dataCovid.NewRecovered}</div>
            <div>Total Recovered : {dataCovid.TotalRecovered}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
