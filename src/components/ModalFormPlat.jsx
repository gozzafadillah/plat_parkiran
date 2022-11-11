import { Button, Modal } from "antd";
import React, { useState } from "react";

const ModalFormPlat = () => {
  const [showModal, setShowModal] = useState(false);
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
        title="Vertically centered modal dialog"
        centered
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default ModalFormPlat;
