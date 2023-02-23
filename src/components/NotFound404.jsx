function NotFound404() {
  return (
    <div className="container mx-auto mt-36">
      <h2 style={{ fontSize: 200, color: "#4ed0ea", textAlign: "center" }}>
        404
      </h2>
      <h2 className="text-center text-slate-400 text-6xl">
        Opps! Page not found
      </h2>
      <p className="text-center text-2xl mt-4 text-slate-400">
        Sorry, but the page you are looking for is not found! Please go back to
        Home page or try another URL.
      </p>
    </div>
  );
}
export default NotFound404;
