import React from "react";
import axios from "axios";
import DataPicker from "../components/DataPicker";
class OrderInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      takeway: "",
      takedate: "",
      taketime: "",
      username: "",
      usertel: "",
      usermail: "",
      address: "",
      display: "none",
      delivery:[]
    };
  }
componentDidMount =async()=>{
  try {
    const response= await axios.get("road.json")
    this.setState({ delivery: response.data.address });
    console.log(this.state.delivery.map(a=>a))
} catch (err) {
  console.log(err)
}
}
  submit = (e) => {
    e.preventDefault();
    const orderinformation = { ...this.state };
    axios
      .post(
        "http://localhost/html/longping/longping/src/php/OrderInformation.php",
        orderinformation
      )
      .then((res) => {
        console.log(res.data);
      });
  };
  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };
  displayBlock = () => {
    this.setState({ display: "" });
  };
  displayNone = () => {
    this.setState({ display: "none" });
  };
  dataOnclick = (value, name) => {
    this.setState({
      [name]: value,
    });
  };
  selectRoad= (e)=>{
    const value = e.target.value;
    const area= this.state.delivery.filter((a)=>{
return a = value;
    })
    console.log(area)
    
  }

  render() {
    return (
      <section id="booking-second" className="orderInformationBackground">
        <div className="container">
          <form name="theForm" className="form" onSubmit={this.submit}>
            <div className="row justify-content-center">
              <h4>請輸入訂購資料</h4>
            </div>
            <label>取餐方式:</label>
            <div className="form-check-inline ">
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  id="delivery"
                  name="takeway"
                  value="外送"
                  onChange={this.handleChange}
                  onClick={this.displayBlock}
                />
                外送
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  id="takeout"
                  name="takeway"
                  value="外帶"
                  onChange={this.handleChange}
                  onClick={this.displayNone}
                />
                外帶
              </label>
            </div>
            <br />
            <label>取餐時間:</label>
            <div className="form-inline">
              <DataPicker
                onChange={this.dataOnclick}
                data={this.state.takedate}
                time={this.state.taketime}
              />
            </div>
            <label>姓名:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={(text) => this.handleChange}
              value={this.state.username}
            />
            <label>手機:</label>
            <input
              type="tel"
              className="form-control"
              pattern="(\d{4}-\d{6})"
              placeholder="手機號碼"
              title="例:0987-654321"
              name="usertel"
              size="30"
              onChange={this.handleChange}
              value={this.state.usertel}
            />

            <label>電子郵件:</label>
            <input
              type="email"
              name="usermail"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.usermail}
            />
            <div id="demo" className={this.state.display}>
              <label>外送地址:</label>

              <select
                className="form-control"
                name="city"
                id="city"
                size="1"
                placeholder="請選擇外送地址"
                onChange={this.selectRoad}
              >
                <option value="" className="none">
                  請先選擇縣市
                </option>
                {
                  this.state.delivery.map((delivery) => {
                  return(
                    <option value={delivery.area}key={delivery.id}>{delivery.area}</option>
                  )
                })}
              </select>
              <select
                className="form-control"
                name="area"
                id="area"
                size="1"
              ></select>
              <select
                className="form-control"
                name="road"
                id="road"
                size="1"
              ></select>
              <input
                className="form-control"
                type="text"
                id="address"
                name="address"
                placeholder="外送地址"
                onChange={this.handleChange}
                value={this.state.address}
              />
              <input type="hidden" name="path" />
            </div>
            <button type="submit" className="btn btn-primary">
              選擇餐點
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default OrderInformation;
