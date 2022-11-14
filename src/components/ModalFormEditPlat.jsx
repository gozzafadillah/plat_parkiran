import { useMutation } from "@apollo/client";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { MutationEditPlat } from "../apollo/Mutation";
import { GetPlats } from "../apollo/Query";

const ModalFormEditPlat = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [plat, setPlat] = useState({});
  const [createPlat, { data }] = useMutation(MutationEditPlat, {
    refetchQueries: [GetPlats],
  });

  useEffect(() => {
    setPlat({
      plat: props.data.plat,
      nama: props.data.nama,
      id_plat: props.data.id_plat,
      status: props.data.status,
      keterangan: props.data.keterangan,
      plat_nomor: props.data.plat_nomor,
      free: props.data.free,
      saldo: props.data.saldo,
    });
  }, []);

  const onChangeHandler = (e) => {
    setPlat({ ...plat, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlat({
      variables: {
        plat: props.id,
        id_plat: plat.id_plat,
        nama: plat.nama,
        plat_nomor: plat.plat,
        status: plat.status,
        saldo: plat.saldo,
        free: plat.free,
        keterangan: plat.keterangan,
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
        title={`Edit plat kendaraan ${props.data.plat}`}
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
          <label htmlFor="plat">Plat</label>
          <input
            type="text"
            id="plat"
            name="plat"
            placeholder={props.data.plat}
            value={plat?.plat}
            onChange={onChangeHandler}
          />
          <label htmlFor="id_plat">ID Plat</label>
          <input
            type="text"
            id="id_plat"
            name="id_plat"
            placeholder={props.data.id_plat}
            value={plat?.id_plat}
            onChange={onChangeHandler}
          />
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            id="nama"
            name="nama"
            placeholder={props.data.nama}
            value={plat?.nama}
            onChange={onChangeHandler}
          />
          <textarea
            style={{ margin: "15px 0" }}
            type="textarea"
            id="keterangan"
            name="keterangan"
            placeholder={props.data.keterangan}
            value={plat?.keterangan}
            onChange={onChangeHandler}
          />
          <label htmlFor="free">Free</label>
          <input
            type="number"
            id="free"
            name="free"
            placeholder={props.data.free}
            value={plat?.free}
            onChange={onChangeHandler}
          />
          <label htmlFor="Saldo">Saldo</label>
          <input
            type="number"
            id="saldo"
            name="saldo"
            placeholder={props.data.saldo}
            value={plat?.saldo}
            onChange={onChangeHandler}
          />
          <label htmlFor="Status">Status</label>
          <select
            onChange={onChangeHandler}
            name="status"
            id="status"
            value={plat?.status}
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
