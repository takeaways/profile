import Error from 'next/error';

const MyError = ({statusCode}) => {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <Error statusCode={statusCode}/>
    </div>
  )
}

MyError.getInitialProps = async (context) => {
  const statusCode = context.res ? context.res.statusCode : context.err ? context.err.statusCode : null;
  return {statusCode}
}


export default MyError;
