import { useState } from "react";
import axios from "axios";
import cryptoJs from "crypto-js";

const App = () => {
  const [playerPhone, setPlayerPhone] = useState();
  const [playerName, setPlayerName] = useState();
  const [amount, setAmount] = useState();
  const [agentCode, setAgentCode] = useState();
  const [secretKey, setSecretKey] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [gameType, setGameType] = useState("twod");
  const [endpoint, setEndpoint] = useState();
  const [domain, setDomain] = useState();
  const [language, setLanguage] = useState("en");

  const clickHandler = async () => {
    try {
      const data = {
        playerPhone,
        playerName,
        amount,
        agentCode,
        secretKey,
        imageUrl,
        redirectUrl: domain,
        gameType,
        language,
      };
      console.log(data);
      const hashData = cryptoJs.AES.encrypt(
        JSON.stringify(data),
        secretKey
      ).toString();
      const signature = cryptoJs
        .HmacSHA1(JSON.stringify(data), secretKey)
        .toString();
      const res = await axios.post(`${endpoint}/api/init`, {
        hashData,
        signature,
        agentCode,
      });
      const url = res.data.data.url;
      const [token, langTerms] = url.split("t=")[1].split("&lang=");
      const [lang, terms] = langTerms.split("&terms");
      const finalRoute = `https://dev.allin1.click/home/${lang}/${token}`;
      return window.open(finalRoute);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error?.response?.data?.msg);
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
      const res = await axios.post(`${endpoint}/api/exit`, {
        hashData,
        signature,
        agentCode,
      });
      if (res.data.status === "success") {
        alert("Withdraw Successfully");
      }
    } catch (error) {
      alert(error.response.data.msg);
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
              placeholder="User Image Url"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Redirect URL"
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="API Endpoint"
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </div>
          <div>
            <select
              name="language"
              onChange={(e) => setGameType(e.target.value)}
            >
              <option value="twod">2D</option>
              <option value="threed">3D</option>
            </select>
          </div>
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
            <div>
              <input
                type="text"
                placeholder="API Endpoint"
                onChange={(e) => setEndpoint(e.target.value)}
              />
            </div>
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
