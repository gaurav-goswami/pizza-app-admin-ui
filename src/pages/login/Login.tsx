const Login = () => {
  return (
    <>
        <h1>Sign In</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Log In</button>
        <label htmlFor="remember-me">Remember Me</label>
        <input type="checkbox" id="remember-me" />
        <a href="#">Forgot Password</a>
    </>
  )
}

export default Login
