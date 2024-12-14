function Search () {
    return (
        <div className="container-fluid bg-white pt-3 px-lg-5">
        <div className="row mx-n2">
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <select className="custom-select px-4 mb-3" style={{ height: 50 }}>
              <option selected>Pickup Location</option>
              <option value={1}>Location 1</option>
              <option value={2}>Location 2</option>
              <option value={3}>Location 3</option>
            </select>
          </div>
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <select className="custom-select px-4 mb-3" style={{ height: 50 }}>
              <option selected>Drop Location</option>
              <option value={1}>Location 1</option>
              <option value={2}>Location 2</option>
              <option value={3}>Location 3</option>
            </select>
          </div>
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <div className="date mb-3" id="date" data-target-input="nearest">
              <input
                type="text"
                className="form-control p-4 datetimepicker-input"
                placeholder="Pickup Date"
                data-target="#date"
                data-toggle="datetimepicker"
              />
            </div>
          </div>
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <div className="time mb-3" id="time" data-target-input="nearest">
              <input
                type="text"
                className="form-control p-4 datetimepicker-input"
                placeholder="Pickup Time"
                data-target="#time"
                data-toggle="datetimepicker"
              />
            </div>
          </div>
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <select className="custom-select px-4 mb-3" style={{ height: 50 }}>
              <option selected>Select A Car</option>
              <option value={1}>Car 1</option>
              <option value={2}>Car 1</option>
              <option value={3}>Car 1</option>
            </select>
          </div>
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <button
              className="btn btn-primary btn-block mb-3"
              type="submit"
              style={{ height: 50 }}
            >
              Search
            </button>
          </div>
        </div>
        </div>
    )
}
export default Search;