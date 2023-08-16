import React from 'react'
import s from './moduleCss/Footer.module.css';

const Footer = () => {
  return (
    <div className={s.footer__container}>
      <div className={s.foot__1}>
        NS BookStore© 2023
      </div>
      <div className={s.foot__2}>
        Made With ❤️ By NS
      </div>
      <div className={s.foot__3}>
        All Rights Reserved
      </div>
    </div>
  )
}

export default Footer;