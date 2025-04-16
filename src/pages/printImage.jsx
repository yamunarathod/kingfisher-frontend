import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PrintImage.css';

const PrintImage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrl = location.state?.imageUrl;

  useEffect(() => {
    if (!imageUrl) {
      navigate('/result');
      return;
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <style>
              body {
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
              }
              img {
                max-width: 100%;
                height: auto;
              }
              @media print {
                @page {
                  margin: 0;
                }
                body {
                  margin: 0;
                }
              }
            </style>
          </head>
          <body>
            <img src="${imageUrl}" onload="window.print();window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }

    // Navigate to thank you page after a short delay
    setTimeout(() => {
      navigate('/thank-you');
    }, 2000);
  }, [imageUrl, navigate]);

  return (
    <div className="print-page">
      <div className="print-message">
        Preparing to print...
      </div>
    </div>
  );
};

export default PrintImage;