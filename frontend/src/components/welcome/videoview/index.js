import React from "react";
import { Row, Col } from "antd";

export class Videoview extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Row gutter={48} style={{ padding: 0, margin: 0, marginTop: 40 }}>
          <Col span={12} style={{ height: 570 }}>
            <iframe
              style={{ width: "100%", height: "100%" }}
              src="https://www.youtube.com/embed/zYpb_4rcWl4"
            />
            {/* <div style={{width:'100%', height:'100%', backgroundColor:'#5cb4fb', borderRadius: 20}}></div> */}
          </Col>

          <Col span={12}>
            <div style={{ marginTop: "5%", padding: "6%" }}>
              <span style={{ fontSize: 40 }}>
                Quel Service Proposons-Nous ?{" "}
              </span>
              <br />
              <br />
              <span style={{ fontSize: 14 }}>
                Fini les heures perdues à relancer vos clients sur vos devis !
              </span>
              <br />
              <span style={{ fontSize: 14 }}>
                Fini les heures perdues sur des logiciels de gestion inneficaces
                et inadaptés !
              </span>
              <br />
              <span style={{ fontSize: 14 }}>
                Fini la perte inestimable de tous ces patients ! Grâce à
                SOLUDENTS, Boostez votre Chiffre d'Affaire !
              </span>
              <br />
              <br />
              <span style={{ fontSize: 14 }}>
                Votre temps est précieux et grâce à SOLUDENTS, vous CHOISISSEZ
                les devis que vous souhaitiez nous voir traiter.
              </span>
              <br />
              <span style={{ fontSize: 14 }}>
                Grâce à notre système d'ARCHIVAGE de vos devis, vous pouvez
                gérer tous vos devis à partir d'un seul et unique endroit. Vous
                choisissez ensuite uniquement les devis que vous voudriez nous
                voir traiter.
              </span>
              <br />
              <span style={{ fontSize: 14 }}>
                Grâce à nos conseillers experts en mutuelles dentaires et
                organismes de prêts, notre équipe s'occupe de traiter vos devis
                en assurant un suivi OPTIMAL en relancant vos patients et en
                leur offrant les meilleures solutions possible du marché !
              </span>
              <br />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
