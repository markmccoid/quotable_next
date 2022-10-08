import React from "react";
import { useMemo } from "react";
import { BsDownload as DownLoadIcon } from "react-icons/bs";

const LinkDownload = (props) => <div>Hi </div>;

export const useJSONDownload = () => {
  const DownLoadLink = useMemo(() => {
    const DownLoadLinkComponent = ({
      jsObject,
      filename,
      className,
      children,
    }) => {
      return (
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(jsObject)
          )}`}
          download={`${filename}.json`}
          className={className}
        >
          {children}
        </a>
      );
    };
    return DownLoadLinkComponent;
  }, []);

  return { DownLoadLink, DownLoadIcon };
};
