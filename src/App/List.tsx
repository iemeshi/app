import React from "react";

type Data = {
  [key: string]: string;
}

type Props = {
  data: Data | undefined;
};

const Content = (props: Props) => {
  return (
    <>List</>
  );
};

export default Content;
