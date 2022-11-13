import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { Button, Card, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MutationDeletePlat } from "../apollo/Mutation";
import { QueryGetByName, QueryGetPlat } from "../apollo/Query";
import { SubscriptionGetPlat } from "../apollo/Subscription";
import ModalFormEditPlat from "./ModalFormEditPlat";

const ListMain = () => {
  const { data: dataPlats } = useSubscription(SubscriptionGetPlat);
  const [getPlat, { data: dataPlat }] = useLazyQuery(QueryGetPlat);
  const [getSearch, { data: searchPlat }] = useLazyQuery(QueryGetByName);
  const [showModal, setShowModal] = useState(false);
  const [deletePlat, { error: errorDelPlat }] = useMutation(MutationDeletePlat);
  const [plat, setPlat] = useState({
    name: "",
  });

  const socket = io("http://192.168.1.25:5000");

  useEffect(() => {
    socket.on("event", (data) => {
      let t = JSON.parse(data.toString("utf8"));
      console.log(t);
    });
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
    getSearch({
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
            {searchPlat === undefined || searchPlat?.Plat_Kendaraan.length === 2
              ? dataPlats?.Plat_Kendaraan.map((data) => (
                  <tr key={data.Plat}>
                    <td>{data.Plat}</td>
                    <td>{data.Nama}</td>
                    <td>{data.Status}</td>
                    <td
                      style={{
                        display: "flex",
                        gap: 4,
                      }}
                    >
                      <Button onClick={() => showPlat(data.Plat)}>View</Button>
                      <ModalFormEditPlat data={data} id={data.Plat} />
                      <Button
                        onClick={() => {
                          deletePlatData(data.Plat);
                        }}
                        type="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              : searchPlat?.Plat_Kendaraan.map((data) => (
                  <tr>
                    <td>{data.Plat}</td>
                    <td>{data.Nama}</td>
                    <td>{data.Status}</td>
                    <td
                      style={{
                        display: "flex",
                        gap: 4,
                      }}
                    >
                      <Button onClick={() => showPlat(data.Plat)}>View</Button>
                      <ModalFormEditPlat data={data} id={data.Plat} />
                      {!errorDelPlat ? (
                        <Button
                          onClick={() => {
                            deletePlatData(searchPlat?.Plat_Kendaraan[0]?.Plat);
                          }}
                          type="danger"
                        >
                          Delete
                        </Button>
                      ) : (
                        alert("delete error ", errorDelPlat)
                      )}
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
