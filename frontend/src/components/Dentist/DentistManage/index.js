import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Input,
  Divider,
  Collapse,
  Radio,
  message,
  Table,
  Popover
} from "antd";
import {
  logoutUser,
  UpdateDentist,
  UpdateDentistSubscription
} from "../../../actions/authentication";
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Managefile from "./Pdfupload";
import Dragdrop from "./Dragdrop";
import axios from "axios";
import Checkout from "../../Stripe/Checkout";
import "./index.css";

const Panel = Collapse.Panel;
const useradmin = JSON.parse(localStorage.getItem("UserAdmin"));
const pwa = JSON.parse(localStorage.getItem("pwa"));
const RadioGroup = Radio.Group;

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  return `${date}/${month}/${year}`;
}

const strFromDate = str => {
  return timeConverter(str);
};

const data_billing = [
  {
    key: "1",
    Offernumber: "Subscription 1",
    day: "30",
    count: "10",
    price: "390",
    planId: "plan_E39fwV05g02Cb2"
  },
  {
    key: "2",
    Offernumber: "Subscription 2",
    day: "365",
    count: "10",
    price: "750",
    planId: "plan_E39fS2RccKR32t"
  },
  {
    key: "3",
    Offernumber: "Subscription 3",
    day: "30",
    count: "20",
    price: "990",
    planId: "plan_E3A2IsyawGftyG"
  },
  {
    key: "4",
    Offernumber: "Subscription 4",
    day: "365",
    count: "20",
    price: "3900",
    planId: "plan_E39heLSMTrmgz2"
  },
  {
    key: "5",
    Offernumber: "Subscription 5",
    day: "30",
    count: "30",
    price: "7500",
    planId: "plan_E39hqMhI66scAu"
  },
  {
    key: "6",
    Offernumber: "Subscription 6",
    day: "365",
    count: "30",
    price: "9900",
    planId: "plan_E39iI5My03ajch"
  }
];

const content1 = (
  <div style={{ lineHeight: -5 }}>
    <span>
      Vous pouvez importer jusqu'à 10 devis tous les 30 jours pendant 3 mois.
    </span>
    <br />
    <span>
      Le compteur des documents se remettra automatiquement à jour afin de
      savoir à tout moment le nombre de devis que vous pouvez importer.{" "}
    </span>
    <br />
    <span>
      Le prix de cette offre est de 390 euros par mois pendant 3 mois, soit un
      total de 1170 euros sur le trimestre.
    </span>
    <br />
    <span>
      Vous pouvez à tout moment annuler le renouvellement automatique pour la
      prochaine période de facturation jusqu'à 30 jours à l'avance
    </span>
  </div>
);

const content2 = (
  <div style={{ lineHeight: -5 }}>
    <span>
      Vous pouvez importer jusqu'à 10 devis tous les 30 jours pendant 1 an.
    </span>
    <br />
    <span>
      Le compteur des documents se remettra automatiquement à jour afin de
      savoir à tout moment le nombre de devis que vous pouvez importer.{" "}
    </span>
    <br />
    <span>
      Le prix de cette offre est de 3900 euros sur 1 an (à compter de la date
      d'abonnement).
    </span>
    <br />
    <span>
      Vous pouvez à tout moment annuler le renouvellement automatique pour la
      prochaine période de facturation jusqu'à 30 jours à l'avance
    </span>
  </div>
);

const content4 = (
  <div style={{ lineHeight: -5 }}>
    <span>
      Vous pouvez importer jusqu'à 20 devis tous les 30 jours pendant 1 an.
    </span>
    <br />
    <span>
      Le compteur des documents se remettra automatiquement à jour afin de
      savoir à tout moment le nombre de devis que vous pouvez importer.{" "}
    </span>
    <br />
    <span>
      Le prix de cette offre est de 7500 euros sur 1 an (à compter de la date
      d'abonnement).
    </span>
    <br />
    <span>
      Vous pouvez à tout moment annuler le renouvellement automatique pour la
      prochaine période de facturation jusqu'à 30 jours à l'avance
    </span>
  </div>
);

const content3 = (
  <div style={{ lineHeight: -5 }}>
    <span>
      Vous pouvez importer jusqu'à 20 devis tous les 30 jours pendant 3 mois.
    </span>
    <br />
    <span>
      Le compteur des documents se remettra automatiquement à jour afin de
      savoir à tout moment le nombre de devis que vous pouvez importer.{" "}
    </span>
    <br />
    <span>
      Le prix de cette offre est de 750 euros par mois pendant 3 mois, soit un
      total de 2250 euros sur le trimestre.
    </span>
    <br />
    <span>
      Vous pouvez à tout moment annuler le renouvellement automatique pour la
      prochaine période de facturation jusqu'à 30 jours à l'avance
    </span>
  </div>
);

const content5 = (
  <div style={{ lineHeight: -5 }}>
    <span>
      Vous pouvez importer jusqu'à 30 devis tous les 30 jours pendant 3 mois.
    </span>
    <br />
    <span>
      Le compteur des documents se remettra automatiquement à jour afin de
      savoir à tout moment le nombre de devis que vous pouvez importer.{" "}
    </span>
    <br />
    <span>
      Le prix de cette offre est de 990 euros par mois pendant 3 mois, soit un
      total de 2970 euros sur le trimestre.
    </span>
    <br />
    <span>
      Vous pouvez à tout moment annuler le renouvellement automatique pour la
      prochaine période de facturation jusqu'à 30 jours à l'avance
    </span>
  </div>
);

const content6 = (
  <div style={{ lineHeight: -5 }}>
    <span>
      Vous pouvez importer jusqu'à 10 devis tous les 30 jours pendant 1 an.
    </span>
    <br />
    <span>
      Le compteur des documents se remettra automatiquement à jour afin de
      savoir à tout moment le nombre de devis que vous pouvez importer.{" "}
    </span>
    <br />
    <span>
      Le prix de cette offre est de 9900 euros sur 1 an (à compter de la date
      d'abonnement).
    </span>
    <br />
    <span>
      Vous pouvez à tout moment annuler le renouvellement automatique pour la
      prochaine période de facturation jusqu'à 30 jours à l'avance
    </span>
  </div>
);

const trim = (item) => item.substr(1,item.length-2)

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h1>Payment Invoice</h1>
        <h3 style={{ marginTop: 120 }}>
          Dentist can upload up to 10 document during 30 days.
        </h3>
        <br />
        <h3>Counter of document reset to 0 on the next 30 days period. </h3>
        <br />
        <h3>Price 390euros per month during 3 months </h3>
      </div>
    );
  }
}

class DentistManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer_pay: "",
      drag: false,
      subscription_modal: false,
      name: "",
      lastname: "",
      email: "",
      address: "",
      adli_number: "",
      subscription: 1,
      offer_content: "",
      password: pwa,
      phone: "",
      subscriptionDetails: null,
      subs:[]
    };
    this.showDragDrop = this.showDragDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBilling = this.handleBilling.bind(this);
    this.hasSubscriptions.bind(this)
    // this.props.onHeaderClick = this.props.onHeaderClick.bind(this);

    this.columns = [
      {
        title: "Offer Number",
        dataIndex: "Offernumber",
        key: "Offernumber"
      }
      /* {
        title: "Subscription Date",
        key: "subscription_date",
        dataIndex: "subscription_date",
        onFilter: (value, record) =>
          record.subscription_date.indexOf(value) === 0,
        sorter: (a, b) => {
          return a.subscription_date.localeCompare(b.subscription_date);
        },
        render: text => <span>{text.replace("T", " ").substring(0, 19)}</span>
      },
      {
        title: "Renew Date",
        key: "renew_date",
        dataIndex: "renew_date",
        onFilter: (value, record) => record.renew_date.indexOf(value) === 0,
        sorter: (a, b) => {
          return a.renew_date.localeCompare(b.renew_date);
        },
        render: text => <span>{text.replace("T", " ").substring(0, 19)}</span>
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Button
              style={{ backgroundColor: "#00a99d", color: "#fff" }}
              onClick={() => this.handleView(record)}
            >
              Cancel
            </Button>
          </span>
        )
      } */
    ];

    this.columnsbillings = [
      {
        title: "Billing",
        dataIndex: "Offernumber",
        key: "Offernumber"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            {/* <Button
              style={{ backgroundColor: "#00a99d", color: "#fff" }}
              onClick={() => this.handleBilling(record)}
            >
              Print
            </Button> */}
            <ReactToPrint
              trigger={() => (
                <Button style={{ backgroundColor: "#00a99d", color: "#fff" }}>
                  Print
                </Button>
              )}
              content={() => this.componentRef}
            />
            <div style={{ display: "none" }}>
              <ComponentToPrint ref={el => (this.componentRef = el)} />
            </div>
          </span>
        )
      }
    ];
  }

  handleBilling(e) {
    console.log("my record", e);
  }

  componentDidMount() {
    axios.get("/api/members/" + useradmin).then(res => {
      this.setState({
        name: res.data.data.name,
        lastname: res.data.data.lastname,
        email: res.data.data.email,
        address: res.data.data.address,
        adli_number: res.data.data.adli_number,
        phone: res.data.data.phone,
        subscription: res.data.data.subscription
      });

      axios
        .get(`/api/subscriptions/${res.data.data.email}`)
        .then(({ data }) => {
          const subs = data.filter(({active})=>active).map(
            ({
              end,
              start,
              subscription: { Offernumber: OfferNumber,count },
              subscriptionId,
              userId,
              available,
              _id
            }) => ({
              end: strFromDate(end),
              start: strFromDate(start),
              subscriptionId,
              OfferNumber,
              userId,
              count:parseInt(count),
              available,
              _id
            })
          );
           
          console.log({data})
          this.setState(
            state => ({ ...state, subs }),
            () => console.log('subscriptions loaded')
          );
        });
    });

    console.log(useradmin);
  }


  hasSubscriptions(){
    return this.state.subs.length > 0
  }

  onChange = e => {
    //console.log("radio checked", e.target.value);
    this.setState({
      subscription: e.target.value
    });
    if (e.target.value === 1) {
      this.setState({ offer_pay: 390, offer_content: "Offer 1" });
    }
    if (e.target.value === 2) {
      this.setState({ offer_pay: 3900, offer_content: "Offer 2" });
    }
    if (e.target.value === 3) {
      this.setState({ offer_pay: 750, offer_content: "Offer 3" });
    }
    if (e.target.value === 4) {
      this.setState({ offer_pay: 7500, offer_content: "Offer 4" });
    }
    if (e.target.value === 5) {
      this.setState({ offer_pay: 990, offer_content: "Offer 5" });
    }
    if (e.target.value === 6) {
      this.setState({ offer_pay: 9900, offer_content: "Offer 6" });
    }
 
    //please dont btouch this block
    if (e.target.value) {
      const [subscriptionDetails] = data_billing.filter(
        item => item.key == e.target.value
      );

      console.log(data_billing.filter(
        ({key})=>{
          return key==e.target.value
        }
      ))
      this.setState(
        state => ({
          ...state,
          subscription: e.target.value,
          subscriptionDetails
        }),
        () => console.log(this.state)
      );
    }
    // }
  };

  state = {
    profile: false,
    subscription_modal: false,
    manage: false
  };

  showProfile = () => {
    this.setState({
      profile: true
    });
  };

  showSubscription = () => {
    localStorage.setItem("payment", 0);
    this.setState({
      subscription_modal: true
    });
  };

  showManage = () => {
    this.setState({
      manage: true
    });
  };

  showDragDrop = () => {
    this.setState({
      drag: true
    });
  };

  handleOk = e => {
    this.setState({
      profile: false,
      subscription: false,
      manage: false,
      drag: false,
      subscription_modal: false
    });
  };

  handleCancel = e => {
    this.setState({
      profile: false,
      manage: false,
      subscription_modal: false,
      drag: false
    });
  };

  handleSubmit() {
    // if (localStorage.getItem("payment") == 0) {
    //   message.error("You must pay with card directly!");
    //   return false;
    // }

    const dentist = {
      subscription: this.state.subscription
    };

    this.props.UpdateDentistSubscription(dentist, this.props.history);
    this.setState({
      subscription: this.state.subscription,
      subscription_modal: !this.state.subscription_modal
    });
  }

  handleUpdate() {
    if (!this.state.name) {
      message.error("Your name is empty!");
      return false;
    }

    if (!this.state.password) {
      message.error("Your password is empty!");
      return false;
    }

    if (!this.state.email) {
      message.error("Your email is empty!");
      return false;
    }

    const dentist = {
      name: this.state.name,
      lastname: this.state.lastname,
      address: this.state.address,
      phone: this.state.phone,
      adli_number: this.state.adli_number,
      email: this.state.email,
      password: this.state.password
    };

    this.props.UpdateDentist(dentist, this.props.history);

    this.setState({
      profile: false
    });
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    localStorage.setItem("admin", 500);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div
        className="container-fluid"
        style={{ backgroundColor: "#e7ebee", height: "100vh" }}
      >
        <Row>
          <Col
            xs={10}
            md={4}
            className="sidebar"
            style={{ position: "fixed", height: "100vh" }}
          >
            <div>
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <img
                  src="https://i.imgur.com/HhAxynm.jpg"
                  alt="Smiley face"
                  height="50"
                  width="120"
                  style={{ border: "2px solid #00d563" }}
                />
                <br />
                <br />
                <Avatar
                  src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                  style={{ width: 110, height: 110 }}
                />
                <br />
                <br />
                <br />
                <span className="text-muted" style={{ color: "#fff" }}>
                  {this.state.name}
                </span>
                <br />
                <strong style={{ color: "#fff" }}>{this.state.email}</strong>
              </div>
              <a
                style={{
                  position: "absolute",
                  bottom: 20,
                  color: "#fff",
                  left: "40%",
                  cursor: "point"
                }}
                onClick={this.onLogout.bind(this)}
              >
                Se déconnecter
              </a>
            </div>
          </Col>

          <Col
            xs={10}
            md={4}
            className="sidebar"
            style={{ position: "relative" }}
          />

          <Col xs={14} md={20}>
            <Link to="/">
              <Button
                style={{
                  marginLeft: 100,
                  marginTop: 40,
                  backgroundColor: "#00a99d",
                  color: "#fff",
                  width: 170,
                  height: 50
                }}
              >
                Retour Page d'Accueuil
              </Button>
            </Link>
            <div className="card-view">
              <p>Dentiste</p>
              <Card style={{ backgroundColor: "#f5f6f8" }}>Menu</Card>
              <Card>
                View Profile Section
                <Button
                  style={{
                    float: "right",
                    backgroundColor: "#00a99d",
                    color: "#fff"
                  }}
                  onClick={this.showProfile}
                >
                  Click Here
                </Button>
              </Card>
              <Card>
                View Subscription Section
                <Button
                  style={{
                    float: "right",
                    backgroundColor: "#00a99d",
                    color: "#fff"
                  }}
                  onClick={this.showSubscription}
                >
                  Click Here
                </Button>
              </Card>
              <Card>
                View Manage File Section
                <Button
                  style={{
                    float: "right",
                    backgroundColor: "#00a99d",
                    color: "#fff"
                  }}
                  onClick={this.showManage}
                >
                  Click Here
                </Button>
              </Card>
              <Card>
                View Archive File Section
                <Button
                  style={{
                    float: "right",
                    backgroundColor: "#00a99d",
                    color: "#fff"
                  }}
                  onClick={this.showDragDrop}
                >
                  Click Here
                </Button>
              </Card>
              <br />
              {/* You can currently upload X documents based on your active
              subscriptions. */}
            </div>
          </Col>
        </Row>

        <Modal
          centered={true}
          title={"Information Personelle"}
          visible={this.state.profile}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <Row gutter={48} style={{ padding: 0, margin: 0 }}>
              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Prénom</label>
                <Input
                  style={{ border: "none" }}
                  name="name"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Nom de Famille</label>
                <Input
                  style={{ border: "none" }}
                  name="lastname"
                  onChange={this.handleInputChange}
                  value={this.state.lastname}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={24}>
                <label style={{ fontWeight: "800" }}>Mot de Passe</label>
                <Input
                  type="password"
                  style={{ border: "none" }}
                  name="password"
                  onChange={this.handleInputChange}
                  value={this.state.password}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Téléphone</label>
                <Input
                  style={{ border: "none" }}
                  name="phone"
                  onChange={this.handleInputChange}
                  value={this.state.phone}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Email</label>
                <Input
                  style={{ border: "none" }}
                  type="email"
                  name="email"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Adresse</label>
                <Input
                  style={{ border: "none" }}
                  name="address"
                  onChange={this.handleInputChange}
                  value={this.state.address}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Numéro Adeli</label>
                <Input
                  style={{ border: "none" }}
                  name="adli_number"
                  onChange={this.handleInputChange}
                  value={this.state.adli_number}
                />
              </Col>

              <button
                className="btn btn-info"
                onClick={this.handleUpdate}
                style={{
                  width: "100%",
                  backgroundColor: "#0089dc",
                  marginTop: 20
                }}
              >
                <strong style={{ fontSize: 20 }}>Mettre à jour</strong>
              </button>
            </Row>
          </div>
        </Modal>

        <Modal
          centered={true}
          title={"Choisissez et Gérez votre Abonnement"}
          visible={this.state.subscription_modal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Collapse bordered={false}>
            <Panel header="Choose your Offer" key="1">
              <RadioGroup
                onChange={this.onChange}
                value={this.state.subscription}
              >
                <Popover
                  placement="leftTop"
                  content={content1}
                  title="Subscription 1"
                >
                  <span style={{ marginLeft: 20, cursor: "pointer" }}>
                    Offre 1
                  </span>
                </Popover>

                <Radio value={1} style={{ position: "absolute", right: 40 }} />
                <br />
                <Popover
                  placement="leftTop"
                  content={content2}
                  title="Subscription 2"
                >
                  <span style={{ marginLeft: 20, cursor: "pointer" }}>
                    Offre 2
                  </span>
                </Popover>

                <Radio value={2} style={{ position: "absolute", right: 40 }} />
                <br />
                <Popover
                  placement="leftTop"
                  content={content3}
                  title="Subscription 3"
                >
                  <span style={{ marginLeft: 20, cursor: "pointer" }}>
                    Offre 3
                  </span>
                </Popover>

                <Radio value={3} style={{ position: "absolute", right: 40 }} />
                <br />
                <Popover
                  placement="leftTop"
                  content={content4}
                  title="Subscription 4"
                >
                  <span style={{ marginLeft: 20, cursor: "pointer" }}>
                    Offre 4
                  </span>
                </Popover>

                <Radio value={4} style={{ position: "absolute", right: 40 }} />
                <br />
                <Popover
                  placement="leftTop"
                  content={content5}
                  title="Subscription 5"
                >
                  <span style={{ marginLeft: 20, cursor: "pointer" }}>
                    Offre 5
                  </span>
                </Popover>

                <Radio value={5} style={{ position: "absolute", right: 40 }} />
                <br />
                <Popover
                  placement="leftTop"
                  content={content6}
                  title="Subscription 6"
                >
                  <span style={{ marginLeft: 20, cursor: "pointer" }}>
                    Offre 6
                  </span>
                </Popover>

                <Radio value={6} style={{ position: "absolute", right: 40 }} />
              </RadioGroup>
              <br />
              <br />

              <center>
                <Checkout
                  name={"Payment Subscription"}
                  description={this.state.offer_content}
                  amount={this.state.offer_pay}
                  planId={
                    this.state.subscriptionDetails &&
                    this.state.subscriptionDetails.planId
                  }
                  email={this.state.email}
                  subscription={
                    this.state.subscriptionDetails &&
                    this.state.subscriptionDetails
                  }
                />
              </center>

              {/* {this.state.offer_pay} */}

              <button
                hidden={true}
                style={{ width: "100%", marginTop: 30 }}
                onClick={this.handleSubmit}
                className="btn btn-primary"
              >
                Update
              </button>

              <br />
            </Panel>
          </Collapse>

          {/* Subscription Area */}
          <Collapse bordered={false}>
            <Panel header="Subscription Area" key="2">
              <div className="card-view">
                <Card style={{ width: "118%", marginLeft: "-42px" }}>
                  <Table
                    rowKey="uid"
                    columns={[
                      {
                        title: "Offer Number",
                        dataIndex: "OfferNumber",
                        key: "OfferNumber"
                      },
                      {
                        title: "Subscription Date",
                        dataIndex: "start",
                        key: "start"
                      },
                      {
                        title: "Renew Date",
                        dataIndex: "end",
                        key: "end"
                      },

                      {
                        title: "Action",
                        key: "subscriptionId",
                        render: ({ subscriptionId, OfferNumber, userId }) => (
                          <a
                            // href="#"
                            style={{
                              textDecoration: "none",
                              padding: "8px",
                              border: "1px solid #eee",
                              borderRadius: "7px",
                              color: "#fff",
                              background: "#d00"
                            }}
                            onClick={e => {
                              e.preventDefault();
                              if (window.confirm("Are you sure ??"))
                                axios
                                  .post(
                                    `api/subscription/cancel/${subscriptionId}`,
                                    {
                                      userId,
                                      OfferNumber
                                    }
                                  )
                                  .then(({ data }) => {
                                    alert(data.message);
                                    window.location.reload();
                                  });
                            }}
                          >
                            Cancel
                          </a>
                        )
                      }
                    ]}
                    dataSource={
                      this.state.subs &&
                      this.state.subs.map(
                        ({
                          start,
                          end,
                          subscriptionId,
                          OfferNumber,
                          userId
                        }) => ({
                          OfferNumber,
                          start,
                          end,
                          subscriptionId,
                          userId
                        })
                      )
                    }
                  />

                  {/* dataSource={this.state.data_document}  */}
                </Card>
              </div>
              <br />
            </Panel>
          </Collapse>

          {/* Billing Area */}
          <Collapse bordered={false}>
            <Panel header="Billing Area" key="2">
              <div className="card-view">
                <Card style={{ width: "118%", marginLeft: "-42px" }}>
                  <Table
                    rowKey="uid"
                    columns={
                      [
                        {
                          title: "Billing",
                          dataIndex: "OfferNumber",
                          key: "OfferNumber"
                        },
                        {
                          title: "Action",
                          key: "subscriptionId",
                          render: ({_id}) => (
                            <a
                              // href="#"
                              style={{
                                textDecoration: "none",
                                padding: " 5px 18px",
                                border: "1px solid #eee",
                                borderRadius: "7px",
                                color: "#fff",
                                background: "#aed100"
                              }}
                              onClick={e => {
                                e.preventDefault();
                                if (window.confirm("Print Invoice"))
                                //console.log(obj)
                                  window.open(`http://localhost:5000/export/pdf/${trim(localStorage.getItem('UserAdmin'))}/${_id}`)
                              }}
                            >
                              Print
                            </a>
                          )
                        }
                      ]
                    }
                    dataSource={
                      this.state.subs &&
                      this.state.subs.map(
                        ({
                          start,
                          end,
                          subscriptionId,
                          OfferNumber,
                          userId,
                          _id
                        }) => ({
                          OfferNumber,
                          start,
                          end,
                          subscriptionId,
                          userId,
                          _id
                        })
                      )
                    }
                  />
                  {/* dataSource={this.state.data_document}  */}
                </Card>
              </div>
              <br />
            </Panel>
          </Collapse>
        </Modal>

        <Modal
          centered={true}
          title={"Upload Pdf"}
          visible={this.state.manage}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={820}
          footer={[]}
        >
          {
            this.hasSubscriptions() ? <Managefile username={this.state.name} subscription={this.state.subs} userId={trim(localStorage.getItem('UserAdmin'))}/> :<div style={{textAlign:'center'}}>
              <b>You need to purcahase subscription</b>
            </div>
          }
        </Modal>

        <Modal
          centered={true}
          title={"Upload Pdf"}
          visible={this.state.drag}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={820}
          footer={[]}
        >
          <Dragdrop username={this.state.name} {...this.state} />
        </Modal>
      </div>
    );
  }
}

DentistManage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  UpdateDentist: PropTypes.func.isRequired,
  UpdateDentistSubscription: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, UpdateDentist, UpdateDentistSubscription }
)(withRouter(DentistManage));
