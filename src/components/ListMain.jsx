import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { Button, Card, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MutationDeletePlat } from "../apollo/Mutation";
import { GetPlats, QueryGetByName, QueryGetPlat } from "../apollo/Query";
import CONST from "../helper/Constant";
import ModalFormEditPlat from "./ModalFormEditPlat";

const ListMain = () => {
  const [showModal, setShowModal] = useState(false);
  const [GetPlat, { data: dataPlat }] = useLazyQuery(QueryGetPlat, {
    pollInterval: 2000,
  });
  const { data: dataPlats } = useQuery(GetPlats);
  const [DeletePlat, { loading: deleteLoading }] = useMutation(
    MutationDeletePlat,
    {
      refetchQueries: [GetPlats],
    }
  );
  const [plat, setPlat] = useState({
    name: "",
  });

  const showPlat = (plat) => {
    GetPlat({
      variables: {
        plat: plat,
      },
    });
    setShowModal(true);
  };

  const deletePlatData = (plat) => {
    console.log(plat);
    DeletePlat({
      variables: {
        plat: plat,
      },
    });
  };

  useEffect(() => {}, [deleteLoading]);

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "Nama") {
      setPlat(value);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
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
                  <ModalFormEditPlat data={data} id={data.plat} />
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
        title={`Detail Data ${dataPlat?.plat[0].plat}`}
        centered
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Nama</p>
            <p>{dataPlat?.plat[0].nama}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Plat</p>
            <p>{dataPlat?.plat[0].plat}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>ID Plat</p>
            <p>{dataPlat?.plat[0].id_plat}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Status</p>
            <p>{dataPlat?.plat[0].status}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Free</p>
            <p>{dataPlat?.plat[0].free}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Saldo</p>
            <p>{dataPlat?.plat[0].saldo}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>Keterangan</p>
            <p>{dataPlat?.plat[0].keterangan}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListMain;
