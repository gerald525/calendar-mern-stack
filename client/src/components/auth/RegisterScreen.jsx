import { Link } from "react-router-dom"

const RegisterScreen = () => {
  return (
    <section className="card card--inverse">
      <div className="card__row card__row--left">
        <div className="card__body">
          <h1 className="card__title">Create account</h1>
          <form className="form">
            <input
              className="form__input"
              type="text"
              placeholder="Name"
              name="name"
              id="name"
            />
            <input
              className="form__input"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
            />
            <input
              className="form__input"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
            />
            <input
              className="form__input"
              type="password"
              placeholder="Password confirmation"
              name="password2"
              id="password2"
            />
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
          <Link className="btn btn-primary btn-primary--outline" to="/auth/login">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};
export default RegisterScreen;
