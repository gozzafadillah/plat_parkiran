import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { Button, Card, Modal } from "antd";
import React, { useState } from "react";
import { MutationDeletePlat } from "../apollo/Mutation";
import { QueryGetPlat } from "../apollo/Query";
import { SubscriptionGetPlat } from "../apollo/Subscription";
import ModalFormEditPlat from "./ModalFormEditPlat";

const ListMain = () => {
  const { data: dataPlats } = useSubscription(SubscriptionGetPlat);
  const [getPlat, { data: dataPlat }] = useLazyQuery(QueryGetPlat);
  const [getSearch, { data: searchPlat }] = useLazyQuery(QueryGetPlat);
  const [showModal, setShowModal] = useState(false);
  const [deletePlat, { error: errorDelPlat }] = useMutation(MutationDeletePlat);
  const [plat, setPlat] = useState({
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
    if (name === "Plat") {
      setPlat(value);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    getSearch({
      variables: {
        plat: plat,
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
            name="Plat"
            id="Plat"
            style={{ textAlign: "center" }}
            placeholder="Cari Plat"
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
            {searchPlat === undefined ||
            searchPlat?.Plat_Kendaraan.length === 0 ? (
              dataPlats?.Plat_Kendaraan.map((data) => (
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
            ) : (
              <tr>
                <td>{searchPlat?.Plat_Kendaraan[0]?.Plat}</td>
                <td>{searchPlat?.Plat_Kendaraan[0]?.Nama}</td>
                <td>{searchPlat?.Plat_Kendaraan[0]?.Status}</td>
                <td
                  style={{
                    display: "flex",
                    gap: 4,
                  }}
                >
                  <Button
                    onClick={() =>
                      showPlat(searchPlat?.Plat_Kendaraan[0]?.Plat)
                    }
                  >
                    View
                  </Button>
                  <ModalFormEditPlat
                    data={searchPlat?.Plat_Kendaraan[0]}
                    id={searchPlat?.Plat_Kendaraan[0]?.Plat}
                  />
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
            )}
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
