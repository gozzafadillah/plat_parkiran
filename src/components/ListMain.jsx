import { Button, Card } from "antd";
import React from "react";

const ListMain = () => {
  const MockData = [
    {
      plat: "D 4249 KP",
      nama: "Muhammad Fadillah Abdul A",
      status: "Mahasiswa",
    },
    {
      plat: "D 3232 ABS",
      nama: "Muhammad Arigo",
      status: "Karyawan",
    },
    {
      plat: "D 3122 KK",
      nama: "Muhammad Arigo",
      status: "Karyawan",
    },
    {
      plat: "D 5222 AS",
      nama: "Muhammad Aldy",
      status: "Karyawan",
    },
    {
      plat: "D 3232 DDD",
      nama: "Rizky",
      status: "Karyawan",
    },
  ];
  return (
    <div
      className="list-plat"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Card style={{ border: "3px solid #0f0e0e" }}>
        <div
          style={{
            margin: "10px 0 30px",
            display: "flxe",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            name="search"
            id="search"
            style={{ textAlign: "center" }}
            placeholder="Cari Plat"
          />{" "}
          <Button>Search</Button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Plat</th>
              <th>Nama</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {MockData.map((data) => (
              <tr>
                <td>{data.plat}</td>
                <td>{data.nama}</td>
                <td>{data.status}</td>
                <td
                  style={{
                    display: "flex",
                    gap: 4,
                  }}
                >
                  <Button>View</Button>
                  <Button type="primary">Edit</Button>
                  <Button type="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ListMain;
