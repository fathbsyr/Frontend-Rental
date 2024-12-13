import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

function Ulasan() {
  const tableRef = useRef(null);
  const [dataMobil, setDataMobil] = useState([]); // State untuk data mobil
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

    // Fetch data dari API
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8000/api/ulasan");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          console.log("Data fetched:", result); // Log untuk memeriksa data
          if (Array.isArray(result)) {
            setDataMobil(result); // Set data jika array
          } else if (result.data && Array.isArray(result.data)) {
            setDataMobil(result.data); // Jika data ada dalam key `data`
          } else {
            throw new Error("Data format is not supported");
          }
          setError(null); // Reset error jika berhasil
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err.message); // Simpan pesan error
        } finally {
          setLoading(false); // Matikan loading
        }
      };
  
      fetchData();
    }, []);
  
  useEffect(() => {
    const table = $(tableRef.current).DataTable();
    return () => {
      table.destroy();
    };
  }, []);

    // Inisialisasi DataTables
    useEffect(() => {
      if (dataMobil.length > 0) {
        const table = $(tableRef.current).DataTable({
          data: dataMobil, // Data langsung ke DataTables
          columns: [
            { title: "Komentar", data: "komentar" },
            { title: "Pelanggan", data: "pelanggan" },
          ],
          destroy: true, // Hapus tabel lama sebelum re-render
        });
        return () => {
          table.destroy(); // Hapus DataTables saat unmount
        };
      }
    }, [dataMobil]);

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Data Ulasan</h1>
      <p className="mb-4">Tempat Pengelolaan Data Ulasan</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            DataTables Example
          </h6>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : (
            <div className="table-responsive">
              <table
                id="dataTable"
                width="100%"
                cellSpacing="0"
                ref={tableRef}
                className="table table-bordered dataTable"
              ></table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Ulasan;
