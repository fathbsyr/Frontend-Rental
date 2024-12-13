import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

const Mobil = () => {
  const tableRef = useRef(null); // Referensi ke tabel
  const [dataMobil, setDataMobil] = useState([]); // State untuk data mobil
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

  // Fetch data dari API dengan Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/mobil");
        console.log("Data fetched:", response.data); // Log respons untuk debugging
        if (Array.isArray(response.data)) {
          setDataMobil(response.data); // Jika data adalah array langsung
        } else if (response.data.data && Array.isArray(response.data.data)) {
          setDataMobil(response.data.data); // Jika data ada di key data
        } else {
          throw new Error("Data format is not supported");
        }
        setError(null); // Reset error jika berhasil
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message); // Set error jika ada masalah
      } finally {
        setLoading(false); // Matikan loading
      }
    };

    fetchData();
  }, []);

  // Inisialisasi DataTables
  useEffect(() => {
    if (dataMobil.length > 0) {
      const table = $(tableRef.current).DataTable({
        data: dataMobil, // Data untuk DataTables
        columns: [
          { title: "Brand", data: "brand" },
          { title: "Nama", data: "nama" },
          { title: "Harga", data: "harga" },
          { title: "Ketersediaan", data: "ketersediaan" },
          { title: "Deskripsi", data: "deskripsi" },
        ],
        destroy: true, // Hapus tabel lama sebelum re-render
      });
      return () => {
        table.destroy(); // Hapus DataTables saat unmount
      };
    }
  }, [dataMobil]);

  // Render
  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Table Data Mobil</h1>
      <p className="mb-4">Tempat Pengelolaan Data Mobil</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
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
};

export default Mobil;