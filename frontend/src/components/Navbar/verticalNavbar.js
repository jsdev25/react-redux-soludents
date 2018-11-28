import React, { Component } from "react";
import { Anchor } from "antd";
import "./index.css";
const { Link } = Anchor;

// const menu_list = (
//     <Menu>
//         <Menu.Item>
//             <a href="#choose">Nos Offres</a>
//         </Menu.Item>
//         <Menu.Item>
//             <a href="#team"></a>
//         </Menu.Item>
//         <Menu.Item>
//             <a href="#contact">Contactez Nous</a>
//         </Menu.Item>
//     </Menu>
// );

const handleClick = (e, link) => {
  e.preventDefault();
  console.log(link);
};

export default class VerticalNavbar extends Component {
  render() {
    return (
      <div className="dropdown">
        <img
          src="https://cdn.icon-icons.com/icons2/624/PNG/128/Menu-80_icon-icons.com_57300.png"
          width="30"
          height="30"
          alt=""
        />
        <div className="dropdown-content">
          <Anchor affix={false} onClick={handleClick}>
            <Link href="#choose" title="Nos Offres" />
            <Link href="#team" title="Notre Equipe" />
            <Link href="#contact" title="Contactez Nous" />
          </Anchor>
        </div>
      </div>
    );
  }
}
