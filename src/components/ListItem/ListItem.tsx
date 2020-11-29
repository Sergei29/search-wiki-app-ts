import React from "react";
import "./style.scss";

export type ListItemProps = {
  id: string;
  label: string;
};

const ListItem: React.FC<ListItemProps> = ({
  id: linkUrl,
  label: itemTitle,
}) => {
  return (
    <div className="list-item">
      <a href={linkUrl} target="_blank" rel="noreferrer">
        {itemTitle}
      </a>
      <p>{linkUrl}</p>
    </div>
  );
};

export default ListItem;
