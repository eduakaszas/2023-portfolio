import './styles.scss';

const About: React.FC = () => {
  return (
    <div className="container">
      <h1>
        Hello world!
        <br />
        My name is Édua.
      </h1>
      <p>
        I'm your friendly neighbourhood frontend developer,
        <br />
        passionate about creating digital products
        <br />
        and experiences.
      </p>
      <div className="links">
        <a
          href="https://www.linkedin.com/in/eduakaszas/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a href="/edua_kaszas_resume_2023_h2.pdf" download>
          Download CV
        </a>
      </div>
    </div>
  );
};

export default About;
