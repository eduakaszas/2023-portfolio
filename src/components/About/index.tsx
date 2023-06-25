import React from 'react';
import './styles.scss';

export default function About() {
  return (
    <div className="container">
      <h1>
        Hello world,
        <br />
        my name is Édua.
      </h1>
      <p>
        I'm your friendly neighbourhood frontend developer,
        <br />
        passionate about creating digital designs and experiences.
      </p>
      <div>
        <a
          href="https://www.linkedin.com/in/eduakaszas/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a href="/edua_kaszas_2023_resume.pdf" download>
          Download CV
        </a>
      </div>
    </div>
  );
}
