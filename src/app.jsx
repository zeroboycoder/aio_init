import { useState } from "react";
import axios from "axios";
import cryptoJs from "crypto-js";

const App = () => {
  const [playerPhone, setPlayerPhone] = useState();
  const [playerName, setPlayerName] = useState();
  const [amount, setAmount] = useState();
  const [agentCode, setAgentCode] = useState();
  const [secretKey, setSecretKey] = useState();
  const [api, setApi] = useState();
  const [language, setLanguage] = useState("en");

  const clickHandler = async () => {
    try {
      const data = {
        playerPhone,
        playerName,
        amount,
        agentCode,
        secretKey,
        api,
        language,
      };
      const hashData = cryptoJs.AES.encrypt(
        JSON.stringify(data),
        secretKey
      ).toString();
      const signature = cryptoJs
        .HmacSHA1(JSON.stringify(data), secretKey)
        .toString();
      const res = await axios.post("https://dev.allin1.click/api/init", {
        hashData,
        signature,
        agentCode,
      });
      if (res.data.status === "error") {
        alert(res.data.msg);
      }
      const url = res.data.data;
      return window.open(url);
    } catch (error) {
      console.log(error);
    }
  };

  const exitHandler = async () => {
    try {
      const data = {
        playerPhone,
      };
      const hashData = cryptoJs.AES.encrypt(
        JSON.stringify(data),
        secretKey
      ).toString();
      const signature = cryptoJs
        .HmacSHA1(JSON.stringify(data), secretKey)
        .toString();
      const res = await axios.post("https://dev.allin1.click/api/exit", {
        hashData,
        signature,
        agentCode,
      });
      if (res.data.status === "success") {
        alert("Withdraw Successfully");
      }
      if (res.data.status === "error") {
        alert(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>Init App</h1>
        <div>
          <div>
            <input
              type="text"
              placeholder="Player Phone"
              onChange={(e) => setPlayerPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Player Name"
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Agent Code"
              onChange={(e) => setAgentCode(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Secret Key"
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="API Endpoint"
              onChange={(e) => setApi(e.target.value)}
            />
            <div>
              <select
                name="language"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="zh">Chinese</option>
                <option value="mm">Myanmar</option>
              </select>
            </div>
          </div>
          <div>
            <button onClick={clickHandler}>Go To App</button>
          </div>
        </div>
      </div>

      <div>
        <h1>Withdraw App</h1>
        <div>
          <div>
            <input
              type="text"
              placeholder="Player Phone"
              onChange={(e) => setPlayerPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Agent Code"
              onChange={(e) => setAgentCode(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Secret Key"
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
          <div>
            <button onClick={exitHandler}>Exit App</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
