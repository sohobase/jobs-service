import React from 'react';
import style from './Job.css';

const Job = () => (
  <section className={style.job}>
    <header className={style.header}>
      <h1 className={style.title}>Full Stack Developer (Europe)</h1>
      <small className={style.date}>POSTED FEB 15</small>
      <strong>Hotjar</strong>
      <strong>Headquarters: Malta</strong>
      <a href="http://careers.hotjar.com/o/full-stack-developer-europe/?source=WeWorkRemotely">link</a>
    </header>
    <div className={style.content}>
      <div className={style.text}>
        <p>
          We are looking for exceptional and ambitious developers who enjoy working both on front-end and back-end development. This role is ideal for somebody who is passionate about building great online apps and wants to use their skills to have a real impact on a product used by over 320,000 users from 190 different countries. We are looking for a developer who loves being part of a team but is also self-motivated and likes the idea of working remotely.
        </p>

        <h2>What skills are we looking for?</h2>
        <p>
          As a full-stack developer in the Hotjar tech team, you will be working on developing and improving features built primarily in JavaScript, AngularJS, Python and PostgreSQL. You will be creating production grade JavaScript and Python code and will have the opportunity to implement solutions designed to handle incredibly high levels of traffic. You will need to be highly process driven and eager to learn new technologies and programming languages. You will also be communicating directly with our users on a regular basis to investigate issues and truly understand how your work is being used.
        </p>

        <h2>Requirements</h2>
        <ul>
          <li>Strong background in benchmarking, optimization, scaling and dealing with high levels of traffic</li>
          <li>Experience using HTML, CSS, JavaScript, AngularJS and Python</li>
          <li>Experience using jQuery, PostgreSQL, Redis, Memcached, Lua, Linux, Nginx, Elasticsearch, and Amazon Web Services a plus</li>
          <li>Familiarity with automated testing frameworks such as Selenium</li>
          <li>Familiarity with distributed revision control systems such as Mercurial or Git</li>
          <li>Fluent in English with excellent written and verbal communication skills</li>
          <li>Ability to work independently - accountable for your own actions and able to act with both urgency and integrity</li>
          <li>Must submit to a background check confidentially processed by our third party</li>
        </ul>
      </div>

      <aside className={style.side}>
        <nav className={style.social}>
          <a href="/">Tell a friend</a>
          <a href="/">Tweet this job</a>
          <a href="/">Post on LinkedIn</a>
        </nav>

        <small>
          Help us maintain the quality of jobs posted on We Work Remotely. Let us know if this job isn’t really remote.
        </small>
      </aside>
    </div>
  </section>
);

export default Job;
