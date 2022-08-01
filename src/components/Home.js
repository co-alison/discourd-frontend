// import "../Home.css";
// import "../App.css";

const Home = () => {
  return (
    <div className="home">
      <section className="cta-image">
        {/* <div className="img-wrapper">
          <div className="discord-img"></div>
        </div> */}
        <div className="call-to-action">
          <h1 className="title">Welcome to Discourd</h1>
          <span className="subtitle">All your UBC servers in one place</span>
          <button className="signup-btn">Sign Up</button>
        </div>
      </section>
      <div className="community">
            <h2>Connect with your community</h2>
            <span className="subtitle">Discover UBC Discord servers for every occasion, shared by the community</span>
            <div className="img-wrapper">
              <div className="community-img"></div>
            </div>
        </div>
    </div>
  );
};

export default Home;
