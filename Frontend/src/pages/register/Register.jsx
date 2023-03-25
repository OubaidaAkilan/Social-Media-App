import './register.scss';

const Register = () => {
  return (
    <section className='social__register'>
      <div className='card'>
        <div className='left'>
          <h1>Oubaida Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <button>Login</button>
        </div>
        <div className='right'>
          <h1>Register</h1>
          <form>
            <input type='text' placeholder='Username' />
            <input type='text' placeholder='Email' />
            <input type='password' placeholder='Password' />
            <input type='password' placeholder='Confirm password' />

            <button>register</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
