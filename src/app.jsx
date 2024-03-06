import { useState } from "react";
import axios from "axios";
import cryptoJs from "crypto-js";

const App = () => {
  const [playerPhone, setPlayerPhone] = useState();
  const [playerName, setPlayerName] = useState();
  const [amount, setAmount] = useState();
  const [agentCode, setAgentCode] = useState();
  const [secretKey, setSecretKey] = useState();
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
        domain,
        language,
      };
      const hashData = cryptoJs.AES.encrypt(
        JSON.stringify(data),
        secretKey
      ).toString();
      const signature = cryptoJs
        .HmacSHA1(JSON.stringify(data), secretKey)
        .toString();
      const res = await axios.post("https://dev.allin1.click/api/", {
        hashData,
        signature,
        agentCode,
      });
      const url = res.data.data;
      return window.open(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          placeholder="Domain"
          onChange={(e) => setDomain(e.target.value)}
        />
        <div>
          <select name="language" onChange={(e) => setLanguage(e.target.value)}>
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
  );
};

export default App;
