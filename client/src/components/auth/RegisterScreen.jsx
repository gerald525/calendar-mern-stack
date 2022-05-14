import { Link } from "react-router-dom";

const RegisterScreen = () => {
  return (
    <section className="card card--inverse">
      <div className="card__row card__row--left">
        <div className="card__body">
          <h1 className="card__title">Create account</h1>
          <form className="form">
            <div className="form__field">
              <label htmlFor="name" className="form__label">
                Name
              </label>
              <input
                className="form__input"
                type="text"
                name="name"
                id="name"
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
