import React from "react";
import { MainCarousel } from "./maincarousel";
import { Videoview } from "./videoview";
import { Autionview } from "./autionview";
import { Pricingitem } from "./pricingitem";
import { Pricingitem2 } from "./pricingitem2";
import { Pricingitem3 } from "./pricingitem3";
import { TeamMemberSlider } from "./TeamMemberSlider";
import Messageview from "./contactview";
import { Footer } from "./Footer";
import { BackTop, Card } from "antd";

import { Row, Col } from "antd";
import "./index.css";
import { OurPartnerSlider } from "./OurPartnerSlider";

export default class Welcome extends React.Component {
  render() {
    return (
      <div className="container-fluid" id="home">
        <BackTop>
          <div className="ant-back-top-inner">Haut</div>
        </BackTop>
        <MainCarousel />
        <Videoview />

        <div id="choose">
          <Autionview
            title="Choisissez Votre Abonnement"
            description="Choisissez l'abonnement qui vous correspond en fonction du nombre de devis que vous souhaitez que nous traitions et de la période ! Nous nous occupons du reste ! "
          />
          <div className="price-view container">
            <Row>
              <Row>
                <Col xs={24} md={8}>
                  <center>
                    <Card
                      bodyStyle={{
                        backgroundColor: "#006500",
                        color: "white",
                        textAlign: "center"
                      }}
                      style={{ width: 330 }}
                    >
                      <div className="bandeau-red">10 Devis / Mois</div>
                    </Card>
                  </center>
                </Col>
                <Col xs={24} md={8}>
                  <center>
                    {" "}
                    <Card
                      bodyStyle={{
                        backgroundColor: "#139313",
                        color: "white",
                        textAlign: "center"
                      }}
                      style={{ width: 330 }}
                    >
                      <div className="bandeau-red">20 Devis / Mois</div>
                    </Card>
                  </center>
                </Col>
                <Col xs={24} md={8}>
                  <center>
                    {" "}
                    <Card
                      bodyStyle={{
                        backgroundColor: "#00d563",
                        color: "white",
                        textAlign: "center"
                      }}
                      style={{ width: 330 }}
                    >
                      <div className="bandeau-red">30 Devis / Mois</div>
                    </Card>
                  </center>
                </Col>
              </Row>
              <Col xs={24} md={8}>
                <center>
                  <div className={{ backgroundColor: "red" }}>
                    <Pricingitem
                      title="Offre 1 : Abonnement Trimestriel"
                      price="390"
                      products="390 euros/mois durant 3 mois"
                      downloads="Renouvellement automatique à 60 jours"
                      capacity=""
                    />
                  </div>
                </center>
              </Col>
              <Col xs={24} md={8}>
                <center>
                  <Pricingitem2
                    title="Offre 2 : Abonnement Trimestriel"
                    price="750"
                    products="750 euros/mois durant 3 mois"
                    downloads="Renouvellement automatique à 60 jours"
                    capacity=""
                  />
                </center>
              </Col>
              <Col xs={24} md={8}>
                <center>
                  <Pricingitem3
                    title="Offre 3 : Abonnement Trimestriel"
                    price="990"
                    products="990 euros/mois durant 3 mois"
                    downloads="Renouvellement automatique à 60 jours"
                    capacity=""
                  />
                </center>
              </Col>
            </Row>

            <Row>
              <Col xs={24} md={8}>
                <center>
                  <Pricingitem
                    title="Offre 4 : Abonnement Annuel"
                    price="3900"
                    products="3900euros (crédit en une fois)"
                    downloads="Renouvellement automatique à 335 jours"
                    capacity="Economisez 2 mois !"
                  />
                </center>
              </Col>
              <Col xs={24} md={8}>
                <center>
                  <Pricingitem2
                    title="Offre 5 : Abonnement Annuel"
                    price="7500"
                    products="7500euros (crédit en une fois)"
                    downloads="Renouvellement automatique à 335 jours"
                    capacity="Economisez 2 mois !"
                  />
                </center>
              </Col>
              <Col xs={24} md={8}>
                <center>
                  <Pricingitem3
                    title="Offre 6 : Abonnement Annuel"
                    price="9900"
                    products="9900euros (crédit en une fois)"
                    downloads="Renouvellement automatique à 335 jours"
                    capacity="Economisez 2 mois !"
                  />
                </center>
              </Col>
            </Row>
          </div>
        </div>

        <div id="team">
          <Autionview
            title="Notre Equipe"
            description="Voici notre équipe d'expert en service dentaire et la liste de partenaires travaillant avec nous."
          />
        </div>
        <OurPartnerSlider />
        <TeamMemberSlider />
        <Messageview />

        <div id="contact">
          <Footer />
        </div>
      </div>
    );
  }
}
