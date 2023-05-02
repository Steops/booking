import { FieldValues, useForm } from "react-hook-form";
interface IForm {
  btnText: string;
  handleClick: (email: string, password: string) => void;
  title: string;
}
const Form = ({ btnText, handleClick, title }: IForm) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: FieldValues) => {
    handleClick(data.email, data.password);
  };
  return (
    <div className="form">
      <div className="form__wrapper">
        <h1 className="form__title">{title}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form__form">
          <label>
            <input
              {...register("email", {
                required: "⚠ The field is not filled",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "⚠ Invalid email address",
                },
              })}
              placeholder="Email"
              className="form__input"
            />
            <div className="form__error">
              {errors?.email && errors.email.message}
            </div>
          </label>
          <label>
            <input
              type="password"
              {...register("password", {
                required: "⚠ The field is not filled",
                minLength: {
                  value: 8,
                  message: "⚠ Password cannot be less than 8 characters",
                },
              })}
              className="form__input"
              placeholder="password"
            />
            <div className="form__error">
              {errors?.password && <p>{errors.password.message}</p>}
            </div>
          </label>

          <input
            type="submit"
            disabled={!isValid}
            value={btnText}
            className="form__btn btn"
          />
        </form>
      </div>
    </div>
  );
};

export { Form };
