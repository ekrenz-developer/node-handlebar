import landingData from "../mock/landing.json";

const landingRouter = (server) => {
  server.get("/", (req, res) => {
    return res.render("landing", {
      landingData: landingData
    });
  });
}

export default landingRouter;