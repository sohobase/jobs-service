import React from 'react';
import Button from '../../components/Button';

export default () => (
  <form action="api/offer" method="post">
    <input type="text" name="position" placeholder="Job title" /><br />
    <input type="text" name="location" placeholder="Location" /><br />
    <input type="text" name="company" placeholder="Company" /><br />
    <textarea name="company_about" placeholder="About your company" /><br />
    <input type="text" name="company_url" placeholder="Company website" /><br />
    <input type="file" name="company_image" placeholder="Company logo" /><br />
    <textarea name="text" placeholder="Job Description" /><br />
    <input type="text" name="salary" placeholder="Salary" /><br />
    <input type="text" name="skills" placeholder="Skills" /><br />
    <input type="text" name="remote" placeholder="Remote" /><br />
    <Button type="submit" caption="Post new offer" />
  </form>
);
