// import React, { useEffect, useRef } from 'react';
// import pdfjsLib from 'pdfjs-dist/webpack';
// import 'pdfjs-dist/web/pdf_viewer.css';
// import './pdf.worker.js'; // Import the worker file

// //https://drive.google.com/file/d/1ziHCPFKB3HcLxwa20MRlEruXCyT_hdle/view?usp=sharing
// const PDFViewerComponent = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     fetch('https://drive.google.com/file/d/1ziHCPFKB3HcLxwa20MRlEruXCyT_hdle/view?usp=sharing')
//       .then(response => response.blob())
//       .then(blob => {
//         const url = URL.createObjectURL(blob);
//         pdfjsLib.getDocument(url).promise.then(pdfDoc => {
//           pdfDoc.getPage(1).then(page => {
//             const viewport = page.getViewport({ scale: 1.5 });
//             const canvas = canvasRef.current;
//             const context = canvas.getContext('2d');
//             canvas.height = viewport.height;
//             canvas.width = viewport.width;
//             page.render({ canvasContext: context, viewport: viewport });
//           });
//         });
//       });
//   }, []);

//   return <canvas ref={canvasRef} />;
// }

// export default PDFViewerComponent;