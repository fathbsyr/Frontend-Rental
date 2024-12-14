function Topbar () {
    return (
        <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
        <div className="row">
          <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <a className="text-body pr-3" href>
                <i className="fa fa-phone-alt mr-2" />
                +6287878787
              </a>
              <span className="text-body">|</span>
              <a className="text-body px-3" href>
                <i className="fa fa-envelope mr-2" />
                el-rent@car.com
              </a>
            </div>
          </div>
          <div className="col-md-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-body px-3" href>
                <i className="fab fa-facebook-f" />
              </a>
              <a className="text-body px-3" href>
                <i className="fab fa-twitter" />
              </a>
              <a className="text-body px-3" href>
                <i className="fab fa-linkedin-in" />
              </a>
              <a className="text-body px-3" href>
                <i className="fab fa-instagram" />
              </a>
              <a className="text-body pl-3" href>
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
        </div>
        </div>
    )
}
export default Topbar;