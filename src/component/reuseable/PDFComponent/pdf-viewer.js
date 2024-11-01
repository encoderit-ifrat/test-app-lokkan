import { useEffect, useMemo } from "react";
import { useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({ contractDetailsInfo }) {
  // const [file, setFile] = useState(``)
  // useEffect(() => {
  // 	setFile(`data:application/pdf;base64,${contractDetailsInfo?.url}`)
  // }, [contractDetailsInfo])

  const file = useMemo(() => {
    return `data:application/pdf;base64,${contractDetailsInfo?.url}`;
  }, [contractDetailsInfo]);
  const [numPages, setNumPages] = useState(null);

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div style={{ maxHeight: "70vh", overflowY: "scroll" }}>
      {/* <div>
        <label htmlFor="file">Load from file:</label>{" "}
        <input onChange={onFileChange} type="file" />
      </div> */}
      <div>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              size="A4"
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
