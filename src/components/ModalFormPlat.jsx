import { useMutation } from "@apollo/client";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { MutationCreatePlat } from "../apollo/Mutation";

import { GetPlats } from "../apollo/Query";

import { Plat } from "../mock/PlatMock";

const ModalFormPlat = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [createPlat, { data: dataPlat, error: errPlat }] =
    useMutation(MutationCreatePlat);
  const [plat, setPlat] = useState(Plat);

  const onChangeHandler = (e) => {
    setPlat({ ...plat, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlat({
      variables: {
        plat: props.rfid,
        nama: plat.Nama,
        keterangan: plat.Keterangan,
        free: parseInt(plat.Free),
        saldo: parseInt(plat.Saldo),
        status: plat.Status,
        id_plat: plat.ID_Plat,
        plat_nomor: plat.Plat,
      },
    });
    console.log("Plat", plat);
    setShowModal(false);
  };
  return (
    <>
      <Button
        type="primary"
        style={{ margin: "15px 0" }}
        onClick={() => setShowModal(true)}
      >
        Add Data
      </Button>
      <Modal
        title="Tambah Plat Kendaraan"
        centered
        visible={showModal}
        onOk={(e) => handleSubmit(e)}
        onCancel={() => setShowModal(false)}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="Plat">Plat</label>
          <input
            type="text"
            id="Plat"
            name="Plat"
            placeholder="D 4244 XX"
            value={props.rfid}
            onChange={onChangeHandler}
          />
          <label htmlFor="ID_Plat">ID Plat</label>
          <input
            type="text"
            id="ID_Plat"
            name="ID_Plat"
            placeholder="NIP atau NIM"
            onChange={onChangeHandler}
          />
          <label htmlFor="Nama">Nama</label>
          <input
            type="text"
            id="Nama"
            name="Nama"
            placeholder="Full Name"
            onChange={onChangeHandler}
          />
          <textarea
            style={{ margin: "15px 0" }}
            type="textarea"
            id="Keterangan"
            name="Keterangan"
            placeholder="Keterangan"
            onChange={onChangeHandler}
          />
          <label htmlFor="Free">Free</label>
          <input
            type="number"
            id="Free"
            name="Free"
            placeholder="0"
            onChange={onChangeHandler}
          />
          <label htmlFor="Saldo">Saldo</label>
          <input
            type="number"
            id="Saldo"
            name="Saldo"
            placeholder="0"
            onChange={onChangeHandler}
          />
          <label htmlFor="Status">Status</label>
          <select onChange={onChangeHandler} name="Status" id="Status">
            <option value="">Pilih Status</option>
            <option value="Mahasiswa">Mahasiswa</option>
            <option value="Karyawan">Karyawan</option>
          </select>
        </form>
      </Modal>
    </>
  );
};

export default ModalFormPlat;
