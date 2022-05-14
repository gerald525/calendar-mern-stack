import { Link } from "react-router-dom";

const LoginScreen = () => {
  return (
    <section className="card">
      <div className="card__row card__row--right">
        <div className="card__body">
          <h1 className="card__title">Login</h1>
          <form className="form">
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
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="card__row card__row--colored card__row--left">
        <div className="card__body">
          <h2 className="card__subtitle">You're new?</h2>
          <p className="card__description">
            Register and discover a great amount of features
          </p>
          <Link className="btn btn-primary--outline" to={"/auth/register"}>
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};
export default LoginScreen;
