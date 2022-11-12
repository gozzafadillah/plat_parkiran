import { useMutation } from "@apollo/client";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { MutationEditPlat } from "../apollo/Mutation";

const ModalFormEditPlat = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [plat, setPlat] = useState(props.data);
  const [createPlat, { data }] = useMutation(MutationEditPlat);

  const onChangeHandler = (e) => {
    setPlat({ ...plat, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlat({
      variables: {
        _eq: props.id,
        _set: {
          Plat: plat.Plat,
          ID_Plat: plat.ID_Plat,
          Nama: plat.Nama,
          Plat_Nomor: plat.Plat,
          Status: plat.Status,
          Saldo: plat.Saldo,
          Free: plat.Free,
          Keterangan: plat.Keterangan,
        },
      },
    });
    console.log("Plat", plat);
    console.log("data", data);
    setShowModal(false);
  };
  return (
    <>
      <Button type="primary" onClick={() => setShowModal(true)}>
        Edit
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
            placeholder={props.data.Plat}
            value={plat.Plat}
            onChange={onChangeHandler}
          />
          <label htmlFor="ID_Plat">ID Plat</label>
          <input
            type="text"
            id="ID_Plat"
            name="ID_Plat"
            placeholder={props.data.ID_Plat}
            value={plat.ID_Plat}
            onChange={onChangeHandler}
          />
          <label htmlFor="Nama">Nama</label>
          <input
            type="text"
            id="Nama"
            name="Nama"
            placeholder={props.data.Nama}
            value={plat.Nama}
            onChange={onChangeHandler}
          />
          <textarea
            style={{ margin: "15px 0" }}
            type="textarea"
            id="Keterangan"
            name="Keterangan"
            placeholder={props.data.Keterangan}
            value={plat.Keterangan}
            onChange={onChangeHandler}
          />
          <label htmlFor="Free">Free</label>
          <input
            type="number"
            id="Free"
            name="Free"
            placeholder={props.data.Free}
            value={plat.Free}
            onChange={onChangeHandler}
          />
          <label htmlFor="Saldo">Saldo</label>
          <input
            type="number"
            id="Saldo"
            name="Saldo"
            placeholder={props.data.Saldo}
            value={plat.Saldo}
            onChange={onChangeHandler}
          />
          <label htmlFor="Status">Status</label>
          <select
            onChange={onChangeHandler}
            name="Status"
            id="Status"
            value={plat.Status}
          >
            <option value="">Pilih Status</option>
            <option value="Mahasiswa">Mahasiswa</option>
            <option value="Karyawan">Karyawan</option>
          </select>
        </form>
      </Modal>
    </>
  );
};

export default ModalFormEditPlat;
