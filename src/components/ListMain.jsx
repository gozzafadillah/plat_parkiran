import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button, Card, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { MutationDeletePlat } from "../apollo/Mutation";
import { QueryGetByName, QueryGetPlat } from "../apollo/Query";
import ModalFormEditPlat from "./ModalFormEditPlat";

const ListMain = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [deletePlat, { error: errorDelPlat }] = useMutation(MutationDeletePlat);
  const [getPlatByName, { Data: dataPlatByName }] =
    useLazyQuery(QueryGetByName);
  const [getPlat, { Data: dataPlat }] = useLazyQuery(QueryGetPlat);
  const [plat, setPlat] = useState({
    plat: "",
    name: "",
  });

  const showPlat = (plat) => {
    getPlat({
      variables: {
        plat: plat,
      },
    });
    setShowModal(true);
  };

  const deletePlatData = (plat) => {
    deletePlat({
      variables: {
        Plat: plat,
      },
    });
  };

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "Nama") {
      setPlat(value);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    getPlatByName({
      variables: {
        _iregex: plat,
      },
    });
  };

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
            name="Nama"
            id="Nama"
            style={{ textAlign: "center" }}
            placeholder="Cari Nama"
            onChange={onChangeHandler}
          />
          <Button onClick={(e) => searchHandler(e)}>Search</Button>
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
            {dataPlats?.Plats.map((data) => (
              <tr key={data.plat}>
                <td>{data.plat}</td>
                <td>{data.nama}</td>
                <td>{data.status}</td>
                <td
                  style={{
                    display: "flex",
                    gap: 4,
                  }}
                >
                  <Button onClick={() => showPlat(data.plat)}>View</Button>
                  <ModalFormEditPlat
                    data={data}
                    rfid={props.rfid}
                    id={data.plat}
                  />
                  <Button
                    onClick={() => {
                      deletePlatData(data.plat);
                    }}
                    type="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal
        title={`Detail Data ${dataPlat?.Plat_Kendaraan[0]?.Plat}`}
        centered
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Nama</p>
            <p>{dataPlat?.Plat_Kendaraan[0]?.Nama}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Plat</p>
            <p>{dataPlat?.Plat_Kendaraan[0]?.Plat}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>ID Plat</p>
            <p>{dataPlat?.Plat_Kendaraan[0]?.ID_Plat}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Status</p>
            <p>{dataPlat?.Plat_Kendaraan[0]?.Status}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Free</p>
            <p>{dataPlat?.Plat_Kendaraan[0]?.Free}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Saldo</p>
            <p>{dataPlat?.Plat_Kendaraan[0]?.Saldo}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Keterangan</p>
            <p>{dataPlat?.Plat_Kendaraan[0]?.Keterangan}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListMain;
