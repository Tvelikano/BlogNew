import React from "react";

export default class Carousel extends React.Component<any> {
  public render() {
    return (
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        </ol>
        <div className="carousel-inner  ">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="http://localhost:53695/Content/carousel1.jpg"
              alt="First slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>Дворец Культуры</h1>
              <h3>ул. Ленина 27</h3>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="http://localhost:53695/Content/carousel2.jpg"
              alt="Second slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h2>Непревзойденная архитектура</h2>
              <h3>Построен в 1923</h3>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="http://localhost:53695/Content/carousel3.jpg"
              alt="Third slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h2>Просторные залы</h2>
              <h3>3 больших зала, вместимостью более 5000 человек</h3>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}
