import { useState } from "react";
interface IForm {
  btnText: string;
  handleClick: (email: string, password: string) => void;
  title: string;
}
const Form = ({ btnText, handleClick, title }: IForm) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="form">
      <div className="form__wrapper">
        <h1 className="form__title">{title}</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="form__input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="form__input"
        />
        <button
          onClick={() => handleClick(email, password)}
          className="form__btn btn"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export { Form };
