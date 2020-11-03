import React from "react";

const HomeNovels = ({ data }) => {
  return (
    <div>
      {data ? data.map((novel) => (
        <div key={novel.id}>{novel.title} {novel.content}</div>
      )) : "Null"}
    </div>
  );
};

export default HomeNovels;
