import * as React from "react";

export default class Footer extends React.Component<any> {
  public render() {
    return (
      <footer className="bg-dark">
        <div className="container">
          <div className="bottom_border">
            <div className="row">
              <div className="col-sm-4 col-md col-sm-4 col-12 col">
                <h5 className="col_white pt2">Наши контакты</h5>
                <p>
                  <i className="fa fa-location-arrow" /> г. Могилев, ул. Ленина, д. 12, оф. 3, 212543
                </p>
                <p>
                  <i className="fa fa-phone" /> +375 33 532-4343
                </p>
                <p>
                  <i className="fa fa-envelope" /> info@example.com
                </p>
              </div>

              <div className="col-sm-4 col-md col-6 col">
                <h5 className="headin5 col_white pt2">Статьи</h5>

                <ul className="footer_ul">
                  <li>
                    <a href="#!">Link 1</a>
                  </li>
                  <li>
                    <a href="#!">Link 2</a>
                  </li>
                  <li>
                    <a href="#!">Link 3</a>
                  </li>
                  <li>
                    <a href="#!">Link 4</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4 col-md  col-6 col">
                <h5 className="headin5 col_white pt2">Ссылки</h5>

                <ul className="footer_ul">
                  <li>
                    <a href="#!">Link 1</a>
                  </li>
                  <li>
                    <a href="#!">Link 2</a>
                  </li>
                  <li>
                    <a href="#!">Link 3</a>
                  </li>
                  <li>
                    <a href="#!">Link 4</a>
                  </li>
                </ul>
              </div>


              <div className=" col-sm-4 col-md col-12 col">
                <h5 className="headin5 col_white pt2">Мы в соц-сетях</h5>

                <ul className="footer_ul2">
                  <li><a href="#"><i className="fab fa-twitter fleft padding-right"></i> </a><p>Lorem Ipsum is simply dummy text of the printing...<a href="#">https://www.lipsum.com/</a></p></li>
                  <li><a href="#"><i className="fab fa-twitter fleft padding-right"></i> </a><p>Lorem Ipsum is simply dummy text of the printing...<a href="#">https://www.lipsum.com/</a></p></li>
                  <li><a href="#"><i className="fab fa-twitter fleft padding-right"></i> </a><p>Lorem Ipsum is simply dummy text of the printing...<a href="#">https://www.lipsum.com/</a></p></li>
                </ul>
              </div>

          </div>
        </div>

          <ul className="foote_bottom_ul">
            <li><a href="#">Главная</a></li>
            <li><a href="#">О нас</a></li>
            <li><a href="#">Обратная связь</a></li>
          </ul>

          <p className="text-center">Все права защищены @2019 | Разработано <a href="#">Тимофей Великанов</a></p>

          <ul className="social_footer_ul">
            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
       
      </footer>
    );
  }
}
