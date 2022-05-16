import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startRegister } from "../../actions/auth";
import useForm from "../../hooks/useForm";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm({
    name: "juan2",
    email: "juan2@test.com",
    password: "Aabc123.",
    password2: "Aabc123.",
  });
  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Validations
    dispatch(startRegister(name, email, password));
  };

  return (
    <section className="card card--inverse">
      <div className="card__row card__row--left">
        <div className="card__body">
          <h1 className="card__title">Create account</h1>
          <form className="form" onSubmit={handleRegister}>
            <div className="form__field">
              <label htmlFor="name" className="form__label">
                Name
              </label>
              <input
                className="form__input"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form__field">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <input
                className="form__input"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form__field">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                className="form__input"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form__field">
              <label htmlFor="password2" className="form__label">
                Password confirmation
              </label>
              <input
                className="form__input"
                type="password"
                name="password2"
                id="password2"
                value={password2}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="card__row card__row--colored card__row--right">
        <div className="card__body">
          <h2 className="card__subtitle">Welcome back!</h2>
          <p className="card__description">
            To keep connected, please login with your personal information
          </p>
          <Link
            className="btn btn-primary btn-primary--outline"
            to="/auth/login"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};
export default RegisterScreen;
