import { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";

const portal = document.getElementById("portal") as HTMLElement;

interface IPortal {
  setPortalOpen: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element | null;
}

const Portal = ({ children, setPortalOpen }: IPortal) => {
  return ReactDOM.createPortal(
    <div className="portal">
      <div
        className="portal__overlay"
        onClick={() => {
          setPortalOpen(false);
        }}
      ></div>
      {children}
    </div>,
    portal
  );
};

export { Portal };
