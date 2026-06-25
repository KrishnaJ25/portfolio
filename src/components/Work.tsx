import { useEffect, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    ctx.current = gsap.context(() => {
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: true,
          pin: true,
          id: "work",
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    });

    return () => {
      ctx.current?.revert();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>StreamCore</h4>
                  <p>Backend / Cloud</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Node.js, MongoDB, AWS S3, EC2, Lambda, Docker, JWT, GitHub Actions</p>
            </div>
            <WorkImage image="/images/streamcore_architecture.webp" alt="StreamCore video streaming platform" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>Women Safety Navigation</h4>
                  <p>ML / Algorithms</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, Gradient Boosting, A* Algorithm, Maps API, Crime Data Processing</p>
            </div>
            <WorkImage image="/images/women_safety_navigation_architecture.webp" alt="Women safety navigation system" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>Online Banking App</h4>
                  <p>Full Stack / Java</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Java, JDBC, Servlets, MySQL, JUnit, Authentication</p>
            </div>
            <WorkImage image="/images/online_banking_architecture.webp" alt="Online banking application" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>Restaurant Management</h4>
                  <p>Desktop App / Python</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, Tkinter, MySQL, GUI, Inventory &amp; Billing</p>
            </div>
            <WorkImage image="/images/restaurant_management_architecture.webp" alt="Restaurant management system" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
