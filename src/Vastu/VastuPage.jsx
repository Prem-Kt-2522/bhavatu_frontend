import React from 'react';
import './VastuPage.css'; // Ensure you have the CSS file

const Vastu = () => {
  return (
    <div className="vastu-container">
      <h1>Vastu Analysis</h1>
      <iframe
        style={{
          background: 'white',
          borderRadius: '8px',
          border: 'none',
          boxShadow: '5px 5px 24px 0px #0000001F',
          width: '100%',
          height: '600px',
          maxWidth: '800px'
        }}
        src="https://embed.writer.com/text-generation/MPiBsTAEAnqxxFuEYxd7oc-q00GBKrSOdToVrrl8i4M"
        title="Vastu Analysis"
      ></iframe>  
    </div>
  );
};

export default Vastu;
