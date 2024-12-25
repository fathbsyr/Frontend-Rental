import { useState, useEffect } from "react";
import axios from "axios";

function Search () {
    return (
        <div className="container-fluid bg-white pt-3 px-lg-5">
        <div className="row mx-n2">
          <div className="col-xl-10 col-lg-4 col-md-6 px-2">
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