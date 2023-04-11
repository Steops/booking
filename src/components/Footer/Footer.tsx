import { Link } from "react-router-dom";
import {
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  InstagramIcon,
} from "../../uikit/Icon";

const Footer = () => {
  const dataLink = [
    { name: "Main", link: "/" },
    { name: "Result", link: "/searchresult" },
    { name: "Maps", link: "/mapsearch" },
  ];

  const socialLinks = [
    { social: <FacebookIcon />, href: "https://youtu.be/0ly25OYC45M?t=9" },
    { social: <InstagramIcon />, href: "https://youtu.be/_S7WEVLbQ-Y?t=1289" },
    { social: <GoogleIcon />, href: "https://youtu.be/UxhrYhabdco?t=17" },
  ];

  return (
    <footer className="footer">
      <div className="footer__wrapper wrapper">
        <div className="footer__content">
          <div className="footer__socials">
            <span className="footer__subscribes">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </span>
            <div className="footer__social-network">
              {socialLinks.map((item, index) => (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer__social-link"
                  key={index}
                >
                  {item.social}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__links">
            {dataLink.map((link, index) => (
              <Link to={link.link} key={index} className="footer__links-path">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="footer__developers">
            <h3>Developer:</h3>
            <h4>Stepan Polyakov</h4>
            <a
              href="https://github.com/Steops"
              className="footer__social-link"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
