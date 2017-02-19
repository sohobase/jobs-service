import React from 'react';
import { Box, Button } from '../../components';
import style from './Offer.css'

export default () => (
  <div className={style.offer}>
    <form action="api/offer" method="post" className={style.form}>
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

    <aside className={style.aside}>
      <Button type="submit" caption="Post new offer" large accent />

      <Box
        text="Your job listing will remain on this site for 30 days. After 30 days your job listing will expire and be removed. You can always post the job again for $200 for another 30 days."
      />
    </aside>
  </div>
);
