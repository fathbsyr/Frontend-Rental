import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

const Pembayaran = () => {

  const tableRef = useRef(null);
  useEffect(() => {
    const table = $(tableRef.current).DataTable();
    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Table Data Pembayaran</h1>
      <p className="mb-4">Tempat Pengelolaan Data Pembayaran</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Data Pembayaran</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              id="dataTable"
              width="100%"
              cellSpacing="0"
              ref={tableRef}
              className="table table-bordered dataTable"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Age</th>
                  <th>Start date</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Age</th>
                  <th>Start date</th>
                  <th>Salary</th>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>Tiger Nixon</td>
                  <td>System Architect</td>
                  <td>Edinburgh</td>
                  <td>61</td>
                  <td>2011/04/25</td>
                  <td>$320,800</td>
                </tr>
                <tr>
                  <td>Garrett Winters</td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>63</td>
                  <td>2011/07/25</td>
                  <td>$170,750</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pembayaran;
