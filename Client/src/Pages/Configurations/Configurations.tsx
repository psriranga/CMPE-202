import { CaretRightOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Modal, theme } from "antd";
import React, { CSSProperties, useState } from "react";
import Movies from "./Movies/Movies";
import Theaters from "./Theaters/Theaters";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Configurations = () => {
  const { token } = theme.useToken();
  const [isMoviesModalOpen, setIsMoviesModalOpen] = useState(false);
  const [isTheatersModalOpen, setIsTheatersModalOpen] = useState(false);

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const showModal = (type: string) => {
    if (type === "movies") setIsMoviesModalOpen(true);
    else setIsTheatersModalOpen(true);
  };

  const handleOk = (type: string) => {
    if (type === "movies") {
      setIsMoviesModalOpen(false);
    } else setIsTheatersModalOpen(false);
  };

  const handleCancel = (type: string) => {
    if (type === "movies") {
      setIsMoviesModalOpen(false);
    } else setIsTheatersModalOpen(false);
  };
  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => [
    {
      key: "1",
      label: "Movies",
      children: <Movies showModal={showModal} />,
      style: panelStyle,
      extra: (
        <PlusCircleOutlined
          onClick={(e) => {
            e.stopPropagation();
            showModal("movies");
          }}
        />
      ),
    },
    {
      key: "2",
      label: "Theaters",
      children: <Theaters showModal={showModal} />,
      style: panelStyle,
      extra: (
        <PlusCircleOutlined
          onClick={(e) => {
            e.stopPropagation();
            showModal("theaters");
          }}
        />
      ),
    },
  ];
  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={["1", "2"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
      <Modal
        title="Configure Movies"
        open={isMoviesModalOpen}
        onOk={() => {
          handleOk("movies");
        }}
        onCancel={() => {
          handleCancel("movies");
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal
        title="Configure Theaters"
        open={isTheatersModalOpen}
        onOk={() => {
          handleOk("theaters");
        }}
        onCancel={() => {
          handleCancel("theaters");
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default Configurations;
