import React, { Component } from "react";
import { Menu, Dropdown, Button, Anchor } from "antd";
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

export default class HorizontalNavbar extends Component {
  render() {
    return (
      <div className="Navbar-view horizontal">
        <Anchor
          affix={false}
          onClick={handleClick}
          style={{ float: "left", marginRight: 30 }}
        >
          <Link href="#choose" title="Nos Offres" />
        </Anchor>
        <Anchor
          affix={false}
          onClick={handleClick}
          style={{ float: "left", marginRight: 30 }}
        >
          <Link href="#team" title="Notre Equipe" />
        </Anchor>
        <Anchor affix={false} onClick={handleClick} style={{ float: "left" }}>
          <Link href="#contact" title="Contactez Nous" />
        </Anchor>
      </div>
    );
  }
}
