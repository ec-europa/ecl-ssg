import React from "react";

interface BodyContentProps {
  content?: string;
  image?: React.ReactNode;
  noDanger?: boolean;
}

const BodyContent: React.FC<BodyContentProps> = ({ content, image, noDanger = false }) => {
  if (noDanger) {
    return (
      <div>
        {image && <div>{image}</div>}
        {content}
      </div>
    );
  }

  return (
    <div>
      {image && <div>{image}</div>}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default BodyContent;