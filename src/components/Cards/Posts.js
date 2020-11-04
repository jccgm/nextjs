import React, { useEffect, useReducer } from "react";
import Widget from "@components/Widget";
import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Pagination, Typography } from "antd";
import { pdfjs, Document, Page } from "react-pdf";
import Modal from "antd/lib/modal/Modal";
import { get } from "lodash";
const { Paragraph, Text } = Typography;

const initialState = {
  numPages: null,
  showPdf: false,
  pageNumber: 1,
  modal: false,
};

const reducer = (state, action) => ({ ...state, ...action });

export const Books = (props) => {
  const { keyword, autor } = get(props, "book", {});
  const { description, fileStorages, name } = props;

  const [state, dispatchComponent] = useReducer(reducer, initialState);
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  const onShowPdf = (selected) => {
    dispatchComponent({ modal: true, selected, numPages: null });
  };

  function onDocumentLoadSuccess({ numPages }) {
    dispatchComponent({ numPages });
  }

  return (
    <>
      <Widget styleName="gx-card-full gx-text-center">
        <span className="gx-widget-badge">Libro</span>
        <div className="gx-pt-4 gx-px-3">
          <div className="gx-separator gx-bg-success-dark" />
          <h2 className="gx-text-success-dark"> {name} </h2>
          <Text type="secondary" disabled>
            {" "}
            {autor}{" "}
          </Text>
          <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "Leer mas" }} className="gx-mt-4">
            {description}
          </Paragraph>
          <Button type="primary" block icon={<FilePdfOutlined />} onClick={() => onShowPdf(props)}>
            {" "}
            LEER{" "}
          </Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
          <p className="gx-text-grey gx-text-truncate">
            <i className={`icon icon-tag-new gx-fs-lg gx-mr-2 gx-d-inline-flex gx-vertical-align-middle gx-text-light-grey`} />
            {keyword?.join(", ")}
          </p>
        </div>
        <div className="gx-mt-xxl-3 gx-ayurveda-thumb">
          <img
            className="gx-img-fluid gx-w-100"
            alt="ayurveda"
            src={fileStorages ? fileStorages.find((fileStorage) => fileStorage.tag === "libroImage")?.link : "https://via.placeholder.com/576X330"}
          />
        </div>
      </Widget>

      <Modal
        title="PDF View"
        visible={state.modal}
        centered
        confirmLoading={false}
        onCancel={() => dispatchComponent({ modal: false })}
        footer={false}
        width="auto"
      >
        <div style={{ overflowX: "auto" }}>
          {state.numPages && (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Pagination simple defaultCurrent={1} defaultPageSize={1} total={state.numPages} onChange={(pageNumber) => dispatchComponent({ pageNumber })} />
            </div>
          )}

          {state.modal && (
            <Document
              file={state.selected.fileStorages?.find((fileStorage) => fileStorage.tag === "libroPdf")?.link.replace("http://", "https://")}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={state.pageNumber} />
            </Document>
          )}
        </div>
      </Modal>
    </>
  );
};

Books.propTypes = {};

export default Books;
