import Reacts from "react";
import NavBarEcommerce from "./NavBarEcommerce";

const About = () => {

  return (
    <>
      <NavBarEcommerce />
      <section className="h-75" style={{ backgroundColor: "#d3d0df" }}>
        <div className="container py-5 h-75">
          <div className="row d-flex justify-content-center align-items-center h-75">
            <div
              className="col col-xl-8 h-75"
              style={{ borderRadius: "1rem", height: "500px" }}
            >
              <div
                className="card"
                style={{ borderRadius: "1rem", height: "400px" }}
              >
                <div className="row g-0 h-100">
                  <div className="col-md-6 col-lg-7 d-none d-md-block h-100">
                    <img
                      src="https://images.pexels.com/photos/5632382/pexels-photo-5632382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="login form"
                      className="img-thumbnail h-100 col-lg-12"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-5 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <h3 style={{ margin: "10px" }}>
                        About Us
                      </h3>
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Ratione, optio quia incidunt ut architecto tenetur
                        voluptas est nam doloribus, minus nihil itaque. Dolorum
                        recusandae veritatis qui labore, harum porro nemo!{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
