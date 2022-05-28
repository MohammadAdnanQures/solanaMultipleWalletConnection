import LogoImg from "./images/navbarICon.png";
import "./Navbar.css";
function Navbar() {
  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <a className="navbar-brand mx-5" href="#">
          <img src={LogoImg} className="img-fluid" />
        </a>
        <button
          className="navbar-toggler togglebtnBorder mx-5"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler ">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </span>
        </button>

        <div
          className="collapse navbar-collapse mx-5"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto mx-5">
            <li className="nav-item active mx-lg-4">
              <a className="nav-link px-4 color1Setng" href="#">
                HOME <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 commonColorNavbar" href="#">
                DRAGON
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 commonColorNavbar" href="#">
                MARKET PLACE
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 commonColorNavbar" href="#">
                NEWS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 commonColorNavbar" href="#">
                FAQ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 commonColorNavbar" href="#">
                MORE
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 px-3">
            <button className="btn my-sm-0 btnNavbarSet" type="submit">
              PLAY FOR FREE
            </button>
          </form>
        </div>
      </nav> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <a className="navbar-brand mx-lg-5" href="#">
          <img src={LogoImg} className="img-fluid" />
        </a>
        <button
          className="navbar-toggler bg-transparent togglebtnBorder"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler ">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </span>
        </button>

        <div className="collapse navbar-collapse mx-5" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link color1Setng px-4" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 commonColorNavbar" href="#">
                DRAGON
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 commonColorNavbar" href="#">
                MARKET PLACE
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 commonColorNavbar" href="#">
                NEWS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 commonColorNavbar" href="#">
                FAQ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 commonColorNavbar" href="#">
                MORE
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 px-3">
            <button className="btn my-sm-0 btnNavbarSet" type="submit">
              PLAY FOR FREE
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
