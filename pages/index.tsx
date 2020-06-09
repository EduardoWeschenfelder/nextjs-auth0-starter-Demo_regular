import Head from "next/head";
import auth0 from "../utils/auth0";
import react from 'react'
function Home(props) {
  console.log(props)
  return (
    <div className="container">
      <Head>
        <title>Demo_Regular </title>
        < link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title" >
          Welcome to <a href="http://localhost:3000/" > Auth0! Demo_Regular </a>
        </h1>
        {
          props?.session?.user ? (
            <p className="description" >
              <br /><strong>Usuario:</strong> {[props?.session?.user.nickname]}
              <br /><strong>Email:</strong> {[props?.session?.user.name]}
            </p>
          ) : (
              <p className="description" > Faça login á baixo </p>
            )
        }

        {
          props?.session?.user ? (
            <a
              style={{
                backgroundColor: "red",
                padding: "15px 30px",
                color: "#fff",
                borderRadius: "8px",
              }
              }
              href="/api/logout"
            >
              Logout
            </a>
          ) : (
              <a
                style={{
                  backgroundColor: "green",
                  padding: "15px 30px",
                  color: "#fff",
                  borderRadius: "8px",
                }
                }
                href="/api/login"
              >
                Login
              </a>
            )}
        {/* <a href="/api/me">Profile</a> */}
      </main>

      < footer >
        <p> © 2020 Eduardo </p>
      </footer>

      < style jsx > {`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      < style jsx global > {`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  console.log({ session });
  const tokenCache = await auth0.tokenCache(req, res);
  // const { accessToken } = await tokenCache.getAccessToken();
  console.log({ tokenCache });

  return { props: { session } };
}

export default Home;
